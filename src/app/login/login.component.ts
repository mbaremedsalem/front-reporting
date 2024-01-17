import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/reporting-bcm/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup ;
  loading = false;
  returnUrl!: string ;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.initLoginForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  //  Form initalization
  //  Default params, validators
  

 initLoginForm() {
   this.loginForm = this.fb.group({
     username: ['', Validators.compose([
       Validators.required,
       Validators.minLength(2),
       Validators.maxLength(50)
     ])
     ],
     password: ['', Validators.compose([
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(100)
     ])
     ]
   });
 }


  submit() {
    this.router.navigate(['/acueil']);

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const controls = this.loginForm.controls;

    this.loading = true;

    const authData = {
      username: controls['username'].value,
      password: controls['password'].value
    };


    this.auth
      .login(authData.username, authData.password)
      .subscribe({
        next: () => this.router.navigate([this.returnUrl]),
        error: err => {
          this.loading = false;
        }
      })
  }


}
