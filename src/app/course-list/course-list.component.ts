import {Component, OnInit} from '@angular/core';
import {CourseService} from "../course.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Course, Track} from "../models/Course";
import {CourseSummary} from "../models/CourseSummary";
import 'rxjs/add/operator/switchMap';
import {CourseEditComponent} from "../course-edit/course-edit.component";
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent extends CourseEditComponent implements OnInit {
  private courseSummaryList:CourseSummary[] = [];
  private tracks:Track[] = [];
  private filteredSummaryList:CourseSummary[] = [];
  private selectedTrackIndex:number = 0;

  constructor(private router:Router, private route:ActivatedRoute, courseService:CourseService) {
    super(courseService);
  }

  getCourseSummaryList(nocache = false):Promise<CourseSummary[]> {
    return this.courseService.getCourseSummaryList(nocache).then(list=> {
      this.courseSummaryList = list;
      return list;
    });
  }

  getTracks():Promise<Track[]> {
    return this.courseService.getTracks().then(tracks=> {
      this.tracks = tracks;
      return tracks;
    });
  }

  onSearch(q:string) {
    if (!q) {
      this.filteredSummaryList = [];
    } else {
      this.courseService.getCourseSummaryList().then(list=> {
        const reg = new RegExp(q, 'gi');
        this.filteredSummaryList = list.filter((el:CourseSummary)=> {
          return reg.test(el.name);
        });
      });
    }
  }

  trackFilter(trackId:number) {
    return this.courseSummaryList.filter((el:CourseSummary)=> {
      return el.track_id == trackId;
    });
  }

  confirmEdits() {
    super.updateCourseSummary().then(()=> {
      this.getCourseSummaryList(true);
    })
  }

  ngOnInit() {
    this.getTracks().then(()=> {
      return this.getCourseSummaryList();
    });
    this.route.queryParams.subscribe((params:Params) => {
      if (params['track']) {
        this.selectedTrackIndex = +params['track'];
      }
    });
  }

  goToCourse(event:KeyboardEvent, id:number) {
    this.router.navigate(['/courses', id]);
  }
}
