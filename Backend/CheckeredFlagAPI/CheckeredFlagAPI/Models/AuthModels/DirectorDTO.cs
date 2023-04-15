using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheckeredFlagAPI.Models.AuthModels
{
    public class DirectorDTO
    {

        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int TeamId { get; set; }

      
    }
}
