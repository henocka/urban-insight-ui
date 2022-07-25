export interface CourseDetails {
  subjectName: string;
  topics: Topic[];
}

export interface Topic {
  topicName: string;
  timeSlots: string[];
}



export class CourseSchedule {
  username: string;
  email: string;
  studentId: string;
  courses: Course[];

  constructor(username: string, email: string, studentId: string, courses: Course[]) {
    this.username = username;
    this.email = email;
    this.studentId = studentId;
    this.courses = courses;
  }
}

// tslint:disable-next-line:max-classes-per-file
export class Course {
  courseName: string;
  topic: string;
  timeSlot: string;

  constructor(courseName: string, topic: string, timeSlot: string) {
    this.courseName = courseName;
    this.topic = topic;
    this.timeSlot = timeSlot;
  }
}


