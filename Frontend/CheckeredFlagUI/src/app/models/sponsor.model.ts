export class Sponsor {


  sponsorId: number;
  name: string | null;
  description: string | null;
  link: string | null;
  imgShieldBlack: string | null;
  imgShield:string | null;
  team: number;

  constructor() {
    this.sponsorId = 0;
    this.name = null;
    this.description=null;
    this.link=null;
    this.imgShield=null;
    this.imgShieldBlack=null;
    this.team = 0;
  }
}
