

export class GrandPrix {
  raceId: number;

  circuitName: string | null;
  circuitCountry: string | null;
  circuitFlag: string | null;
  circuitImageMap: string | null;
  circuitLaps: number;
  circuitImage: string | null;
  circuitdriverRecord:string|null;
  circuitlapRecord:string|null;
  circuitlength:number;


  raceYear: number;
  raceRound: number;
  raceName: string | null;
  raceDate: string | null;

  sponsorName: string | null;
  sponsorLink: string | null;

  constructor() {
    this.raceId = 0;

    this.circuitName = null;
    this.circuitCountry =   null;
    this.circuitFlag = null;
    this.circuitImageMap = null;
    this.circuitLaps = 0;
    this.circuitImage=null;
    this.circuitdriverRecord=null;
    this.circuitlapRecord=null;
    this.circuitlength=0;

    this.raceYear = 0;
    this.raceRound = 0;
    this.raceName=null;
    this.raceDate=null;

    this.sponsorName=null;
    this.sponsorLink=null;
  }
}
