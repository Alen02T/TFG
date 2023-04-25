namespace CheckeredFlagAPI.Models
{
    public class Qualy
    {
        public int Id { get; set; }
        public int RaceId { get; set; }
        //Tiempo marcado 
        public string Time { get; set; }
        public int DriverId { get; set; }
        public int Grid { get; set; }
        public int TeamId { get; set; }
        //Fastest Lap 
        public bool FastestLap { get; set; } = false;
    }
}
