﻿using System.ComponentModel.DataAnnotations;

namespace CheckeredFlagAPI.Models.AuthModels
{
    public class AuthResult
    {
        public string Token { get; set; }
        public bool Result { get; set; }
        public List<string> Errors { get; set; }
    }
}
