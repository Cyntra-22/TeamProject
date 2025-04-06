class ChangePasswordDto {
    constructor({ userId, currentPassword, newPassword, confirmNewPassword }) {
      if (!userId) {
        throw new Error('User ID is required');
      }
  
      if (!newPassword) {
        throw new Error('Current password and new password are required');
      }

      if (newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
      }
  
      if (newPassword === currentPassword) {
        throw new Error('New password must be different from current password');
      }
  
      if (newPassword !== confirmNewPassword) {
        throw new Error('New passwords do not match');
      }
  
      this.userId = userId;
      this.currentPassword = currentPassword;
      this.newPassword = newPassword;
    }
  }
  
  module.exports = ChangePasswordDto;