import { Component } from '@angular/core';
import { IDuan } from "../iduan";
import { ProjectService } from "../service/project.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-duan',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-duan.component.html',
  styleUrl: './add-duan.component.css'
})
export class AddDuanComponent {
  project: IDuan[] = [];
  newProject: IDuan = {
    ten: '',
    ngay_bat_dau: new Date(),
    nhom_truong: '',
    thanh_vien: '',
    hinh_anh: '',
    trang_thai: ''
  };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadduan();
  }

  loadduan(): void {
    this.projectService.getDuan().subscribe(
      project => {
        this.project = project;
      },
      error => {
        console.log(error);
      }
    );
  }

  addDuan(): void {
    this.projectService.addDuan(this.newProject).subscribe(
      response => {
        alert('Du an đã được thêm thành công!');
        this.project.push(response); 
        this.newProject = this.createEmptyProject();
        this.loadduan();  
      },
      error => {
        console.error('Có lỗi xảy ra trong quá trình them du an:', error);
        alert('Không thể them du an. Vui lòng thử lại sau.');
      }
    );
  }

  createEmptyProject(): IDuan {
    return {
    ten: '',
    ngay_bat_dau: new Date(),
    nhom_truong: '',
    thanh_vien: '',
    hinh_anh: '',
    trang_thai: ''
    };
  }
  deleteDuan(id: number): void {
    this.projectService.deleteDuan(id).subscribe(
      () => {
        alert('Nhân viên đã được xóa thành công!');
        this.project = this.project.filter(pro => pro.id !== id);
        this.loadduan();
      },
      error => {
        console.error('Có lỗi xảy ra trong quá trình xóa nhân viên:', error);
        alert('Không thể xóa nhân viên. Vui lòng thử lại sau.');
      }
    );
  }
}
