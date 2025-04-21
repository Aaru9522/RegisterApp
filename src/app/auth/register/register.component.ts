import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registrationSuccess = false;
  errorMessage = '';
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm:  ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: AbstractControl) {
    const pw = group.get('password')?.value;
    const cn = group.get('confirm')?.value;
    return pw === cn ? null : { mismatch: true };
  }

  // Now typed as an indexable map
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fix the errors above.';
      return;
    }
    const { username, email, password } = this.registerForm.value;
    this.auth.register({ username, email, password }).subscribe({
      next: () => this.registrationSuccess = true,
      error: () => this.errorMessage = 'Registration failed'
    });
  }
}
