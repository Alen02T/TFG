namespace CheckeredFlagAPI.Models
{
    public class Sponsor
    {
        public int sponsorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public string Link { get; set; }
        public string imgShieldBlack { get; set; }

        public string imgShield { get; set; }
        public int Team { get; set; }
    }
}
