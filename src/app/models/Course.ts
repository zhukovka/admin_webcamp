export interface ICourse {
  id:number;
  metadesc:string;
  name:string;
  description:string;
  results:string;
  duration:number;
  track:number;
  level:number;
  alias:string;
  requirements:string;
}

export interface Track {
  id:number;
  name:string;
}

export class Course {
  public id:number;
  public metadesc:string;
  public name:string;
  public description:string;
  public results:string[];
  public duration:number;
  public track:number;
  public level:number;
  public alias:string;
  public requirements:string[];

  public static fromJSON(json:ICourse):Course {
    const course = new Course();
    Object.assign(course, json);
    return course;
  }

  public static createTemp(id:number):Course{
    let c = new Course();
    c.id = id;
    return c;
  }

  addResult() {
    this.results.push("");
  }

  addRequirement() {
    this.requirements.push("");
  }

  removeResult(res:string) {
    const i = this.results.indexOf(res);
    if(i >= 0){
      this.results.splice(i, 1);
    }
  }

  removeRequirement(req:string) {
    const i = this.requirements.indexOf(req);
    if(i >= 0){
      this.requirements.splice(i, 1);
    }
  }


}
