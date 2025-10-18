namespace Grocery_Store.Helpers
{
    public static class FileHelper
    {
        public static async Task<(bool Success, string ImageUrl, string Error)> SaveImageAsync(
            IFormFile image, IWebHostEnvironment env, HttpRequest request)
        {
            if (image == null || image.Length == 0)
                return (false, null, "Image is required.");

            var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            if (!allowedExtensions.Contains(extension))
                return (false, null, "Invalid image format.");

            var fileName = $"{Guid.NewGuid()}{extension}";
            var uploadPath = Path.Combine(env.WebRootPath, "uploads");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            var imageUrl = $"{request.Scheme}://{request.Host}/uploads/{fileName}";
            return (true, imageUrl, null);
        }

        public static void DeleteImage(string imageUrl, IWebHostEnvironment env)
        {
            if (string.IsNullOrEmpty(imageUrl)) return;

            var fileName = Path.GetFileName(new Uri(imageUrl).LocalPath);
            var filePath = Path.Combine(env.WebRootPath, "uploads", fileName);

            if (File.Exists(filePath))
                File.Delete(filePath);
        }
    }
}
