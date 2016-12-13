import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {CourseService} from "../course.service";
import {Course, Track} from "../models/Course";
import {Schedule} from "../models/Schedule";
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  private course:Course;
  private tracks:Track[];
  private editMode:boolean;
  private date = new Date();
  private config = {
    lineNumbers: true,
    mode: {
      name: 'html'
    }
  };
  private newSchedule:boolean;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private service:CourseService) {
  }

  ngOnInit() {
    this.route.params
    // (+) converts string 'id' to a number
      .switchMap((params:Params) => this.service.getCourse(+params['id']))
      .subscribe((course:Course) => {
        return this.course = course;
      });
    this.service.getTracks().then(t=> {
      this.tracks = t;
    })

  }

  addResult() {
    this.course.addResult();
  }

  addRequirement() {
    this.course.addRequirement();
  }

  removeResult(res:string) {
    this.course.removeResult(res);
  }

  removeRequirement(req:string) {
    this.course.removeRequirement(req);
  }

  startEdit() {
    this.editMode = true;
  }

  discard() {
    this.editMode = false;
    this.service.getCourse(this.course.id).then(course=>this.course = course);
  }

  onSubmit() {
    console.log(this.course);
    this.editMode = false;
    this.service.updateCourse(this.course).then(c=>this.course = c);
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onNewSchedule(add:boolean){
    this.newSchedule = add;
  }
}
