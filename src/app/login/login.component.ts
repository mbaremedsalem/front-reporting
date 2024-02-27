import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/reporting-bcm/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenModel } from '../model/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup ;
  loading = false;
  returnUrl!: string ;
 
  loginInProgress = false;
  credentials = { username: '', password: '' };
  message: string | undefined;
  access: string | null | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,) {
  }
  ngOnInit(): void {
    this.initLoginForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  


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
  this.login();

}
 login() {
  this.loginInProgress = true; 
  this.auth.login(this.credentials).subscribe(
    (response: User) => {
      if (response.status === 200) {
        if (response.role === "Caissier") {
        // Login success
        this.message = response.message;
        // Store the access token in local storage or a cookie
          localStorage.setItem('username', response.username);   
          localStorage.setItem('access', response.access);  
          localStorage.setItem('token', response.token);  
          localStorage.setItem('id', response.id.toString());   
          localStorage.setItem('access', response.access);
          localStorage.setItem('nom', response.firstname);
          localStorage.setItem('prenom', response.lastname);
          localStorage.setItem('email', response.email);
          localStorage.setItem('phone', response.phone);
          localStorage.setItem('image', response.image);
          localStorage.setItem('post', response.post);
          this.access = localStorage.getItem('access');

          // Redirect to the home page
          this.router.navigate(['/acueil/profile']);
      }
    }
      else
      {
        this.message = response.message;
        this.showErrorMessage = true;
        if (this.message) {
          this.showErrorAlert(this.message);
        }
      }
    },
    (error) => {
      // Login error
      this.message = 'Informations invalides';
    }
  ).add(() => {
    this.loginInProgress = false; // Set to false after login completes (whether success or error)
  });
}



  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 3000, // Durée d'affichage de l'alerte (3 secondes)
    });
  }

}
