import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../course.service";

@Component({
  selector: 'app-unfinished-courses',
  templateUrl: './unfinished-courses.component.html',
  styleUrls: ['./unfinished-courses.component.css']
})
export class UnfinishedCoursesComponent implements OnInit {
  private unfinished:any[];

  constructor(private route:ActivatedRoute,
              private router:Router,
              private service:CourseService) {
  }

  getUnfinishedCourses():Promise<any[]>{
    return this.service.getUnfinishedCourses().then(courses=>this.unfinished=courses);
  }

  goToCourse(event:KeyboardEvent, id:number) {
    this.router.navigate(['/courses', id]);
  }

  ngOnInit() {
    this.getUnfinishedCourses();
  }

}
