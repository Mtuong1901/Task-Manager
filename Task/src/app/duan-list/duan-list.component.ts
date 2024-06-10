import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDuan } from '../iduan';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-duan-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css']
})
export class DuanListComponent implements OnInit {
  list_duan: IDuan[] = [];
  duan :IDuan[] = [];
 private _listFilter: string = '';

 ngOnInit(): void {
  this.fetchDuanList();
}

fetchDuanList(): void {
  fetch('http://localhost:5000/duan')
    .then(response => {
      if (!response.ok) {
        throw new Error('Không nhận được dữ liệu');
      }
      return response.json();
    })
    .then(data => {
      this.list_duan = data;
      this.duan = data; // Assign data to duan after fetching
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
    this.list_duan = this._listFilter ? this.performFilter(this._listFilter) : this.duan;
  }
  performFilter(filterBy: string): IDuan[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.duan.filter((duan: IDuan) =>
      duan.ten.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}