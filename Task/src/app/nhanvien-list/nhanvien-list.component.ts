import { Component,OnInit } from '@angular/core';
import { INhanvien } from '../inhanvien';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nhanvien-list',
  standalone: true,
  imports: [CommonModule,FormsModule
  ],
  templateUrl: './nhanvien-list.component.html',
  styleUrl: './nhanvien-list.component.css'
})
export class NhanvienListComponent implements OnInit {
  list_nhanvien:INhanvien[]=[];
  nv :INhanvien[] = [];
 private _listFilter: string = '';
  ngOnInit(): void {
    this.fetchDuanList();
  }
  
  fetchDuanList(): void {
    fetch('http://localhost:5000/nhanvien')
      .then(response => {
        if (!response.ok) {
          throw new Error('Không nhận được dữ liệu');
        }
        return response.json();
      })
      .then(data => {
        this.list_nhanvien = data;
        this.nv = data; 
         
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
    this.list_nhanvien = this._listFilter ? this.performFilter(this._listFilter) : this.nv;
  }
  performFilter(filterBy: string): INhanvien[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.nv.filter((nvien: INhanvien) =>
      nvien.ten_nv.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
