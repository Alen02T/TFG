namespace CheckeredFlagAPI.Models
{
    public class Team
    {
        //Team Info
        public int teamId { get; set; }
        public string country { get; set; }
        public string flag { get; set; }
        public string color { get; set; }
        public string name { get; set; }
        public string director { get; set; }
        public string shieldImage { get; set; }
        public string homefactory { get; set; }


        //Standings
        public int highestScoringTrack { get; set; }
        public int championships { get; set; }
        public int poles { get; set; }
        public int wins { get; set; }
        public int points { get; set; }

        //Coche
        public string engine { get; set; }
        public string chassis { get; set; }
        public string vehicleImage { get; set; }

    }
}
