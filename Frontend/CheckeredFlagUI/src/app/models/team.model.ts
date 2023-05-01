export class Team {
  teamId: number;
  country: string | null;
  flag: string | null;
  color: string | null;
  name: string | null;
  director: string | null;
  points: number;
  homebase:string|null;
  engine: string | null;
  chassis:string|null;
  championships:number;
  shieldImage: string | null;
  vehicleImage: string | null;
  leagueId:number;


  constructor() {
    this.teamId = 0;
    this.name = null;
    this.country = null;
    this.flag = null;
    this.color= null;
    this.director = null;
    this.points = 0;
    this.homebase=null;
    this.engine = null;
    this.chassis=null;
    this.championships=0;
    this.shieldImage = null;
    this.vehicleImage = null;
    this.leagueId=0;
  }
}
