using System.ComponentModel.DataAnnotations.Schema;

namespace CheckeredFlagAPI.Entity
{
  
        [Table("Director")]
        public class DirectorEntity
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public int TeamId { get; set; }
        }
    
}
