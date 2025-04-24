import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  id?: string;
  registerForm!: FormGroup;

  // for directive demos:
  countries = ['USA', 'Canada', 'UK'];
  showAdvanced = false;
  selectedCountry = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private ar: ActivatedRoute
  ) {
    console.log('Constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.id = this.ar.snapshot.params['id'];
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm:  ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  passwordsMatch(group: AbstractControl) {
    return group.get('password')!.value === group.get('confirm')!.value
      ? null
      : { mismatch: true };
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    const data = this.registerForm.value;
    console.log(this.id ? 'Edit user' : 'Register user', this.id, data);
    this.auth.register(data).subscribe(() => {
      alert('Success!');
    });
  }
}
