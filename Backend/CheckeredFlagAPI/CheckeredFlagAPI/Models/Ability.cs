using System.ComponentModel.DataAnnotations;

namespace CheckeredFlagAPI.Models
{
    public class Ability
    {
        public int driverId { get; set; }
        public int abilityId { get; set; }

        [Range(20, 99, ErrorMessage = "Los puntos deben estar entre 20 y 99")]
        public int overtaking { get; set; }
        [Range(20, 99, ErrorMessage = "Los puntos deben estar entre 20 y 99")]
        public int defending { get; set; }
        [Range(20, 99, ErrorMessage = "Los puntos deben estar entre 20 y 99")]
        public int tireManagement { get; set; }
        [Range(20, 99, ErrorMessage = "Los puntos deben estar entre 20 y 99")]
        public int consistency { get; set; }
        [Range(20, 99, ErrorMessage = "Los puntos deben estar entre 20 y 99")]
        public int experience { get; set; }
        [Range(20, 99, ErrorMessage = "Los puntos deben estar entre 20 y 99")]
        public int pace { get; set; }
        [Range(20, 99, ErrorMessage = "Los puntos deben estar entre 20 y 99")]
        //public int wetClimate { get; set; }
        public int overall { get; set; }
    }
}
