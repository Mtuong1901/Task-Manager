import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../service/project.service";
import { IDuan } from "../../iduan";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-duanchitiet',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './duanchitiet.component.html',
  styleUrl: './duanchitiet.component.css'
})
export class DuanchitietComponent implements OnInit {
  duan: IDuan | undefined;
  constructor(private route: ActivatedRoute,private projectService: ProjectService) { }
  ngOnInit(): void {
    this.loadDuan();
  }
  loadDuan(): void {
    const id:any = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      // Gọi ProjectService để lấy thông tin dự án dựa trên id
      this.projectService.getDuanById(Number(id)).subscribe(
        (duan: IDuan) => {
          this.duan = duan;
        },
        error => {
          console.error('Error fetching project details:', error);
        }
      );
    }
  } 
}