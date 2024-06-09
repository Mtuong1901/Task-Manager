import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm từ @angular/forms
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Chú ý đến styleUrlS ở đây
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.authService.login(username, password).subscribe(
      
    );
  }
}
