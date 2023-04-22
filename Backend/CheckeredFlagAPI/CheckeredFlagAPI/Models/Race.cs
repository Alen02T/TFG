namespace CheckeredFlagAPI.Models
{
    public class Race
    {
        public int Id { get; set; }
        public int year { get; set; }
        public string name { get; set; }
        public int round { get; set; }

        //Id del circuito en el que se disputa
        public int Circuit { get; set; }

        public string date { get; set; }

        //Id del sponsor principal de la carrera
        public int Sponsor { get; set; }
    }
}
