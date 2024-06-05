import { Component, OnInit } from '@angular/core';
import { NhanvienService } from "../service/nhanvien.service";
import { INhanvien } from '../inhanvien';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffComponent implements OnInit {
  staff: INhanvien[] =[];
  newStaff: INhanvien = {
    id: this.generateRandomId(),
    ten_nv: '',
    gioi_tinh:'',
    ngay_sinh: new Date(),
    khu_vuc:'',
    hinh_anh:''
  };
  constructor(private nhanvienService: NhanvienService ){}
  ngOnInit(): void {
      this.loadNhanvien();
  }
  loadNhanvien():void{
    this.nhanvienService.getNhanvien().subscribe(
      staff =>{
        this.staff = staff;
      },
      error =>{
        console.log(error);
      }
    )
  }
  addNhanvien():void{
    this.nhanvienService.addNhanvien(this.newStaff).subscribe(
      () => {
        alert('Công việc đã được thêm thành công!');
        // Thêm công việc mới vào mảng task
        this.staff.push(this.newStaff);
        // Đặt lại newTask để chuẩn bị cho công việc tiếp theo
        this.newStaff = this.createEmptyStaff();
      },
      (error) => {
        console.error('Có lỗi xảy ra trong quá trình thêm công việc:', error);
        alert('Không thể thêm công việc. Vui lòng thử lại sau.');
      }
    );
  }
  createEmptyStaff(): INhanvien {
    return {
    id: this.generateRandomId(),
    ten_nv: '',
    gioi_tinh:'',
    ngay_sinh: new Date(),
    khu_vuc:'',
    hinh_anh:''
    };
  }
  generateRandomId(): number {
    // Tạo một số ngẫu nhiên trong khoảng từ 1 đến 1000000
    return Math.floor(Math.random() * 1000000) + 1;
  }
  deleteNhanvien():void{
    
  }
}
