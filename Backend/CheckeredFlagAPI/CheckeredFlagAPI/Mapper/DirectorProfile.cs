using AutoMapper;
using CheckeredFlagAPI.Entity;
using CheckeredFlagAPI.Models.AuthModels;

namespace CheckeredFlagAPI.Mapper
{
    public class DirectorProfile : Profile
    {
        public DirectorProfile()
        {
            CreateMap<DirectorDTO, DirectorEntity>();
            CreateMap<DirectorEntity, DirectorDTO>();
            CreateMap<Director, DirectorEntity>();
            CreateMap<DirectorEntity, Director>();
        }
    }
}
