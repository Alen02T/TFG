import { Circuit } from "./circuit.model";

export class Liga {
  id:number;
  nombre:string;
  descripcion:string;
  fechaInicio:Date;
  fechaFin:Date;
  ubicacion:string;
  directorId:number;
  // circuits: Circuit[] = [];
  constructor() {
    this.id = 0;
    this.nombre = "";
    this.descripcion = "";
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
    this.ubicacion="";
    this.directorId = 0;
  }
}
