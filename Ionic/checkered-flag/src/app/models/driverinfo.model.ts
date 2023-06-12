

export class driverInfo {
  driverId: number;

  //Driver
  driverName: string | null;
  driverLastName: string | null;
  driverCountry: string | null;
  driverFlag: string | null;
  driverNumber: number;
  driverImageDriver: string | null;
  driverseasonStartPrice:number;
  drivercurrentPrice:number;
  driverseasonChange:number;


  //Driver's Stats
  driverPoints:number;
  driverDnfs: number;
  driverWins: number;
  driverPoles: number;
  driverFastestLaps: number;
  driverPodiums: number;
  driverHighestGridPos: number;
  driverbeatTeamMateRate: number;
  driverHighestScoringTrack:number;




  //Driver's Abilities
  overtaking: number;
  defending: number;
  tireManagement: number;
  consistency: number;
  pace: number;
  driver: number;
  wetClimate: number;
  overall: number;


  //Driver's Team
  teamColor: string | null;
  teamName: string | null;
  teamShieldImage: string | null;
  teamVehicleImage: string | null;
  teamCountry: string |null;
  teamFlag :string |null;
  teamDirector : string | null;

  constructor() {
    this.driverId = 0;
    this.driverName = null;
    this.driverLastName =   null;
    this.driverCountry = null;
    this.driverFlag = null;
    this.driverNumber = 0;
    this.driverImageDriver=null;
    this.driverseasonStartPrice=0;
    this.drivercurrentPrice=0;
    this.driverseasonChange=0;

    this.overtaking = 0;
    this.defending = 0;
    this.tireManagement = 0;
    this.consistency = 0;
    this.pace = 0;
    this.driver = 0;
    this.wetClimate = 0;
    this.overall=0;


    //Abilities
    this.driverWins=0;
    this.driverPoints=0;
    this.driverPodiums=0;
    this.driverDnfs=0;
    this.driverPoles=0;
    this.driverFastestLaps=0;
    this.driverPodiums=0;
    this.driverHighestGridPos=0;
    this.driverbeatTeamMateRate=0;
    this.driverHighestScoringTrack=0;


    this.teamColor=null;
    this.teamName=null;
    this.teamShieldImage=null;
    this.teamVehicleImage=null;
    this.teamCountry=null;
    this.teamFlag=null;
    this.teamDirector=null;
  }
}
