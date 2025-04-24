import { Component, OnInit, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  loginForm!: FormGroup;
  error = ''; showError = false;

  constructor(private fb: FormBuilder) { console.log('Login ctor'); }

  ngOnInit() {
    console.log('Login ngOnInit');
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngDoCheck() { console.log('Login ngDoCheck'); }
  ngAfterViewInit() { console.log('Login ngAfterViewInit'); }
  ngOnDestroy() { console.log('Login ngOnDestroy'); }

  get f() { return this.loginForm.controls as { [k: string]: AbstractControl }; }

  submit() {
    if (this.loginForm.invalid) {
      this.error='Fix fields'; this.showError=true; return;
    }
    console.log('Login', this.loginForm.value);
  }
}