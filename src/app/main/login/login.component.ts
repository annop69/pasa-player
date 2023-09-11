import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { LoginUser } from 'src/app/models/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterContentChecked {
  loginForm: FormGroup;
  loginUserDetails: LoginUser
  constructor(private formBuilder: FormBuilder,
              private cd: ChangeDetectorRef,
              private usersService: UsersService){

                this.setupForm();
              }
  
  ngOnInit(): void {}

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  setupForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-z]{2,4}$')]],
      password:  ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\S*$/)]]
    })
  }

  isFormValid(){
    if(this.loginForm.valid) return true;
    return false;
  }

  onLogin(){
    if(this.isFormValid() && this.loginForm.value){
        const loginUser: LoginUser = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }
  
        this.usersService.loginUser(loginUser).subscribe((res) =>{
          console.log("res", res)
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', res.status.email)
          location.reload();
        },
        (error: any) => {
          if(error == 500)
            alert("internal server error")
          else 
            alert("invalid email or password")
        })
    }
  }
}
