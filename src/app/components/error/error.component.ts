import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  // @ts-ignore
  status: number;
  // @ts-ignore
  error: HttpErrorResponse;

  constructor() {}

  ngOnInit(): void {
    this.error = new HttpErrorResponse({statusText: 'You\'ve encountered an error.'});
    console.dir(this.error);
  }
}
