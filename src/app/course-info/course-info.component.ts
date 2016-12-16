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
  private weekdays = [CourseInfo.Days[1], CourseInfo.Days[2], CourseInfo.Days[3], CourseInfo.Days[4], CourseInfo.Days[5], CourseInfo.Days[6], CourseInfo.Days[7]];

  getCourseInfo():Promise<CourseInfo> {
    return this.courseService.getCourseInfoByCidMid(this.courseId, this.modifierId).then(cinfo=>this.courseInfo = cinfo);
  }

  constructor(private courseService:CourseService) {
  }

  ngOnChanges(changes:SimpleChanges):void {
    this.getCourseInfo();
  }

  onSubmit() {
    this.courseInfo.normalizeWeekdays();
    this.courseService.updateCourseInfo(this.courseInfo).then(ok=>{
      return this.getCourseInfo();
    }).then(()=>{
      this.editMode = false;
    });
  }

  startEdit() {
    this.editMode = true;
  }

  discard() {
    this.getCourseInfo().then(()=> {
      this.editMode = false;
    });
  }

  changeWeekDay(val:any, day:string) {
    this.courseInfo.changeWeekDay(day);
  }

  inWeekDays(day:string):boolean {
    return this.courseInfo.weekdays.has(day);
  }
}
