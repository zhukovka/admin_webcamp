import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {CourseListComponent} from "../course-list/course-list.component";
import {StudentListComponent} from "../student-list/student-list.component";
import {CourseComponent} from "../course/course.component";
import {StudentComponent} from "../student/student.component";
const appRoutes:Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'courses', component: CourseListComponent},
    {path: 'courses/:id', component: CourseComponent},
    {path: 'students', component: StudentListComponent},
    {path: 'students/:id', component: StudentComponent}
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
