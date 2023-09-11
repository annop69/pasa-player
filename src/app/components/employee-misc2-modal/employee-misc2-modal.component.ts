import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-employee-misc2-modal',
  templateUrl: './employee-misc2-modal.component.html',
  styleUrls: ['./employee-misc2-modal.component.scss']
})
export class EmployeeMisc2ModalComponent {
  title: string;
  text: string;
  empID: string;
  mode: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private employeeService: UsersService,
              public loaderService: LoaderService,
              public dialogRef: MatDialogRef<EmployeeMisc2ModalComponent>){
    if(this.data.hasOwnProperty('title')){
      this.title = this.data.title;
    }
  }

  ngOnInit(){
    if(this.data.hasOwnProperty('data')){
      this.empID = this.data.data;
    }

    if(this.data.hasOwnProperty('mode')){
      this.mode = this.data.mode
    }
  }

  onAdd(){
    if(this.mode == 1){
      try{
        let data = {
          empID: this.empID,
          descr: this.text
        }
        this.employeeService.addStrAcc(data).subscribe(resp => {
          if(resp){
            this.dialogRef.close(data);
          }
        })
      }
      catch(e){
        console.log(e)
      }
    }
    else if(this.mode == 2){
      try{
        let data = {
          empID: this.empID,
          descr: this.text
        }
        this.employeeService.addComFeed(data).subscribe(resp => {
          if(resp) this.dialogRef.close(data);
        })
      }
      catch(e){
        console.log(e)
      }
    }
  }
}
