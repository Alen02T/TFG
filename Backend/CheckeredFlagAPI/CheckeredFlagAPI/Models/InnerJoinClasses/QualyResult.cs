namespace CheckeredFlagAPI.Models.InnerJoinClasses
{
    public class QualyResult
    {

        public int QualyId { get; set; }
        public int RaceId { get; set; }

        //Team
        public string TeamColor { get; set; }
        public string TeamName { get; set; }
        public string TeamShieldImage { get; set; }
        public string TeamVehicleImage { get; set; }

        //Race
        public int RaceYear { get; set; }
        public int RaceRound { get; set; }


        //Piloto
        public string DriverName { get; set; }
        public string DriverLastName { get; set; }
        public string DriverCountry { get; set; }
        public string DriverFlag { get; set; }
        public int DriverNumber { get; set; }
        public string DriverImageDriver { get; set; }


        //Result
        public int QualyGrid { get; set; }
        public string QualyTime { get; set; }
        public bool QualyFastestLap { get; set; }
    }
}
