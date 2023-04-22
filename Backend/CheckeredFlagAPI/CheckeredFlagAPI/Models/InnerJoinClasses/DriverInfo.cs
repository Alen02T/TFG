namespace CheckeredFlagAPI.Models.InnerJoinClasses
{
    public class DriverInfo
    {
        //Driver
        public int DriverId { get; set; }
        public string DriverName { get; set; }
        public string DriverLastName { get; set; }
        public int DriverAge { get; set; }
        public string DriverCountry { get; set; }
        public string DriverFlag { get; set; }
        public int DriverNumber { get; set; }
        public string DriverImageDriver { get; set; }
        public int DriverseasonStartPrice { get; set; }
        public int DrivercurrentPrice { get; set; }
        public int DriverseasonChange { get; set; }






        //Ability
        public int overtaking { get; set; }
        public int defending { get; set; }
        public int tireManagement { get; set; }
        public int consistency { get; set; }
        public int pace { get; set; }
        public int driver { get; set; }
        public int experience { get; set; }
        public int overall { get; set; }


        //Team
        public string TeamCountry { get; set; }
        public string TeamFlag { get; set; }
        public string TeamColor { get; set; }
        public string TeamName { get; set; }
        public string TeamDirector { get; set; }

        public string TeamShieldImage { get; set; }
        public string TeamVehicleImage { get; set; }


        //Driver Stats
        public int DriverPoints { get; set; }
        public int DriverDnfs { get; set; }
        public int DriverWins { get; set; }
        public int DriverPoles { get; set; }
        public int DriverFastestLaps { get; set; }
        public int DriverPodiums { get; set; }
        public int DriverHighestGridPos { get; set; }

        //Veces que le ha ganado a su compañero
        public int DriverbeatTeamMateRate { get; set; }

        //Circuito Id
        public int DriverHighestScoringTrack { get; set; }
    }
}
