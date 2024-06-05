import { Component, OnInit } from '@angular/core';
import { ITask } from '../itask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  list_task: ITask[] = [];
  task: ITask[] = [];
  newTask: ITask = {
    id: this.generateRandomId(),
    ten_task: '',
    mo_ta: '',
    ngay_bat_dau: new Date(),
    ngay_ket_thuc: new Date(),
    trang_thai: 'todo',
    du_an_id: 1
  };
  constructor(private taskService: TaskService) {
    
  }

  ngOnInit(): void {
    this.loadTasks();
  }
  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.task = tasks;
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  addTask(): void {
    this.taskService.addTask(this.newTask).subscribe(
      () => {
        alert('Công việc đã được thêm thành công!');
        // Thêm công việc mới vào mảng task
        this.task.push(this.newTask);
        // Đặt lại newTask để chuẩn bị cho công việc tiếp theo
        this.newTask = this.createEmptyTask();
      },
      (error) => {
        console.error('Có lỗi xảy ra trong quá trình thêm công việc:', error);
        alert('Không thể thêm công việc. Vui lòng thử lại sau.');
      }
    );
  }
  
  createEmptyTask(): ITask {
    return {
      id: this.generateRandomId(),
      ten_task: '',
      mo_ta: '',
      ngay_bat_dau: new Date(),
      ngay_ket_thuc: new Date(),
      trang_thai: '',
      du_an_id: 1
    };
  }
  
  generateRandomId(): number {
    // Tạo một số ngẫu nhiên trong khoảng từ 1 đến 1000000
    return Math.floor(Math.random() * 1000000) + 1;
  }
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        alert('Công việc đã được xóa thành công!');
        this.task = this.task.filter(t => t.id !== id); // Xóa công việc khỏi mảng task
      },
      error => {
        console.error('Có lỗi xảy ra trong quá trình xóa công việc:', error);
        alert('Không thể xóa công việc. Vui lòng thử lại sau.');
      }
    );
  }
  }

