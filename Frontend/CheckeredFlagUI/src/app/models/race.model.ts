export class Race {
  raceId: number;
  year: number;
  round: number;
  circuit: number;
  name: string | null;
  date: string | null;
  sponsor:number;
  leagueId:number;

  constructor() {
    this.raceId = 0;
    this.name = null;
    this.date = null;
    this.year = 0;
    this.round = 0;
    this.sponsor=0;
    this.circuit = 0;
    this.leagueId=0;
  }
}
