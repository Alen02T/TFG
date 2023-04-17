namespace CheckeredFlagAPI.Models
{
    public class Driver
    {
        public int driverId { get; set; }
        
        //Piloto
        public string Name { get; set; }
        public string Lastname { get; set; }
        public int Age { get; set; }
        public string Country { get; set; }
        public string Flag { get; set; }
        public int Number { get; set; }
        public string imageDriver { get; set; }
        
        //TeamId
        public int Team { get; set; }

        public int MarketValue { get; set; }
   
        
      
    }
}
