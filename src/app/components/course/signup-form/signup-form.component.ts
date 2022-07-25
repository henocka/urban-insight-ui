import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseSignupService} from '../../../services/course-signup.service';
import {CourseDetails, CourseSchedule, Topic} from '../../../models/Course';
import {SharedDataService} from '../../../services/shared-data.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private courseSignupService: CourseSignupService,
    private sharedDataService: SharedDataService
    ) { }

  // @ts-ignore
  courseSignupForm: FormGroup;
  // @ts-ignore
  courseDetails: CourseDetails[];
  subjects: string[] = [];
  topics: string[] = [];
  // @ts-ignore
  selectedSubject: string;
  // @ts-ignore
  selectedTopic: string;
  // @ts-ignore
  selectedTimeSlot: string;
  // @ts-ignore
  selectedSubjectDetails: CourseDetails;
  // @ts-ignore
  selectedTopicDetails: Topic;
  timeSlots: string[] = [];
  isSubjectSelected = false;
  isTopicSelected = false;
  newForm = true;

  guideMessages = {
    username: [
      { type: 'required', message: 'Username is required' }
    ],
    email: [
      { type: 'required', message: 'Email is required' }
    ],
    studentId: [
      { type: 'required', message: 'Student Id is required' }
    ]
  };

  ngOnInit(): void {
    this.courseSignupService.getCourseDetails().subscribe((courseDetails) => {
      this.courseDetails = courseDetails;
      this.subjects = this.courseDetails.map(courseDetail => courseDetail.subjectName);
    });
    this.createCourseSignupForm();
  }


  createCourseSignupForm(): void {

    this.courseSignupForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      studentId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])),
      courseSubject: new FormControl('', Validators.compose([
        Validators.required
      ])),
      courseTopic: new FormControl('', Validators.compose([
        Validators.required
      ])),
      courseTimeSlot: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  // tslint:disable-next-line:typedef
  onCourseSubjectChange(event: any) {
  this.selectedSubject = event.value;
    const subjectDetails =  this.courseDetails.find(courseDetail => courseDetail.subjectName === event.value);
    if(!!subjectDetails) {
      this.selectedSubjectDetails = subjectDetails;
      this.topics = subjectDetails.topics.map(topic => topic.topicName);
    }
    // tslint:disable-next-line:no-console
  this.isSubjectSelected = true;
  }

  // tslint:disable-next-line:typedef
  onCourseTopicChange(event: any) {
    this.selectedTopic = event.value;
    const topicDetails =  this.selectedSubjectDetails.topics.find(topic => topic.topicName === event.value);
    if(!!topicDetails) {
      this.selectedTopicDetails = topicDetails;
      this.timeSlots = topicDetails.timeSlots;
    }
    // tslint:disable-next-line:no-console
    console.log("event val : ", event)
    this.isTopicSelected = true;
  }

  onCourseTimeSlotChange(event: any) {
    this.selectedTimeSlot = event.value;
  }

  // tslint:disable-next-line:typedef no-empty
  onSubmitCourseSignup(courses: any) {
    // tslint:disable-next-line:no-console
    this.newForm = false;
    console.log(courses);
    this.courseSignupService.signup(courses);
    this.sharedDataService.sendData(courses.username);
    this.createCourseSignupForm();
    this.newForm = true;
    this.isSubjectSelected = false;
    this.isTopicSelected = false;
  }



}
