export class raceResult {
  resultId: number;

  driverName: string | null;
  driverLastName: string | null;
  driverCountry: string | null;
  driverFlag: string | null;
  driverNumber: number;
  driverImageDriver: string | null;
  //Hay que añadir el driverId para poder enlazarlo


  raceYear: number;
  raceRound: number;
  raceName:string | null;

  resultGrid:  number;
  resultPosition: number;
  resultPoints: number;
  resultFastestLap:boolean;

  teamColor: string | null;
  teamName: string | null;
  teamShieldImage: string | null;
  teamVehicleImage: string | null;

  constructor() {
    this.resultId = 0;

    this.driverName = null;
    this.driverLastName =   null;
    this.driverCountry = null;
    this.driverFlag = null;
    this.driverNumber = 0;
    this.driverImageDriver=null;

    this.raceYear = 0;
    this.raceRound = 0;
    this.raceName=null;

    this.resultGrid=0;
    this.resultPosition=0;
    this.resultPoints=0;
    this.resultFastestLap=false;

    this.teamColor=null;
    this.teamName=null;
    this.teamShieldImage=null;
    this.teamVehicleImage=null;
  }
}
