import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService) { }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.auth.signup(username, password).subscribe(
      
    );
  }
}
