import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DuanListComponent } from './duan-list/duan-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddDuanComponent } from './add-duan/add-duan.component';
import { EditDuanComponent } from './edit-duan/edit-duan.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { NhanvienListComponent } from './nhanvien-list/nhanvien-list.component';

export const routes: Routes = [
    {path : '',component: HomeComponent,title:'Home' },
    {path : 'duan',component: DuanListComponent},
    {path : 'duan/add-duan',component: AddDuanComponent},
    {path: 'duan/edit-duan/:id',component:  EditDuanComponent},
    {path : 'task',component: TaskListComponent},
    {path : 'task/add-task',component: AddTaskComponent},
    {path : 'task/edit-task/id',component:EditTaskComponent},
    {path : 'thanhvien', component: NhanvienListComponent},
    {path : '**',component: NotfoundComponent}
];
