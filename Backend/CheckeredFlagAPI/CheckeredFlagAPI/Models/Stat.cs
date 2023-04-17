namespace CheckeredFlagAPI.Models
{
    public class Stat
    {

        public int Id { get; set; }
        public int DriverId { get; set; }
        public int Points { get; set; }
        public int Dnfs { get; set; }
        public int Wins { get; set; }
        public int Poles { get; set; }
        public int FastestLaps { get; set; }
        public int Podiums { get; set; }
        public int Championships { get; set; }
        public int PositionRaceAvg { get; set; }
        public int PositionGridAvg { get; set; }
        public int BestRaceFinish { get; set; }
        public int WorstRaceFinish { get; set; }
        public int HighestGridPos { get; set; }

    }
}
