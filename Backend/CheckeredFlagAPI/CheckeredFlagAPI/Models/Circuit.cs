namespace CheckeredFlagAPI.Models
{
    public class Circuit
    {

        public int circuitId { get; set; }
        public string name { get; set; }
        public string country { get; set; }
        public string flag { get; set; }
        //Imagen del mapa del circuito
        public string imageMap { get; set; }


        //Distancia de carrera
        public int laps { get; set; }
        public int length { get; set; }
        //Informacion historica
        public string driverRecord { get;set; }
        public string lapRecord { get; set; }
        

      //Imagen del circuito
        public string imageCircuit { get; set; }




    }
}
