﻿using CheckeredFlagAPI.Models.AuthModels;

namespace CheckeredFlagAPI.Services.DirectorService
{
    public interface IDirectorService
    {
        public DirectorDTO GetByID(int guid);

        // Obtener empleado con un correo específico
        public DirectorDTO GetByUser(string email);

        public IEnumerable<DirectorDTO> GetAll();

    }
}