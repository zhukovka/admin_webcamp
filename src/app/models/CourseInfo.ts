// {
//   "id": 3,
//   "course_id": 1,
//   "modifier": 0,
//   "price": 4100,
//   "days": "2,4",
//   "duration": 3,
//   "include": 0
// }
enum Days{
  Monday=1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

export class CourseInfo {
  public id:number;
  public course_id:number;
  public modifier:number;
  public price:number;
  public days:string = '';
  public weekdays:Set<string>;
  public duration:number;
  public include:number;
  static Days = Days;
  public static fromJSON(json:any):CourseInfo {
    const courseInfo = new CourseInfo();
    Object.assign(courseInfo, json);
    courseInfo.setWeekdays();
    return courseInfo;
  }

  getDays():number[] {
    return this.days.split(',').map(s=>+s);
  }

  setWeekdays():void{
    let days = this.getDays();
    this.weekdays = new Set(days.map(d=>Days[d]));
  }

  changeWeekDay(day:string) {
    if(this.weekdays.has(day)){
      this.weekdays.delete(day);
    }else{
      this.weekdays.add(day);
    }
  }

  normalizeWeekdays():void{
    this.days = Array.from(this.weekdays)
      .map((d:string) => {
        return Days[<any>d];
      })
      .join(',');
  }
}
