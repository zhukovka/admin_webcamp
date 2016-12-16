import {Component, OnInit, Input} from '@angular/core';
import {CourseSummary} from "../models/CourseSummary";
import {CourseService} from "../course.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html'
  // styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  @Input() courseSummary:CourseSummary;
  private courseSummaryCopy:CourseSummary;

  constructor(protected courseService:CourseService) {
  }

  ngOnInit() {
  }

  editCourse(course:CourseSummary) {
    this.courseSummary = course;
    this.courseSummaryCopy = Object.assign({}, course);
  }

  editMode(course:CourseSummary):boolean {
    return this.courseSummary == course;
  }

  undoEdits() {
    Object.assign(this.courseSummary, this.courseSummaryCopy);
    this.courseSummary = null;
  }

  updateCourseSummary():Promise<Response> {
    return this.courseService.updateCourseSummary(this.courseSummary).then((r:Response)=> {
      this.courseSummary = null;
      return r;
    });
  }

}
