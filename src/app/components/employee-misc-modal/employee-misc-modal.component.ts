import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-employee-misc-modal',
  templateUrl: './employee-misc-modal.component.html',
  styleUrls: ['./employee-misc-modal.component.scss']
})
export class EmployeeMiscModalComponent {
  title: string;
  code: string;
  descr: string
  empID: string;
  miscID: string;
  mode: number;
  type: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: UsersService,
              public loaderService: LoaderService,
              public dialogRef: MatDialogRef<EmployeeMiscModalComponent>){
    if(this.data.hasOwnProperty('title')){
      this.title = this.data.title;
    }
  }

  ngOnInit(){
    if(this.data.hasOwnProperty('id')){
      this.empID = this.data.id;
    }

    if(this.data.hasOwnProperty('mode')){
      this.mode = this.data.mode
    }
    if(this.data.hasOwnProperty('data')){
      this.data = this.data
    }
    if(this.data.hasOwnProperty('type')){
      this.type = this.data.type;
    }

    //setting initial value for code and descr if for editting info
    if(this.data.data){
      this.code = this.data.data.ticket_id;
      this.descr = this.data.data.descr;
    }
  }

  onAdd(){
      try{
        let data = {
          empID: this.empID,
          type: this.type,
          ticket_id: this.code,
          descr: this.descr
        }
        this.employeeService.addEmployeeStats(data).subscribe(resp => {
          if(resp)
            this.dialogRef.close(true);
        })
      }
      catch(e){
        console.log(e)
      }
  }

  onUpdate(){
      try {
        let data = {
          id: this.data.data.ID,
          ticket_id: this.code,
          descr: this.descr
        }
        this.employeeService.updateEmployeeStats(data).subscribe(resp =>{
          if(resp){
            this.dialogRef.close(true);
          }
        });
      }
      catch(e){
        console.log(e);
      }
  }

  onDelete(){
      try{
        this.employeeService.deleteEmployeeStats(this.data.data.ID).subscribe(resp =>{
          if(resp){
            this.dialogRef.close(true);
          }
        });
      }
      catch(e){
        console.log(e);
      }
    }

    isEnabled(){
      if(this.code && this.descr)
        return true;
      else
        return false;
    }
}
