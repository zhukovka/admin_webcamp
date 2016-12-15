import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {CourseService} from "../course.service";
import {Schedule} from "../models/Schedule";

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.css']
})
export class CourseScheduleComponent implements OnInit {
  @Input() courseId:number;
  @Input() editMode:boolean;
  @Output() onAddSchedule = new EventEmitter<boolean>();
  private schedule:Schedule = new Schedule();
  private modifiers:number[] = [Schedule.Modifiers.Default, Schedule.Modifiers.Morning, Schedule.Modifiers.Weekend, Schedule.Modifiers.Individual];
  private modifiersNames = Schedule.ModifiersNames;
  private showCourseInfo = false;

  constructor(private courseService:CourseService) {
  }

  ngOnInit() {
    this.schedule.course_id = this.courseId;
  }

  onSubmit() {
    this.exitEditMode();
    this.courseService.postSchedule(this.schedule);
  }

  private exitEditMode() {
    this.editMode = false;
    this.onAddSchedule.emit(false);
  }

  startEdit() {
    this.editMode = true;
  }

  discard() {
    this.exitEditMode();
  }
}
