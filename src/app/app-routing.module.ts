import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorComponent} from './components/error/error.component';
import {DefaultComponent} from './components/default/default.component';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {CourseContainerComponent} from './components/course/course-container/course-container.component';

export const routes: Routes = [
  // { path: 'notifications/:productId/:applicationName', component: HistoryComponent, canActivate: [OktaAuthGuard] },
  { path: 'course/signup', component: CourseContainerComponent, canActivate: [OktaAuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: '', pathMatch: 'full', component: DefaultComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
