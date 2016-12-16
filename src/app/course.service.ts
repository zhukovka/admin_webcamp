import {Injectable} from '@angular/core';
import {Course, Track, ICourse} from "./models/Course";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Rx";
import {CourseSummary, ICourseSummary} from "./models/CourseSummary";
import {Schedule} from "./models/Schedule";
import {CourseInfo} from "./models/CourseInfo";
const HOST = '//localhost/api.webcamp';
const TRACKS_URL = `${HOST}/tracks`;
const COURSE_SUMMARY_URL = `${HOST}/full/courses`;
const COURSE_URL = `${HOST}/courses`;
const SCHEDULE_URL = `${HOST}/schedule`;
const SCHEDULE_UPDATE_URL = `${HOST}/update/schedule`;
const SCHEDULE_DELETE_URL = `${HOST}/delete/schedule`;
const COURSE_UPDATE_URL = `${HOST}/update/courses`;
const COURSEINFO_URL = `${HOST}/courseinfo`;
const COURSEINFO_UPDATE_URL = `${HOST}/update/courseinfo`;
const headers = new Headers({'Content-Type': 'application/json'});
const options = new RequestOptions({headers: headers});
@Injectable()
export class CourseService {
  private courses:Course[];
  private courseSummaryList:CourseSummary[];

  constructor(private http:Http) {
  }

  getCourse(id:number):Promise<Course> {
    return this.http.get(COURSE_URL + `/${id}`).map(r=> {
      return Course.fromJSON(r.json());
    }).toPromise();
  }

  getSchedulesByCourseId(id:number):Promise<Schedule[]> {
    return this.http.get(SCHEDULE_URL + `/${id}`).map(r=> {
      return r.json().map((el:any)=>Schedule.fromJSON(el));
    }).toPromise();
  }

  getSchedule(sid:number):Promise<Schedule> {
    return this.http.get(SCHEDULE_URL + `/id/${sid}`).map(r=> {
      return Schedule.fromJSON(r.json());
    }).toPromise();
  }

  getCourses():Promise<Course[]> {
    return this.coursesStore().toPromise();
  }

  coursesStore():Observable<Course[]> {
    if (this.courses) {
      return Observable.of(this.courses);
    } else {
      return this.http.get(COURSE_URL).map(r=> {
        this.courses = r.json().map((el:ICourse)=>Course.fromJSON(el));
        return this.courses;
      });
    }
  }

  getCoursesLimit(limit:number):Observable<Course[]> {
    return this.coursesStore().map(courses=> {
      return courses.slice(0, limit);
    });
  }

  getTracks():Promise<Track[]> {
    return this.http.get(TRACKS_URL).map(r=>r.json()as Track[]).toPromise();
  }

  getCourseSummaryList(nocache = false):Promise<CourseSummary[]> {
    if (!this.courseSummaryList || nocache) {
      return this.fetchCourseSummary();
    }
    return Promise.resolve(this.courseSummaryList);
  }

  private fetchCourseSummary():Promise<CourseSummary[]> {
    return this.http.get(COURSE_SUMMARY_URL).map(r => {
      this.courseSummaryList = r.json()as CourseSummary[];
      return this.courseSummaryList;
    }).toPromise();
  }

  findCourseSummary(courseId:number):Promise<CourseSummary> {
    return this.getCourseSummaryList().then(list=> {
      return list.find((el:CourseSummary)=>el.course_id == courseId);
    });
  }

  updateCourseSummary(courseSummary:CourseSummary):Promise<Response> {
    return this.http.post(COURSE_SUMMARY_URL, courseSummary, options).toPromise();
  }

  updateCourse(course:Course):Promise<Course> {
    return this.http.post(COURSE_UPDATE_URL, course, options).toPromise().then(r=> {
      return this.getCourse(course.id);
    });
  }

  postSchedule(schedule:Schedule):Promise<boolean> {
    schedule.normalizeStart();
    return this.http.post(SCHEDULE_URL + `/${schedule.course_id}`, schedule, options).toPromise().then(r=>true);
  }

  updateSchedule(schedule:Schedule):Promise<boolean> {
    schedule.normalizeStart();
    return this.http.post(SCHEDULE_UPDATE_URL + `/${schedule.id}`, schedule, options).toPromise().then(r=>true);
  }

  deleteSchedule(id:number):Promise<boolean> {
    return this.http.post(SCHEDULE_DELETE_URL + `/id/${id}`, null, options).toPromise().then(r=>true);
  }

  getCourseInfoByCidMid(cid:number, mid:number):Promise<CourseInfo> {
    return this.http.get(COURSEINFO_URL + `/${cid}/${mid}`).map(r => {
      return CourseInfo.fromJSON(r.json());
    }).toPromise();
  }

  updateCourseInfo(courseInfo:CourseInfo):Promise<boolean> {
    return this.http.post(COURSEINFO_UPDATE_URL + `/${courseInfo.id}`, courseInfo, options).toPromise().then(r=>true);
  }
}
