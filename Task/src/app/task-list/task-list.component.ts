import { Component,OnInit } from '@angular/core';
import { ITask } from '../itask';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit  {
    list_task: ITask[] = [];
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
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
}
