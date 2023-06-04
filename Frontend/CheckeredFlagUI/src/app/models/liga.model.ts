export class Liga {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  ubicacion: string;
  directorId: number;
  currentRound: number;
  circuits: any[]; // Puedes especificar el tipo correcto para los elementos del array

  constructor() {
    this.id = 0;
    this.nombre = "";
    this.descripcion = "";
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
    this.ubicacion = "";
    this.directorId = 0;
    this.currentRound = 0;
    this.circuits = []; // Inicializar la propiedad circuits como un array vacío
  }
}
