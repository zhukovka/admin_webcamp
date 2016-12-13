import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Schedule} from "../models/Schedule";
import {CourseService} from "../course.service";

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.css']
})
export class SchedulesListComponent implements OnInit {
  @Input() courseId:number;
  @Output() onAddSchedule = new EventEmitter<boolean>();
  private schedules:Schedule[];
  private modifiers:number[] = [Schedule.Modifiers.Default, Schedule.Modifiers.Morning, Schedule.Modifiers.Weekend, Schedule.Modifiers.Individual];
  private modifiersNames = Schedule.ModifiersNames;
  private schedule:Schedule;

  getSchedules(courseId:number):Promise<Schedule[]> {
    return this.courseService.getSchedules(courseId).then(schedules=>this.schedules = schedules);
  }

  constructor(private courseService:CourseService) {
  }

  ngOnInit() {
    this.getSchedules(this.courseId);
  }

  inEditMode(schedule:Schedule) {
    return schedule == this.schedule;
  }

  editSchedule(schedule:Schedule) {
    this.schedule = schedule;
  }

  undoEdits() {
    this.schedule = null;
  }

  confirmEdits() {
    console.log(this.schedule);
  }

  addSchedule() {
    this.onAddSchedule.emit(true);
  }
}
