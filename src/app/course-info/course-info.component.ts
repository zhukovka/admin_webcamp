import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CourseService} from "../course.service";
import {CourseInfo} from "../models/CourseInfo";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnChanges {
  @Input() courseId:number;
  @Input() modifierId:number;
  private courseInfo:CourseInfo;
  private editMode:boolean;

  getCourseInfo() {
    this.courseService.getCourseInfoByCidMid(this.courseId, this.modifierId).then(cinfo=>this.courseInfo = cinfo);
  }

  constructor(private courseService:CourseService) {
  }

  ngOnChanges(changes:SimpleChanges):void {
    this.getCourseInfo();
  }

  onSubmit() {
  }

  startEdit() {
  }

  discard() {
  }
}
