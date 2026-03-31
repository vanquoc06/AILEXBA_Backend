namespace AILEXBA_Project.DTOs
{
    public class ChangePasswordRequest
    {
        public string Email { get; set; } = string.Empty;
        public string? OldPassword { get; set; } // Có thể để trống nếu làm luồng Reset Pass qua Mail
        public string NewPassword { get; set; } = string.Empty;
    }
}