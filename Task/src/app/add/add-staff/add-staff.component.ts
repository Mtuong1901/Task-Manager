import { Component, OnInit } from '@angular/core';
import { NhanvienService } from "../../service/nhanvien.service";
import { INhanvien } from '../../inhanvien';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,RouterModule],
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  staff: INhanvien[] = [];
  newStaff: INhanvien = {
    ten_nv: '',
    gioi_tinh: '',
    ngay_sinh: new Date(),
    khu_vuc: '',
    hinh_anh: ''
  };

  constructor(private nhanvienService: NhanvienService) {}

  ngOnInit(): void {
    this.loadNhanvien();
  }

  loadNhanvien(): void {
    this.nhanvienService.getNhanvien().subscribe(
      staff => {
        this.staff = staff;
      },
      error => {
        console.log(error);
      }
    );
  }

  addNhanvien(): void {
    this.nhanvienService.addNhanvien(this.newStaff).subscribe(
      response => {
        alert('Nhân viên đã được thêm thành công!');
        this.staff.push(response); // Thêm nhân viên mới vào danh sách
        this.newStaff = this.createEmptyStaff();
        this.loadNhanvien();
      },
      error => {
        console.error('Có lỗi xảy ra trong quá trình thêm nhân viên:', error);
        alert('Không thể thêm nhân viên. Vui lòng thử lại sau.');
      }
    );
  }

  createEmptyStaff(): INhanvien {
    return {
      ten_nv: '',
      gioi_tinh: '',
      ngay_sinh: new Date(),
      khu_vuc: '',
      hinh_anh: ''
    };
  }

  deleteStaff(id: number): void {
    this.nhanvienService.deleteNhanvien(id).subscribe(
      () => {
        alert('Nhân viên đã được xóa thành công!');
        this.staff = this.staff.filter(staff => staff.id !== id);
        this.loadNhanvien();
      },
      error => {
        console.error('Có lỗi xảy ra trong quá trình xóa nhân viên:', error);
        alert('Không thể xóa nhân viên. Vui lòng thử lại sau.');
      }
    );
  }
}
