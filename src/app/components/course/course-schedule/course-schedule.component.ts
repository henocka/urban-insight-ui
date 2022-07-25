import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SharedDataService} from '../../../services/shared-data.service';
import {Course, CourseSchedule} from '../../../models/Course';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CourseSignupService} from '../../../services/course-signup.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.scss']
})
export class CourseScheduleComponent implements OnInit  {

  displayedColumns: string[] = ['courseName', 'topic', 'timeSlot'];
  // @ts-ignore
  dataSource: MatTableDataSource<Course>;
  // @ts-ignore
  courseScheduleOwner: CourseSchedule;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private sharedDataService: SharedDataService,
    private courseSignupService: CourseSignupService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.sharedDataService.data.subscribe(response => {
      console.log("melse" , response);  // you will receive the data from sender component here.
      this.courseSignupService.getCourseSchedule(response).subscribe(courseSchedule => {
        this.courseScheduleOwner = courseSchedule;
        this.dataSource = new MatTableDataSource(courseSchedule?.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

