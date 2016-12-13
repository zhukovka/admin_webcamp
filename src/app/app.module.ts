import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CourseComponent} from './course/course.component';
import {CourseListComponent} from './course-list/course-list.component';
import {StudentComponent} from './student/student.component';
import {StudentListComponent} from './student-list/student-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {MaterialModule} from "@angular/material";
import {CourseService} from "./course.service";
import {Ng2MaterialModule} from 'ng2-material';
import {SharedModule} from "../shared/shared.module";
import {CourseEditComponent} from './course-edit/course-edit.component';
import {Md2Module} from "md2/index";
import {CodemirrorModule} from 'ng2-codemirror';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';
import { SchedulesListComponent } from './schedules-list/schedules-list.component';
@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CourseListComponent,
    StudentComponent,
    StudentListComponent,
    DashboardComponent,
    CourseEditComponent,
    CourseScheduleComponent,
    SchedulesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Md2Module.forRoot(),
    MaterialModule.forRoot(),
    Ng2MaterialModule.forRoot(),
    SharedModule.forRoot(),
    CodemirrorModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
