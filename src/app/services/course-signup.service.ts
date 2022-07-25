import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Course, CourseDetails, CourseSchedule} from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseSignupService {

  courseDetails: CourseDetails[] = [
    {
      subjectName: 'Math',
      topics: [
        {
          topicName: 'Algebra',
          timeSlots: ['08:00 AM', '11:00 AM']
        },
        {
          topicName: 'Trigonometry',
          timeSlots: ['09:00 AM', '12:00 PM']
        },
        {
          topicName: 'Calculus',
          timeSlots: ['10:00 AM', '03:00 PM']
        },
      ]
    },
    {
      subjectName: 'Science',
      topics: [
        {
          topicName: 'Physics',
          timeSlots: ['10:00 AM', '03:00 AM']
        },
        {
          topicName: 'Chemistry',
          timeSlots: ['09:00 AM', '01:00 PM']
        },
        {
          topicName: 'Biology',
          timeSlots: ['08:00 AM', '10:00 AM']
        },
      ]
    },
    {
      subjectName: 'Art',
      topics: [
        {
          topicName: 'Art History',
          timeSlots: ['10:00 AM', '03:00 AM']
        },
        {
          topicName: 'Painting',
          timeSlots: ['2:00 PM']
        },
        {
          topicName: 'Drawing',
          timeSlots: ['08:00 AM', '05:00 AM']
        },
      ]
    },
    {
      subjectName: 'Language Arts',
      topics: [
        {
          topicName: 'Literature',
          timeSlots: ['08:30 AM', '11:45 AM']
        },
        {
          topicName: 'Grammar',
          timeSlots: ['08:00 AM', '09:00 AM', '10:00 AM', '10:00 AM', '01:00 PM']
        },
        {
          topicName: 'Writing',
          timeSlots: ['08:00 AM', '11:00 AM']
        },
      ]
    }
  ];
  courseScheduleStore: Map<string, CourseSchedule> = new Map<string, CourseSchedule>();
  // @ts-ignore
  currentUserName: string;
  private preURL = '/api/v1';

  constructor(private http: HttpClient) {
  }

  signup(course: any): void {
    const courseBuilt: Course = new Course(course.courseSubject, course.courseTopic, course.courseTimeSlot)
    if(this.courseScheduleStore.has(course.username)) {
      this.courseScheduleStore.get(course.username)?.courses.push(courseBuilt);
    }else{
      const courseSchedule: CourseSchedule = new CourseSchedule(course.username, course.email, course.studentId, [courseBuilt]);
      this.courseScheduleStore.set(course.username, courseSchedule);
    }
    this.currentUserName = course.username;
  }

  getCourseDetails(): Observable<CourseDetails[]>{
    return of(this.courseDetails);
  }

  getCourseSchedule(username: string): Observable<CourseSchedule> {
    // @ts-ignore
    return of(this.courseScheduleStore.get(username));
  }

}
