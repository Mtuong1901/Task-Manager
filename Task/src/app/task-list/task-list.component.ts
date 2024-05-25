import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task.model';
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
  tasks: Task[] = [];
  isFormVisible: boolean = false;
  newTaskName: string = '';
  newTaskDescription:string = '';
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.loadTasks();
  }
  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  addTask(): void {
    const newTask: Task = { 
      id: Date.now().toString(),
      name: this.newTaskName, 
      description: this.newTaskDescription, 
      deadline: '2024-12-31',
      status: 'todo', 
      user_id: 1 
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.loadTasks();
    });
  }
  deleteTask(taskId: string): void {
    const idNumber: number = parseInt(taskId, 10); // Chuyển đổi từ chuỗi sang số
    this.taskService.deleteTask(idNumber).subscribe(() => {
        this.loadTasks();
        this.newTaskName;
        this.newTaskDescription;
    });
  }
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
  
  
  
  
}
