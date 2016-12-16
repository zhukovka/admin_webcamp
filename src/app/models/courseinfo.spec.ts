// import 'mocha';
import {expect} from 'chai';
import {CourseInfo} from "./CourseInfo";
describe('test', ()=> {
  let courseInfo;
  beforeEach(()=> {
    courseInfo = CourseInfo.fromJSON(
      {
        "id": 3,
        "course_id": 1,
        "modifier": 0,
        "price": 4100,
        "days": "2,4",
        "duration": 3,
        "include": 0
      }
    )
  });
  it('should create course info instance', ()=> {
    expect(courseInfo).to.be.an.instanceof(CourseInfo);
  });
  it('should create weekdays from days string', ()=> {
    courseInfo.setWeekdays();
    expect(courseInfo.weekdays.has(CourseInfo.Days[2])).to.be.ok;
  });

  it('should transform weekdays Set to csv', ()=>{
    courseInfo.weekdays.add(CourseInfo.Days[7]);
    courseInfo.normalizeWeekdays();
    expect(courseInfo.days).to.equal('2,4,7');
  });
});
