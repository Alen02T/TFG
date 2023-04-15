﻿using System.ComponentModel.DataAnnotations;

namespace CheckeredFlagAPI.Models.AuthModels
{
    public class UserLoginRequestDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
