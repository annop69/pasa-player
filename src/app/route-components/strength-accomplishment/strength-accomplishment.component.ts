import { Component, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/user.service';
import { SessionLoggerService } from 'src/app/providers/session-logger-service';
import { EmployeeMisc } from 'src/app/models/employee-misc';
import * as _ from 'underscore';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeMisc2ModalComponent } from 'src/app/components/employee-misc2-modal/employee-misc2-modal.component';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-strength-accomplishment',
  templateUrl: './strength-accomplishment.component.html',
  styleUrls: ['./strength-accomplishment.component.scss']
})
export class StrengthAccomplishmentComponent implements AfterViewInit, OnDestroy  {
  datas: EmployeeMisc[] = [];
  closeIcon = faTimes;
  listenerFn!: () => void;
  listData!: any[];
  
  constructor(private empDetails: SessionLoggerService,
              private employeeService: UsersService,
              private renderer: Renderer2,
              public loaderService: LoaderService,
              private matDialog: MatDialog){
  
    employeeService.getStrAcc(empDetails.currentUser.id).subscribe((res: any) => {
      for(let x of res.results){
        this.datas.push({
          id: x.ID,
          empID: x.empID,
          descr: x.DESCR
        })
      }
    })
  }
  
  onDelete(data: any){
    try{
      this.employeeService.deleteStrAcc(data.id).subscribe(() => (this.datas = this.datas.filter((t) => t.id !== data.id)));
    }
    catch(e){
      console.log(e);
    }
  }
  
  openAddDialog(){
    this.matDialog.closeAll();
    let dialogRef = this.matDialog.open(EmployeeMisc2ModalComponent, {
      width: '500px',
      data: {
        title: "Add Strengths/Accomplishments",
        data: this.empDetails.currentUser.id,
        mode: 1
      }
    });
  
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.employeeService.getStrAcc(this.empDetails.currentUser.id).subscribe(() => {
            this.datas.push({
              empID: data.empID,
              descr: data.descr
            })
        })
      }
  });
  }
  
  ngAfterViewInit(): void{
    this.listenerFn = this.renderer.listen('document', 'click', (event) => {
      if(event.target.classList.contains('btn-add')){
        this.openAddDialog();
      }
    });
  }
  
  ngOnDestroy(): void {
    if(this.listenerFn){
      this.listenerFn();
    }
  }
  
  }  
