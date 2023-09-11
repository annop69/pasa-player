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
  selector: 'app-comment-feedback',
  templateUrl: './comment-feedback.component.html',
  styleUrls: ['./comment-feedback.component.scss']
})
export class CommentFeedbackComponent implements AfterViewInit, OnDestroy {
  testData: string[];
  closeIcon = faTimes;
  datas: EmployeeMisc[] = [];
  listenerFn!: () => void;
  
  constructor(private employeeService: UsersService,
              private empDetails: SessionLoggerService,
              private renderer: Renderer2,
              public loaderService: LoaderService,
              private matDialog: MatDialog){
    employeeService.getComFeed(empDetails.currentUser.id).subscribe((res: any) => {
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
      this.employeeService.deleteComFeed(data.id).subscribe(() => (this.datas = this.datas.filter((t) => t.id !== data.id)));
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
        title: "Add Comments/Feedback",
        data: this.empDetails.currentUser.id,
        mode: 2
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

