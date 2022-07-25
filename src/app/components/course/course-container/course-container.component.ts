import { Component, OnInit } from '@angular/core';
import {CourseSignupService} from '../../../services/course-signup.service';
import {SharedDataService} from '../../../services/shared-data.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.scss']
})
export class CourseContainerComponent implements OnInit{

  isDataAvailable = false;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.sharedDataService.data.subscribe(response => {
      console.log("melse at container" , response);  // you will receive the data from sender component here.
      if(response !== 'Initial Value') {
        this.isDataAvailable = true;
      }
    });
  }

}
