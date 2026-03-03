import { Routes } from '@angular/router';
import { Home } from './home/home';
import { VisionMap } from './vision-map/vision-map';
import { Meetings } from './meetings/meetings';
import { WeeklyMeetingDetail } from './meetings/weekly-meeting-detail/weekly-meeting-detail';
import { QuarterlyMeetingDetail } from './meetings/quarterly-meeting-detail/quarterly-meeting-detail';
import { TasksIssues } from './tasks-issues/tasks-issues';
import { Calendar } from './calendar/calendar';
import { Finances } from './finances/finances';
import { Profile } from './profile/profile';
import { PeopleAnalyzer } from './people-analyzer/people-analyzer';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'vision-map', component: VisionMap },
  { path: 'meetings', component: Meetings },
  { path: 'meetings/weekly/:id', component: WeeklyMeetingDetail },
  { path: 'meetings/quarterly/:id', component: QuarterlyMeetingDetail },
  { path: 'tasks-issues', component: TasksIssues },
  { path: 'calendar', component: Calendar },
  { path: 'finances', component: Finances },
  { path: 'profile', component: Profile },
  { path: 'people-analyzer', component: PeopleAnalyzer },
];
