import { Component } from '@angular/core';
import { SessionLoggerService } from 'src/app/providers/session-logger-service';

//service
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-performance-factor',
  templateUrl: './performance-factor.component.html',
  styleUrls: ['./performance-factor.component.scss']
})
export class PerformanceFactorComponent {
  rating1: string[];
  rating2: string[];
  rating3: string[];
  rating4: string[];
  rating5: string[];
  rating6: string[];
  rating7: string[];
  original1: string;
  original2: string;
  original3: string;
  original4: string;
  original5: string;
  original6: string;
  original7: string;
  selected1: string;
  selected2: string;
  selected3: string;
  selected4: string;
  selected5: string;
  selected6: string;
  selected7: string;
  
  constructor(private empDetails: SessionLoggerService,
              private employeeService: UsersService){
    this.rating1 = ["No Basis", "Needs Improvement", "Meets Expectation", "Outstanding"]
    this.rating2 = ["No Basis", "Needs Improvement", "Meets Expectation", "Outstanding"]
    this.rating3 = ["No Basis", "Needs Improvement", "Meets Expectation", "Outstanding"]
    this.rating4 = ["No Basis", "Needs Improvement", "Meets Expectation", "Outstanding"]
    this.rating5 = ["No Basis", "Needs Improvement", "Meets Expectation", "Outstanding"]
    this.rating6 = ["No Basis", "Needs Improvement", "Meets Expectation", "Outstanding"]
    this.rating7 = ["No Basis", "Needs Improvement", "Meets Expectation", "Outstanding"]
    this.original1 = empDetails.currentUser.rating1;
    this.original2 = empDetails.currentUser.rating2;
    this.original3 = empDetails.currentUser.rating3;
    this.original4 = empDetails.currentUser.rating4;
    this.original5 = empDetails.currentUser.rating5;
    this.original6 = empDetails.currentUser.rating6;
    this.original7 = empDetails.currentUser.rating7;
    this.selected1 = empDetails.currentUser.rating1;
    this.selected2 = empDetails.currentUser.rating2;
    this.selected3 = empDetails.currentUser.rating3;
    this.selected4 = empDetails.currentUser.rating4;
    this.selected5 = empDetails.currentUser.rating5;
    this.selected6 = empDetails.currentUser.rating6;
    this.selected7 = empDetails.currentUser.rating7;
  }
  
  
    getValue1(data: any)
    {
      this.selected1 = data.target.value;
    }
    getValue2(data: any)
    {
      this.selected2 = data.target.value;
    }
    getValue3(data: any)
    {
      this.selected3 = data.target.value;
    }
    getValue4(data: any)
    {
      this.selected4 = data.target.value;
    }
    getValue5(data: any)
    {
      this.selected5 = data.target.value;
    }
    getValue6(data: any)
    {
      this.selected6 = data.target.value;
    }
    getValue7(data: any)
    {
      this.selected7 = data.target.value;
    }
  
    canSave(){
      if(
        this.original1 != this.selected1 ||
        this.original2 != this.selected2 ||
        this.original3 != this.selected3 ||
        this.original4 != this.selected4 ||
        this.original5 != this.selected5 ||
        this.original6 != this.selected6 ||
        this.original7 != this.selected7
      ){
        return true;
      }
      else return false;
    }
  
    save(){
      if(this.canSave()){
        let data = {
          id: this.empDetails.currentUser.id,
          rating1: this.selected1,
          rating2: this.selected2,
          rating3: this.selected3,
          rating4: this.selected4,
          rating5: this.selected5,
          rating6: this.selected6,
          rating7: this.selected7,
        }
        try{
          this.employeeService.updateRating(data).subscribe(res => res)
          this.original1 = this.selected1;
          this.original2 = this.selected2;
          this.original3 = this.selected3;
          this.original4 = this.selected4;
          this.original5 = this.selected5;
          this.original6 = this.selected6;
          this.original7 = this.selected7;
        }
        catch(e){
          console.log(e)
        }
      }
    }
}
