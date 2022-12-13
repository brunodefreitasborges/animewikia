import { HomeComponent } from './home/home.component';
import { TrendingComponent } from './trending/trending.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path: 'trending',
    component: TrendingComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
