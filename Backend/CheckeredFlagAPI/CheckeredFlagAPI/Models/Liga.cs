using Microsoft.AspNetCore.Components.Server.Circuits;

using System.IO;
using System.Text.Json.Serialization;

namespace CheckeredFlagAPI.Models
{
    public class Liga
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Ubicacion { get; set; }

        public int DirectorId { get; set; }
        
        public List<Circuit> Circuits { get; set; }
    }
}
