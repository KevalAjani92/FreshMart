using Grocery_Store.DTOs;
using Grocery_Store.Helpers;
using Grocery_Store.Models;
using iText.Layout.Borders;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery_Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly GroceryStoreDbContext _context;
        public OrderController(GroceryStoreDbContext context)
        {
            _context = context;
        }
        [HttpPost("Place_New_Order")]
        public async Task<IActionResult> PlaceOrder([FromBody] PlaceOrderDTO dto)
        {
            if(dto.OrderItems == null || !dto.OrderItems.Any())
            {
                return BadRequest("Order Must Contain at least one item");
            }
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                //decimal totalAmount = dto.OrderItems.Sum(i => i.Quantity * i.UnitPrice);

                //var order = new MstOrder
                //{
                //    CustomerId = dto.CustomerID,
                //    OrderDate = DateTime.Now,
                //    PaymentMode = dto.PaymentMode,
                //    TotalAmount = totalAmount,
                //    DeliveryCharge = 20
                //};
                //_context.MstOrders.Add(order);
                //await _context.SaveChangesAsync();

                //order.OrderNumber = OrderNumberGenerator.GenerateOrderNumber(order.OrderId);

                ////To Save Order Number
                //await _context.SaveChangesAsync();

                //foreach (var item in  dto.OrderItems)
                //{
                //    var product = await _context.MstProducts.FindAsync(item.ProductID);
                //    if (product == null)
                //        throw new Exception("Invalid product");

                //    if (product.CurrentStock < item.Quantity)
                //        throw new Exception("Insufficient stock");

                //    product.CurrentStock -= item.Quantity;

                //    var orderItem = new MstOrderItem
                //    {
                //        OrderId = order.OrderId,
                //        ProductId = item.ProductID,
                //        Quantity = item.Quantity,
                //        UnitPrice = item.UnitPrice
                //    };
                //    _context.MstOrderItems.Add(orderItem);
                //}

                //if (dto.PaymentMode == "Card" && dto.CardDetail != null)
                //{
                //    var payment = new MstPayment
                //    {
                //        OrderId = order.OrderId,
                //        PaymentMode = "Card",
                //        CardNumberMasked = MaskCardNumber(dto.CardDetail.CardNumber),
                //        PaymentDate = DateTime.Now,
                //        Amount = totalAmount
                //    };
                //    _context.MstPayments.Add(payment);
                //}

                //await _context.SaveChangesAsync();

                //var cartItems = _context.MstCartItems
                //    .Include(ci => ci.Cart)
                //    .Where(ci => ci.Cart.CustomerId == dto.CustomerID)

                //await transaction.CommitAsync();


                // Step 1: Fetch only cart items that match the given DTO items
                var productIds = dto.OrderItems.Select(i => i.ProductID).ToList();

                var cartItems = await _context.MstCartItems
                    .Include(ci => ci.Cart)
                    .Where(ci => ci.Cart.CustomerId == dto.CustomerID && productIds.Contains(ci.ProductId))
                    .ToListAsync();

                if (!cartItems.Any())
                {
                    return BadRequest("No valid cart items found for this order.");
                }

                // Step 2: Validate stock & calculate total
                decimal totalAmount = 0;
                foreach (var dtoItem in dto.OrderItems)
                {
                    var cartItem = cartItems.FirstOrDefault(c => c.ProductId == dtoItem.ProductID);
                    if (cartItem == null)
                        throw new Exception($"Product {dtoItem.ProductID} not found in cart.");

                    if (dtoItem.Quantity > cartItem.Quantity)
                        throw new Exception($"Requested quantity for {dtoItem.ProductID} exceeds cart quantity.");

                    var product = await _context.MstProducts.FindAsync(dtoItem.ProductID);
                    if (product == null)
                        throw new Exception($"Invalid product {dtoItem.ProductID}");

                    if (product.CurrentStock < dtoItem.Quantity)
                        throw new Exception($"Insufficient stock for {product.Name}");

                    totalAmount += dtoItem.Quantity * product.Price;
                }

                // Step 3: Create Order
                var order = new MstOrder
                {
                    CustomerId = dto.CustomerID,
                    OrderDate = DateTime.Now,
                    PaymentMode = dto.PaymentMode,
                    TotalAmount = totalAmount,
                    DeliveryCharge = 20,
                    EstimatedDeliveryDate = DateTime.Now.AddDays(2),
                    Status = "Pending",
                    OrderNumber = "Temp-" + Guid.NewGuid().ToString("N").Substring(0, 8) // shorter temp ID
                };

                _context.MstOrders.Add(order);
                await _context.SaveChangesAsync();

                order.OrderNumber = OrderNumberGenerator.GenerateOrderNumber(order.OrderId);
                await _context.SaveChangesAsync();

                var track = new MstOrderTrackingHistory
                {
                    OrderId = order.OrderId,
                    Status = "Order Placed",

                };
                _context.MstOrderTrackingHistories.Add(track);
                await _context.SaveChangesAsync();

                // Step 4: Create OrderItems & update stock
                foreach (var dtoItem in dto.OrderItems)
                {
                    var product = await _context.MstProducts.FindAsync(dtoItem.ProductID);
                    product.CurrentStock -= dtoItem.Quantity;

                    var orderItem = new MstOrderItem
                    {
                        OrderId = order.OrderId,
                        ProductId = dtoItem.ProductID,
                        Quantity = dtoItem.Quantity,
                        UnitPrice = product.Price
                    };
                    _context.MstOrderItems.Add(orderItem);

                    // Update / reduce cartItem
                    var cartItem = cartItems.First(c => c.ProductId == dtoItem.ProductID);
                    if (dtoItem.Quantity == cartItem.Quantity)
                    {
                        // remove item completely
                        _context.MstCartItems.Remove(cartItem);
                    }
                    else
                    {
                        // reduce quantity in cart
                        cartItem.Quantity -= dtoItem.Quantity;
                        _context.MstCartItems.Update(cartItem);
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { 
                    Message = "Order placed",
                    Response = new PlaceOrderResponseDTO
                    {
                        OrderId = order.OrderId,
                        OrderNumber = order.OrderNumber,
                        Status = order.Status,
                        PaymentStatus = dto.PaymentMode.ToLower() == "cod" ? "COD - To be Paid on Delivery" : "Pending"
                    }
                });
            }
            catch(Exception ex)
            {
                await transaction.RollbackAsync();
                var innerMessage = ex.InnerException?.Message ?? ex.Message;

                return BadRequest(new
                {
                    Message = "Order failed",
                    Error = innerMessage
                });
            }
        }
        [HttpPut("cancel-order/{orderID}")]
        public async Task<IActionResult> CancelOrder(int orderID, [FromBody] CancelOrderDTO dto)
        {
            try
            {
                var order = await _context.MstOrders
                .Include(o => o.MstOrderItems)
                .FirstOrDefaultAsync(o => o.OrderId == orderID);

                if (order == null || order.Status == "Cancelled")
                    return NotFound();

                order.Status = "Cancelled";
                order.CancelledReason = dto.Reason ?? "Cancelled By StoreOwner";
                order.ModifiedAt = DateTime.Now;

                var track = new MstOrderTrackingHistory
                {
                    OrderId = order.OrderId,
                    Status = "Cancelled",
                    StatusTime = DateTime.Now,
                };
                _context.MstOrderTrackingHistories.Add(track);
                await _context.SaveChangesAsync();

                foreach (var item in order.MstOrderItems)
                {
                    var product = await _context.MstProducts.FindAsync(item.ProductId);
                    if (product != null)
                    {
                        product.CurrentStock += item.Quantity;
                    }
                }
                await _context.SaveChangesAsync();
                return Ok("Order Canceled");
            }
            catch(Exception ex)
            {
                return BadRequest(new {Message = "Failed To Cancel Order",Error = ex.Message});
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _context.MstOrders
                .Include(o => o.Customer)
                .ThenInclude(c => c.User)
                .Select(o => new OrderListDTO
                {
                    OrderID = o.OrderId,
                    OrderNumber = o.OrderNumber,
                    CustomerID = o.CustomerId,
                    CustomerName = o.Customer.User.UserName,
                    OrderDate = o.OrderDate,
                    Status = o.Status,
                    AmountPaid = o.FinalAmount
                }).ToListAsync();
            return Ok(orders);
        }
        [HttpGet("customer/{customerID}")]
        public async Task<IActionResult> GetOrdersByCustomer(
    int customerID,
    [FromQuery] string? status = "all",
    [FromQuery] string? search = "")
        {
            var baseQuery = _context.MstOrders
                .Where(o => o.CustomerId == customerID)
                .Include(o => o.MstOrderItems)
                    .ThenInclude(oi => oi.Product);

            // Compute status counts before filtering
            var statusCounts = await baseQuery
                .GroupBy(o => o.Status.ToLower())
                .Select(g => new { Status = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.Status, x => x.Count);


            var query = baseQuery.Select(o => new CustomerOrderListDTO
            {
                OrderID = o.OrderId,
                OrderNumber = o.OrderNumber,
                OrderDate = o.OrderDate,
                Status = o.Status.ToLower(),
                AmountPaid = (decimal)o.FinalAmount,
                EstimatedDelivery = o.EstimatedDeliveryDate,
                Items = o.MstOrderItems.Count,
                TopItems = o.MstOrderItems
                            .Select(p => p.Product.Name)
                            .Take(3)
                            .ToList(),
                Image = o.MstOrderItems
                            .Select(p => p.Product.ImageUrl)
                            .FirstOrDefault() ?? "https://localhost:7188/uploads/dummy_product.png"
            });

            // Apply filters
            if (!string.IsNullOrEmpty(status) && status.ToLower() != "all")
            {
                query = query.Where(o => o.Status.ToLower() == status.ToLower());
            }

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(o =>
                    o.OrderNumber.ToString().Contains(search) ||
                    o.TopItems.Any(item => item.ToLower().Contains(search.ToLower()))
                );
            }

            var orders = await query.ToListAsync();

            return Ok(new
            {
                Orders = orders,
                StatusCounts = statusCounts,
                Total = orders.Count
            });
        }

        [HttpGet("confirmation/{orderId}")]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            var order = await _context.MstOrders
                .Include(o => o.Customer)
                    .ThenInclude(c => c.User)
                .Include(o => o.MstOrderItems)
                    .ThenInclude(oi => oi.Product)
                        .ThenInclude(p => p.Category)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
                return NotFound();

            var dto = new OrderConfirmationDTO
            {
                OrderId = order.OrderId,
                OrderNumber = order.OrderNumber,
                OrderDate = order.OrderDate,
                Status = order.Status,
                PaymentMode = order.PaymentMode,
                TotalAmount = order.TotalAmount,
                DeliveryCharge = order.DeliveryCharge,
                FinalAmount = order.FinalAmount,
                TrackingNumber = order.TrackingNumber,
                EstimatedDeliveryDate = order.EstimatedDeliveryDate,

                Customer = new CustomerDTO
                {
                    UserName = order.Customer.User.UserName,
                    Address = order.Customer.Address,
                    City = order.Customer.City,
                    State = order.Customer.State,
                    PinCode = order.Customer.Pincode
                },
                Items = order.MstOrderItems.Select(i => new OrderItemResponseDTO
                {
                    ProductID = i.ProductId,
                    Name = i.Product.Name,
                    Category = i.Product.Category.Name,
                    Price = i.UnitPrice,
                    Quantity = i.Quantity,
                    ImageUrl = i.Product.ImageUrl
                }).ToList()
            };
            return Ok(dto);
        }

        [HttpGet("owner/GetAll")]
        public async Task<IActionResult> GetOrdersForOwner(
            [FromQuery] string search = "",
            [FromQuery] string status = "all",
            [FromQuery] string payment = "all",
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 6
        )
        {
            var query = _context.MstOrders
                .Include(o => o.Customer)
                    .ThenInclude(c => c.User)
                .Include(o => o.MstOrderItems)
                    .ThenInclude(oi => oi.Product)
                        .ThenInclude(p => p.Category)
                .Include(o => o.MstPayments)
                .Include(o => o.MstDeliveryStaffAssignments)
                    .ThenInclude(a => a.DeliveryStaff)
                        .ThenInclude(d => d.User)
                .Include(o => o.MstDeliveryStaffAssignments)
                    .ThenInclude(a => a.DeliveryStaff)
                        .ThenInclude(d => d.Zone)
                .AsQueryable();

            // Search by customer name or order number
            if (!string.IsNullOrEmpty(search))
            {
                search = search.ToLower();
                query = query.Where(o =>
                    o.OrderNumber.ToLower().Contains(search) ||
                    o.Customer.User.UserName.ToLower().Contains(search));
            }

            // Filter by status
            if (!string.IsNullOrEmpty(status) && status.ToLower() != "all")
                query = query.Where(o => o.Status.ToLower() == status.ToLower());

            // Filter by payment method
            if (!string.IsNullOrEmpty(payment) && payment.ToLower() != "all")
                query = query.Where(o => o.PaymentMode.ToLower() == payment.ToLower());

            // Pagination
            var totalRecords = await query.CountAsync();
            var orders = await query
                .OrderByDescending(o => o.OrderDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = orders.Select(o =>
            {
                var latestAssignment = o.MstDeliveryStaffAssignments
                    .OrderByDescending(a => a.AssignedDate)
                    .FirstOrDefault();

                return new
                {
                    id = o.OrderId,
                    orderNumber = o.OrderNumber,
                    customer = new
                    {
                        name = o.Customer.User.UserName,
                        phone = o.Customer.User.Phone,
                        address = o.Customer.Address
                    },
                    status = o.Status.ToLower(),
                    paymentMethod = o.PaymentMode.ToLower(),
                    paymentStatus = o.MstPayments.Any() ? "paid" : "pending",
                    total = o.FinalAmount,
                    orderDate = o.OrderDate.ToString("yyyy-MM-dd hh:mm tt"),
                    assignedStaff = latestAssignment != null ? new
                    {
                        id = latestAssignment.DeliveryStaffId,
                        name = latestAssignment.DeliveryStaff.User.UserName,
                        phone = latestAssignment.DeliveryStaff.User.Phone,
                        zone = latestAssignment.DeliveryStaff.Zone.ZoneName,
                        avatar = latestAssignment.DeliveryStaff.User.ProfileImageUrl ?? "https://localhost:7188/uploads/dummy_profileImage.jpg"
                    } : null,
                    itemCount = o.MstOrderItems.Count
                };
            });

            return Ok(new
            {
                data = result,
                totalRecords,
                currentPage = page,
                pageSize
            });
        }

        [HttpPut("accept-order/{orderId}")]
        public async Task<IActionResult> AcceptOrder(int orderId)
        {
            var currentDateTime = DateTime.Now;
            var order = await _context.MstOrders.FindAsync(orderId);

            if (order == null)
                return NotFound(new { Status = "ERROR", Message = "Order not found" });

            order.Status = "Confirmed";
            order.ModifiedAt = currentDateTime;

            var track = new MstOrderTrackingHistory
            {
                OrderId = order.OrderId,
                Status = "Confirmed",
                StatusTime = currentDateTime,
                Note = "Order confirmed successfully"
            };

            await _context.MstOrderTrackingHistories.AddAsync(track);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { Status = "SUCCESS", Message = "Order Confirmed" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "ERROR", Message = ex.InnerException?.Message ?? ex.Message , StackTrace = ex.StackTrace });
            }
        }

        [HttpPut("update-status/{orderId}")]
        public async Task<IActionResult> UpdateStatus(int orderId, [FromBody] UpdateStatusDTO dto)
        {
            var currentDateTime = DateTime.Now;
            var order = await _context.MstOrders.FindAsync(orderId);

            if (order == null)
                return NotFound(new { Status = "ERROR", Message = "Order not found" });

            order.Status = dto.Status;
            order.ModifiedAt = currentDateTime;
            var track = new MstOrderTrackingHistory
            {
                OrderId = order.OrderId,
                Status = dto.Status,
                StatusTime = currentDateTime
            };

            await _context.MstOrderTrackingHistories.AddAsync(track);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { Status = "SUCCESS", Message = "Status Updated Successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "ERROR", Message = ex.InnerException?.Message ?? ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpPut("mark-delivered/{orderId}")]
        public async Task<IActionResult> MarkAsDelivered(int orderId)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();
            var currentDateTime = DateTime.Now;

            try
            {
                // Fetch order with related data
                var order = await _context.MstOrders
                .Include(o => o.MstPayments)
                .Include(o => o.MstDeliveryStaffAssignments)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

                if (order == null)
                    return NotFound(new { Status = "ERROR", Message = "Order not found" });

                // 1️⃣ Update order status
                order.Status = "Delivered";
                order.ModifiedAt = currentDateTime;
                order.DeliveredDate = currentDateTime;

                // 2️⃣ Update Payment if COD
                if (order.PaymentMode == "COD")
                {
                    var payment = order.MstPayments.FirstOrDefault();
                    if (payment != null)
                    {
                        payment.Status = "Paid";
                        payment.PaymentDate = currentDateTime;
                    }
                    else
                    {
                        // If no payment record exists, create one
                        await _context.MstPayments.AddAsync(new MstPayment
                        {
                            OrderId = order.OrderId,
                            AmountPaid = (decimal)order.FinalAmount,
                            PaymentMode = "COD",
                            Status = "Paid",
                            PaymentDate = currentDateTime
                        });
                    }
                }

                // 3️⃣ Update Delivery Staff stats
                var assignment = order.MstDeliveryStaffAssignments
                    .OrderByDescending(a => a.AssignedDate)
                    .FirstOrDefault();

                if (assignment != null)
                {
                    var staff = await _context.MstDeliveryStaffs.FindAsync(assignment.DeliveryStaffId);
                    if (staff != null)
                    {
                        staff.CurrentLoad = Math.Max(0, staff.CurrentLoad - 1); // decrease load
                        staff.TotalDeliveriesCompleted += 1; // increase completed
                        staff.TotalEarnings += 15; // add earnings (assuming DeliveryCharge = earning) deliveryEarning = 15
                    }
                }

                // 4️⃣ Add tracking entry
                var track = new MstOrderTrackingHistory
                {
                    OrderId = order.OrderId,
                    Status = "Delivered",
                    StatusTime = currentDateTime,
                    Note = "Order marked as delivered"
                };

                await _context.MstOrderTrackingHistories.AddAsync(track);

                // ✅ Save all changes
                await _context.SaveChangesAsync();

                // ✅ Commit transaction
                await transaction.CommitAsync();
                return Ok(new { Status = "SUCCESS", Message = "Order marked as Delivered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Status = "ERROR",
                    Message = ex.InnerException?.Message ?? ex.Message,
                    StackTrace = ex.StackTrace
                });
            }
        }



        [HttpGet("delivery-staff/{staffId}/orders")]
        public async Task<IActionResult> GetOrdersForDeliveryStaff(int staffId)
        {
            var orders = await _context.MstOrders
                .Include(o => o.Customer)
                    .ThenInclude(c => c.User)
                .Include(o => o.MstOrderItems)
                    .ThenInclude(oi => oi.Product)
                .Include(o => o.MstOrderTrackingHistories)
                .Include(o => o.MstPayments)
                .Include(o => o.MstDeliveryStaffAssignments)
                .Where(o => o.MstDeliveryStaffAssignments
                    .Any(a => a.DeliveryStaffId == staffId))  // ✅ only assigned to this staff
                .OrderByDescending(o => o.MstDeliveryStaffAssignments
                    .Where(a => a.DeliveryStaffId == staffId)
                    .Max(a => a.AssignedDate)) // ✅ sort by latest assignment date for that staff
                .ToListAsync();

            if (!orders.Any())
                return NotFound(new { Message = "No orders found for this delivery staff" });

            var result = orders.Select(o =>
            {
                var assignment = o.MstDeliveryStaffAssignments
                    .OrderByDescending(a => a.AssignedDate)
                    .FirstOrDefault(a => a.DeliveryStaffId == staffId);

                // ✅ Get DeliveredAt from tracking history
                var deliveredAt = o.MstOrderTrackingHistories
                    .Where(th => th.Status.ToLower() == "delivered")
                    .OrderByDescending(th => th.StatusTime)
                    .Select(th => (DateTime?)th.StatusTime)
                    .FirstOrDefault();

                return new
                {
                    id = o.OrderId,
                    orderNumber = o.OrderNumber,
                    customerName = o.Customer.User.UserName,
                    customerPhone = o.Customer.User.Phone,
                    address = $"{o.Customer.Address}, {o.Customer.City}, {o.Customer.Pincode}",
                    items = o.MstOrderItems.Select(i => new
                    {
                        id = i.ProductId.ToString(),
                        name = i.Product.Name,
                        quantity = i.Quantity,
                        price = i.UnitPrice,
                        image = i.Product.ImageUrl ?? "https://localhost:7188/uploads/dummy_product.png"
                    }).ToList(),
                    totalAmount = o.TotalAmount,
                    deliveryCharge = o.DeliveryCharge,
                    finalAmount = o.FinalAmount,
                    paymentStatus = o.MstPayments
                        .OrderByDescending(p => p.PaymentDate)  // ✅ pick the latest payment if multiple
                        .Select(p => p.Status.ToLower()) // ✅ read actual DB status
                        .FirstOrDefault() ?? "pending",
                    paymentMode = o.PaymentMode,
                    status = o.Status.ToLower(),
                    assignedAt = assignment?.AssignedDate,
                    deliveredAt = deliveredAt ?? null,
                    //otp = o.OTPCode,  // If you store OTP in DB
                    //customerRating = o.CustomerRating,
                    //customerReview = o.CustomerReview
                };
            });

            return Ok(result);
        }

        [HttpGet("delivery-staff/{staffId}/orders/{orderId}")]
        public async Task<IActionResult> GetOrderDetailsForDeliveryStaff(int staffId,int orderId)
        {
            var order = await _context.MstOrders
                .Include(o => o.Customer)
                    .ThenInclude(c => c.User)
                .Include(o => o.MstOrderItems)
                    .ThenInclude(oi => oi.Product)
                .Include(o => o.MstOrderTrackingHistories)
                .Include(o => o.MstPayments)
                .Include(o => o.MstDeliveryStaffAssignments)
                .FirstOrDefaultAsync(o => o.OrderId == orderId &&
                                  o.MstDeliveryStaffAssignments.Any(a => a.DeliveryStaffId == staffId));

            if (order == null)
                return NotFound();

            var result = new
            {
                id = order.OrderId,
                orderNumber = order.OrderNumber,
                customerName = order.Customer.User.UserName,
                customerPhone = order.Customer.User.Phone,
                address = $"{order.Customer.Address}, {order.Customer.City}, {order.Customer.Pincode}",
                items = order.MstOrderItems.Select(i => new {
                    id = i.ProductId.ToString(),
                    name = i.Product.Name,
                    quantity = i.Quantity,
                    price = i.UnitPrice,
                    image = i.Product.ImageUrl ?? "https://localhost:7188/uploads/dummy_product.png"
                }),
                totalAmount = order.TotalAmount,
                deliveryCharge = order.DeliveryCharge,
                finalAmount = order.FinalAmount,
                paymentStatus = order.MstPayments
                        .OrderByDescending(p => p.PaymentDate)  // ✅ pick the latest payment if multiple
                        .Select(p => p.Status.ToLower()) // ✅ read actual DB status
                        .FirstOrDefault() ?? "pending",
                paymentMode = order.PaymentMode,
                status = order.Status.ToLower(),
                assignedAt = order.MstDeliveryStaffAssignments
                        .OrderByDescending(a => a.AssignedDate)
                        .FirstOrDefault()?.AssignedDate,
                deliveredAt = order.MstOrderTrackingHistories
                        .Where(th => th.Status.ToLower() == "delivered")
                        .OrderByDescending(th => th.StatusTime)
                        .Select(th => (DateTime?)th.StatusTime)
                        .FirstOrDefault(),
                //otp = order.OTPCode,
                //customerRating = order.CustomerRating,
                //customerReview = order.CustomerReview
            };

            return Ok(result);
        }

        [HttpGet("customer/{customerId}/order/{orderId}")]
        public async Task<IActionResult> GetOrderDetailsForCustomer(int customerId, int orderId)
        {
            var order = await _context.MstOrders
                .Include(o => o.Customer)
                    .ThenInclude(c => c.User)
                .Include(o => o.MstOrderItems)
                    .ThenInclude(oi => oi.Product)
                .Include(o => o.MstOrderTrackingHistories)
                .FirstOrDefaultAsync(o => o.OrderId == orderId && o.CustomerId == customerId);

            if (order == null)
                return NotFound(new { Message = "Order not found" });

            // ✅ Timeline sequence
            var masterStatuses = new List<(string Status, string Description)>
            {
                ("order placed", "We have received your order"),
                ("confirmed", "Store confirmed your order"),
                ("packed", "Your items are packed"),
                ("shipped", "Your order is on the way"),
                ("delivered", "Order delivered successfully")
            };

            // ✅ Current order status
            var currentStatus = order.Status.ToLower();

            // ✅ Timeline (merge master with tracking history + completed flag)
            var timeline = masterStatuses.Select(step =>
            {
                var tracking = order.MstOrderTrackingHistories
                    .FirstOrDefault(th => th.Status.ToLower() == step.Status);

                return new
                {
                    status = step.Status,
                    description = step.Description,
                    completed = tracking != null,   // ✅ completed if tracking exists
                    date = tracking?.StatusTime
                };
            }).ToList();

            var result = new
            {
                id = order.OrderId,
                orderNumber = order.OrderNumber,
                date = order.OrderDate,
                status = order.Status.ToLower(),
                total = order.FinalAmount,
                subtotal = order.TotalAmount,
                deliveryFee = order.DeliveryCharge,
                discount = 0,
                estimatedDelivery = order.EstimatedDeliveryDate,
                trackingNumber = order.TrackingNumber ?? "Not Assigned",
                paymentMethod = order.PaymentMode,

                // ✅ Order Items
                items = order.MstOrderItems.Select(i => new {
                    id = i.ProductId,
                    name = i.Product.Name,
                    price = i.UnitPrice,
                    quantity = i.Quantity,
                    image = i.Product.ImageUrl ?? "https://localhost:7188/uploads/dummy_product.png",
                }).ToList(),

                // ✅ Delivery Address
                deliveryAddress = new
                {
                    name = order.Customer.User.UserName,
                    address = order.Customer.Address,
                    city = order.Customer.City,
                    state = order.Customer.State,
                    zipCode = order.Customer.Pincode,
                    phone = order.Customer.User.Phone
                },

                // ✅ Timeline (from tracking table)
                timeline
            };

            return Ok(result);
        }





        //public DateTime GetEstimatedDeliveryDate(MstOrder order)
        //{
        //    // Example: Add 2 days for normal orders
        //    DateTime estimatedDate = DateTime.Now.AddDays(2);

        //    // If express delivery chosen
        //    if (order.IsExpressDelivery)
        //        estimatedDate = DateTime.Now.AddHours(6);

        //    // If slot chosen
        //    if (order.DeliverySlot != null)
        //    {
        //        // Suppose slot is 10 AM - 2 PM on next day
        //        estimatedDate = DateTime.Today.AddDays(1).AddHours(10);
        //    }

        //    return estimatedDate;
        //}

    }

}
