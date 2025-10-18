using FluentValidation;
using Grocery_Store.DTOs;

namespace Grocery_Store.Validators
{
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email)
                .NotNull()
                .EmailAddress().WithMessage("Emain must be in a valid format");

            RuleFor(x => x.Password)
                .NotNull().WithMessage("Password is required.")
                .Matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
                .WithMessage("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
        }
    }
}
