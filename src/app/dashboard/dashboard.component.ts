import {Component, OnInit} from '@angular/core';
import {CourseService} from "../course.service";
import {Course, Track} from "../models/Course";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    private tracks:Track[];

    getTracks() {
        this.courseService.getTracks().then(tracks=> {
            this.tracks = tracks;
        });

    }

    constructor(private router:Router, private courseService:CourseService) {
    }

    ngOnInit():void {
        this.getTracks();
    }

    goTo(link:string):void {
        this.router.navigate(['/courses'], {queryParams: {track: link}});
    }

}
