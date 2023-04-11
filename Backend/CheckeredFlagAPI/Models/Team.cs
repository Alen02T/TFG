namespace CheckeredFlagAPI.Models
{
    public class Team
    {
        //Equipo
        public int teamId { get; set; }
        public string country { get; set; }
        public string flag { get; set; }
        public string color { get; set; }
        public string name { get; set; }
        public string director { get; set; }
        public string shieldImage { get; set; }
        public string homebase {get;set;}



        //Coche del Equipo

        public string chassis { get; set; }
        public string vehicleImage { get; set; }
        public string engine { get; set; }

        //Estadisticas de equipo
        public int points { get; set; }
        public int championships { get; set; }
    }
}
