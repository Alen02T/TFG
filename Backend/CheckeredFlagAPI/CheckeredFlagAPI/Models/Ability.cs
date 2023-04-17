namespace CheckeredFlagAPI.Models
{
    public class Ability
    {
        public int DriverId { get; set; }
        public int statId { get; set; }
        public int overtaking { get; set; }
        public int defending { get; set; }
        public int tireManagement { get; set; }
        public int consistency { get; set; }
        public int experience { get; set; }
        public int pace { get; set; }
        //public int wetClimate { get; set; }
        public int overall { get; set; }
    }
}
