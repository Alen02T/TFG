using AutoMapper;
using CheckeredFlagAPI.Data;
using CheckeredFlagAPI.Entity;
using CheckeredFlagAPI.Models.AuthModels;
using Microsoft.EntityFrameworkCore;

namespace CheckeredFlagAPI.Services.DirectorService
{

    public class DirectorService : IDirectorService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DirectorService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public DirectorDTO Add(DirectorDTO baseDirector)
        {
            var _mappedDirector = _mapper.Map<DirectorEntity>(baseDirector);
            var entityAdded = _context.Directores.Add(_mappedDirector);
            _context.SaveChanges();
            return _mapper.Map<DirectorDTO>(entityAdded);
        }

        public IEnumerable<DirectorDTO> GetAll()
        {
            return _mapper.Map<IEnumerable<DirectorDTO>>(_context.Directores.Select(x => x));
        }
        public DirectorDTO GetByID(int guid)
        {
            return _mapper.Map<DirectorDTO>(_context.Directores.FirstOrDefault(x => x.Id == guid));
        }

        public DirectorDTO GetByUser(string email)
        {
            return _mapper.Map<DirectorDTO>(_context.Directores.FirstOrDefault(x => x.Email == email));
        }






    }
}
