namespace CheckeredFlagAPI.Models
{
    public class Result
    {
        public int resultId { get; set; }
        public int raceId { get; set; }
        public int driverId { get; set; }
        public int teamId { get; set; }
        public int grid { get; set; }
        public int position { get; set; }
        public int points { get; set; }
        public bool fastestLap { get; set; }
    }
}
