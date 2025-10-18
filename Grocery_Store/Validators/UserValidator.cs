using FluentValidation;
using Grocery_Store.DTOs;

namespace Grocery_Store.Validators
{
    public class UserValidator : AbstractValidator<RegisterUserDto>
    {
        public UserValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .Length(3, 30)
                .Matches("^[A-Za-z ]*$").WithMessage("UserName Should Only Contain Alphabets and space");

            RuleFor(x => x.Email)
                .NotNull()
                .EmailAddress().WithMessage("Emain must be in a valid format");

            RuleFor(x => x.Phone)
                .NotNull()
                .Matches(@"^[6-9]\d{9}$").WithMessage("Phone Number must be of 10-digit and indian number");

            RuleFor(x => x.Password)
                .NotNull().WithMessage("Password is required.")
                .Matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
                .WithMessage("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");

        }
    }
}
