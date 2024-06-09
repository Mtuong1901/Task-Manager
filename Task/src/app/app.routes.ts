import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DuanListComponent } from './duan-list/duan-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddDuanComponent } from './add-duan/add-duan.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddTaskComponent } from './add-task/add-task.component';

import { NhanvienListComponent } from './nhanvien-list/nhanvien-list.component';
import { LoginComponent } from './login/login.component';
import { AddStaffComponent } from './add-staff/add-staff.component';

export const routes: Routes = [
    {path : '',component: HomeComponent,title:'Home' },
    {path : 'duan',component: DuanListComponent},
    {path : 'duan/add-duan',component: AddDuanComponent},
    {path : 'task',component: TaskListComponent},
    {path : 'task/add-task',component: AddTaskComponent},
    {path : 'nhanvien', component: NhanvienListComponent},
    {path: 'nhanvien/add-nhanvien',component: AddStaffComponent},
    {path: 'login',component: LoginComponent},
    {path : '**',component: NotfoundComponent}
];
