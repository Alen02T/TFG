using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheckeredFlagAPI.Entity
{
  
        [Table("Director")]
        public class DirectorEntity
        {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public int LeagueId { get; set; }
        }
    
}
