namespace CheckeredFlagAPI.Models
{
    public class GrandPrix
    {
        public int RaceId { get; set; }

        public string CircuitName { get; set; }
        public string CircuitCountry { get; set; }
        public string CircuitFlag { get; set; }
        public string CircuitImageMap { get; set; }
        public int CircuitLaps { get; set; }
        public string CircuitImage { get; set; }

        public int Circuitlength { get; set; }
        //Informacion historica
        public string CircuitdriverRecord { get; set; }
        public string CircuitlapRecord { get; set; }

        public int RaceYear { get; set; }
        public int RaceRound { get; set; }
        //public int RaceCircuit { get; set; }
        public string RaceName { get; set; }
        public string RaceDate { get; set; }

        public string SponsorName { get; set; }

        public string SponsorLink { get; set; }
    }
}
