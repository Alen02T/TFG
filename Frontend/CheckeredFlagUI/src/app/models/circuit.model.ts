export class Circuit {
  circuitId: number;

  name: string | null;

  country: string | null;

  flag: string | null;

  imageMap: string | null;

  laps: number;
  length:number;
  driverRecord:string | null;
  lapRecord:string | null;

  imageCircuit: string | null;

  constructor() {
    this.circuitId = 0;
    this.name = null;
    this.country = null;
    this.flag = null;
    this.imageMap = null;
    this.laps = 0;
    this.length=0;
    this.lapRecord=null;
    this.driverRecord=null;
    this.imageCircuit=null;
  }
}
