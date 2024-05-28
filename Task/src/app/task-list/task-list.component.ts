import { Component,OnInit } from '@angular/core';
import { ITask } from '../itask';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit  {
    list_task: ITask[] = [];
    task :ITask[] = [];
    private _listFilter: string = '';
    ngOnInit(): void {
      this.fetchTaskList();
    }
    fetchTaskList(): void {
      fetch('http://localhost:5000/task')
        .then(response => {
          if (!response.ok) {
            throw new Error('Khong nhan duoc du lieu');
          }
          return response.json();
        })
        .then(data => {
          this.list_task = data;
          this.task = data; 
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.list_task = this._listFilter ? this.performFilter(this._listFilter) : this.task;
    }
    performFilter(filterBy: string): ITask[] { 
      filterBy = filterBy.toLocaleLowerCase();
      return this.task.filter((tt: ITask) =>
        tt.ten_task.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}
