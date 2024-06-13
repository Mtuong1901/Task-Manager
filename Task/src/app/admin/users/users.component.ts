import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../service/admin.service";
import { IUser } from "../../iuser";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  selectedUser: any;
  isEditModalOpen: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getUser().subscribe((users: IUser[]) => {
      this.users = users;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  deleteUser(id: number): void {
    this.adminService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    }, error => {
      console.error('Error deleting user', error);
    });
  }

  }
