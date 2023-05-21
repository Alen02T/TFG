export class qualyresult {
  qualyId: number;

  driverId:number;
  driverName: string | null;
  driverLastName: string | null;
  driverCountry: string | null;
  driverFlag: string | null;
  driverNumber: number;
  driverImageDriver: string | null;
  //Hay que añadir el driverId para poder enlazarlo

  raceId:number;
  raceYear: number;
  raceRound: number;

  qualyGrid:  number;
  qualyTime: number;
  qualyFastestLap:boolean;

  teamId:number;
  teamColor: string | null;
  teamName: string | null;
  teamShieldImage: string | null;
  teamVehicleImage: string | null;

  constructor() {
    this.qualyId = 0;

    this.driverId=0;
    this.driverName = null;
    this.driverLastName =   null;
    this.driverCountry = null;
    this.driverFlag = null;
    this.driverNumber = 0;
    this.driverImageDriver=null;

    this.raceId=0;
    this.raceYear = 0;
    this.raceRound = 0;

    this.qualyGrid=0;
    this.qualyTime=0;
    this.qualyFastestLap=false;

    this.teamId=0;
    this.teamColor=null;
    this.teamName=null;
    this.teamShieldImage=null;
    this.teamVehicleImage=null;
  }
}
