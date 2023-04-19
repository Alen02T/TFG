using Microsoft.AspNetCore.Components.Server.Circuits;

namespace CheckeredFlagAPI.Models
{
    public class Liga
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        // Campos
        public List<Driver> _drivers = new List<Driver>();
        //private List<Circuito> _circuitos = new List<Circuito>();
    }
}
