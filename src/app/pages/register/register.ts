import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterPage {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      displayName: ['', Validators.required],
      preferredCurrency: ['', Validators.required]
    });
  }

  // Easy getter to access control properties in the template
  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get confirmPasswordControl() {
    return this.form.get('confirmPassword');
  }

  get displayNameControl() {
    return this.form.get('displayName');
  }

  get preferredCurrencyControl() {
    return this.form.get('preferredCurrency');
  }

  register() {
    const val = this.form.value;
    console.log('Form Value:', val); // Log the form value for debugging

    if (this.form.valid) {
      if (val.password !== val.confirmPassword) {

        this.snackBar.open('Passwords do not match', 'Close', { 
          duration: 5000, 
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        
      } else {
      this.authService.register({
        email: val.email,
        password: val.password,
        displayName: val.displayName,
        preferredCurrency: val.preferredCurrency
      }).subscribe({
        next: () => {
          console.log('Registration successful');
          this.router.navigateByUrl('login');
          this.snackBar.open('Registration successful', 'Close', { 
            duration: 5000, 
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
    }
  }
}
