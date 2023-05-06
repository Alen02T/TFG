export class Driver {
  driverId:number;
  name:string;
  lastname:string;
  age:number;
  country:string;
  flag:string;
  number:number;
  imageDriver:string;
  seasonStartPrice:number;
  currentPrice:number;
  seasonChange:number;
  team:number;
  leagueId:number;


  constructor(){
    this.driverId=0;
    this.name='';
    this.lastname='';
    this.age=0;
    this.country='';
    this.flag='';
    this.currentPrice=0;
    this.seasonStartPrice=0;
    this.seasonChange=0;
    this.imageDriver='';
    this.team=0;
    this.number=0;
    this.leagueId=0;
  }


}
