export class Qualy{
  id:number;
  raceId:number;
  time:string | null;
  driverId:number;
  grid:number;
  fastestLap:boolean;

constructor(){
  this.id=0;
  this.raceId=0;
  this.driverId=0;
  this.time=null;
  this.grid=0;
  this.fastestLap=false;
}


}
