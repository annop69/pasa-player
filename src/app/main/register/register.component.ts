import { Component, ChangeDetectorRef, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';
import { UserDetails } from '../../models/user-details'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterContentChecked {
registerForm: FormGroup;
userDetails: UserDetails[] = [];

constructor(private formBuilder: FormBuilder,
            private cd: ChangeDetectorRef,
            private userService: UsersService,
            private router: Router){
}

ngOnInit(){
  
  this.setupForm();
}

ngAfterContentChecked(){
  this.cd.detectChanges();
}
  
  setupForm(){
    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern("^[a-zA-Z][\- '.A-Za-z0-9]{0,}$")]],
      lname: ['', [Validators.required, Validators.pattern("^[a-zA-Z][\- '.A-Za-z0-9]{0,}$")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-z]{2,4}$')]],
      password:  ['', [Validators.required, Validators.minLength(8), Validators.pattern("^.*[\\S].*")]],
      confirm_password:  ['', [Validators.required, Validators.minLength(8), Validators.pattern("^.*[\\S].*")]]
    })
  }

  isFormValid(){
    if(this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirm_password){
      return true;
    }
    return false;
  }

  onRegister(){
    if(this.isFormValid()){
      let payload = {
        firstName: this.registerForm.value.fname,
        lastName: this.registerForm.value.lname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        is_pending: "1"
      }
      this.userService.registerUser(payload).subscribe((res:any) => {
        if(res.message){
          this.router.navigateByUrl('/login')
          alert("user successfully registered")
        }
      })
    }
   }
}
