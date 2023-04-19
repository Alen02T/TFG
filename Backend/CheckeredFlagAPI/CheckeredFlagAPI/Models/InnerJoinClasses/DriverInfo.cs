namespace CheckeredFlagAPI.Models.InnerJoinClasses
{
    public class DriverInfo
    {

        public int DriverId { get; set; }
        public string DriverName { get; set; }
        public string DriverLastName { get; set; }
        public int DriverAge { get; set; }
        public string DriverCountry { get; set; }
        public string DriverFlag { get; set; }
        public int DriverNumber { get; set; }
        public int DriverPoints { get; set; }
        public int DriverPodiums { get; set; }
        public string DriverImageDriver { get; set; }





        public int overtaking { get; set; }
        public int defending { get; set; }
        public int tireManagement { get; set; }
        public int consistency { get; set; }
        public int pace { get; set; }
        public int driver { get; set; }
        public int wetClimate { get; set; }
        public int overall { get; set; }



        public string TeamCountry { get; set; }
        public string TeamFlag { get; set; }
        public string TeamColor { get; set; }
        public string TeamName { get; set; }
        public string TeamDirector { get; set; }

        public string TeamShieldImage { get; set; }
        public string TeamVehicleImage { get; set; }
    }
}
