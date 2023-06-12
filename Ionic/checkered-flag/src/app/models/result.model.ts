export class Result {
  resultId: number;
  raceId: number;
  teamId: number;
  driverId: number;
  points: number;
  grid: number;
  position: number;
  fastestLap:boolean;

  constructor() {
    this.resultId = 0;
    this.raceId = 0;
    this.driverId = 0;
    this.points = 0;
    this.grid = 0;
    this.teamId = 0;
    this.position = 0;
    this.fastestLap=false;
  }
}
