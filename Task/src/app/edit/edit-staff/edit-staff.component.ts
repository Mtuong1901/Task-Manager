// src/app/edit-staff/edit-staff.component.ts
import { Component, OnInit } from '@angular/core';
import { NhanvienService } from '../../service/nhanvien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { INhanvien } from "../../inhanvien";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-edit-staff',
  imports:[CommonModule,FormsModule],
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit{
  employeeId?: number;
  staff: INhanvien = {
    ten_nv: '',
    ngay_sinh: null ,
    gioi_tinh: '',
    khu_vuc: '',
    hinh_anh: ''
  };
  constructor(private staffService : NhanvienService,private route: ActivatedRoute,private router: Router){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.employeeId = +idParam;
        this.loadStaffdata(this.employeeId);
      } else {
        console.error('Không tìm thấy ID nhân viên trong URL');
      }
    });
  }
  loadStaffdata(id:number): void {
    this.staffService.getStaffById(id).subscribe(
      (data: INhanvien) => {
        this.staff = data;
        console.log(data);
      },
      (error) => {
        console.error('Đã xảy ra lỗi khi tải dữ liệu nhân viên:', error);
      }
    );
  }

  onSubmit(): void {
    console.log(this.staff);
    this.staffService.updateStaff(this.employeeId!, this.staff).subscribe(
      (response) => {
        console.log('Cập nhật nhân viên thành công!', response);
        alert('Lưu thành công!');
        this.router.navigate(['/nhanvien']);
      },
      (error) => {
        console.error('Lỗi khi cập nhật nhân viên:', error);
        alert('Đã xảy ra lỗi khi cập nhật nhân viên. Vui lòng thử lại sau.');
      }
    );
  }
  
  }