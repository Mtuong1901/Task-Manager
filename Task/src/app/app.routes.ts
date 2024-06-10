import { Routes } from '@angular/router';
import { HomeComponent } from './load/home/home.component';
import { DuanListComponent } from './load/duan-list/duan-list.component';
import { TaskListComponent } from './load/task-list/task-list.component';
import { AddDuanComponent } from './add/add-duan/add-duan.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddTaskComponent } from './add/add-task/add-task.component';
import { NhanvienListComponent } from './load/nhanvien-list/nhanvien-list.component';
import { LoginComponent } from './login/login.component';
import { AddStaffComponent } from './add/add-staff/add-staff.component';
import { RegisterComponent } from './register/register.component';
import { DuanchitietComponent } from './detail/duanchitiet/duanchitiet.component';
import { UsersComponent } from './admin/users/users.component';
import path from 'path';
import { AdminComponent } from './admin/admin/admin.component';

export const routes: Routes = [
    {path : '',component: HomeComponent,title:'Home' },
    {path : 'duan',component: DuanListComponent},
    {path: 'admin',component:AdminComponent},
    {path : 'admin/users',component:UsersComponent},
    {path : 'duan/add-duan',component: AddDuanComponent},
    {path : 'duan/:id',component:DuanchitietComponent},
    {path : 'task',component: TaskListComponent},
    {path : 'task/add-task',component: AddTaskComponent},
    {path : 'nhanvien', component: NhanvienListComponent},
    {path: 'nhanvien/add-nhanvien',component: AddStaffComponent},
    {path: 'login',component: LoginComponent},
    {path: 'signup', component: RegisterComponent},
    {path : '**',component: NotfoundComponent}
];
