import {Injectable} from '@angular/core';
import {Course, Track, ICourse} from "./models/Course";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Rx";
import {CourseSummary, ICourseSummary} from "./models/CourseSummary";
const HOST = '//localhost/api.webcamp';
const TRACKS_URL = `${HOST}/tracks`;
const COURSE_SUMMARY_URL = `${HOST}/full/courses`;
const COURSE_URL = `${HOST}/courses`;
@Injectable()
export class CourseService {
    private courses:Course[];
    private courseSummaryList:CourseSummary[];

    constructor(private http:Http) {
    }

    getCourse(id:number):Promise<Course>{
      return this.http.get(COURSE_URL+`/${id}`).map(r=>{
        return Course.fromJSON(r.json());
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

    getCourseSummaryList(nocache=false):Promise<CourseSummary[]> {
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
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(COURSE_SUMMARY_URL, courseSummary, options).toPromise();
    }
}
