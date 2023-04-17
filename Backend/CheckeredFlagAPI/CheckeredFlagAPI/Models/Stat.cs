namespace CheckeredFlagAPI.Models
{
    public class Stat
    {
        public int DriverId { get; set; }
        public int Poles { get; set; }
        public int Podiums { get; set; }
        public int Wins { get; set; }
        public int Dnfs { get; set; }
        public int FastestLaps { get; set; }
        public int Points { get; set; }
        public int TotalRaces { get; set; }
        public int RacePositionAvg { get; set; }
        public int RaceGridAvg { get; set; }
        public int HighestGridPos { get; set; }
        public int WorstGridPos { get; set; }
        public int HighestRacePos { get; set; }
        public int WorstRacePos { get; set; }
        public int RacePositionMax { get; set; }
    }
}
