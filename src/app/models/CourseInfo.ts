// {
//   "id": 3,
//   "course_id": 1,
//   "modifier": 0,
//   "price": 4100,
//   "days": "2,4",
//   "duration": 3,
//   "include": 0
// }

export class CourseInfo{
  public id:number;
  public course_id:number;
  public modifier:number;
  public price:number;
  public days:string;
  public duration:number;
  public include:number;

  public static fromJSON(json:any):CourseInfo {
    const courseInfo = new CourseInfo();
    Object.assign(courseInfo, json);
    return courseInfo;
  }

  getDays(){
    return this.days.split(',');
  }
}
