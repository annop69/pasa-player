import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { UsersService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeMiscModalComponent } from '../../components/employee-misc-modal/employee-misc-modal.component';
import * as _ from 'underscore';
import { UserDetails } from 'src/app/models/user-details';
import { SessionLoggerService } from 'src/app/providers/session-logger-service';
import { EmployeeMisc } from 'src/app/models/employee-misc';

@Component({
  selector: 'app-value-creator',
  templateUrl: './value-creator.component.html',
  styleUrls: ['./value-creator.component.scss']
})
export class ValueCreatorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listData!: any[];
  listenerFn!: () => void;
  type: number = 1;

  constructor(private employeeService: UsersService,
    private matDialog: MatDialog,
    private renderer: Renderer2,
    private empDetails: SessionLoggerService,){}

    ngOnInit(){

      this.dtOptions = {
        pagingType: 'simple_numbers',
        serverSide: true,
        processing: true,
        responsive: true,
        ordering: true,
        orderMulti: false,
        searching: true,
        scrollCollapse: true,
        scrollY: '300px',
        ajax: (dataTablesParameters: any, callback) => {
          let pageNum = 0;
          let recordsFilteredNum = 0;
          let usersSource: any = [];
          let searchFilter = dataTablesParameters.search.value;
  
          if (dataTablesParameters.start !== 0) {
            pageNum = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          }
  
        if(!searchFilter){
        this.employeeService.getEmployeesStats(
          this.empDetails.currentUser.id,
          this.type,
          dataTablesParameters.start === 0 ? 1 : pageNum,
          dataTablesParameters.length).subscribe((res: any) => {
        if(res != null) {
          for(let x of res.items){
            usersSource.push({
              id: x.ID,
              code: x.ticket_id,
              descr: x.descr
            });
          }
          this.listData = res.items
        }
        recordsFilteredNum = res.totalItems;
        callback({
          data: usersSource,
          draw: dataTablesParameters.draw,
          recordsFiltered: recordsFilteredNum,
          recordsTotal: res.totalItems
        });
        });
      }
      else{
        this.employeeService.getEmployeeStats(
          searchFilter,
          this.empDetails.currentUser.id,
          this.type,
          dataTablesParameters.start === 0 ? 1 : pageNum,
          dataTablesParameters.length).subscribe((res: any) => {
          if(res != null) {
            for(let x of res.items){
              usersSource.push({
                id: x.ID,
              code: x.ticket_id,
              descr: x.descr
              })
            }
          }
          recordsFilteredNum = res.totalItems;
          callback({
            data: usersSource,
            draw: dataTablesParameters.draw,
            recordsFiltered: recordsFilteredNum,
            recordsTotal: res.totalItems
          });
          });
      }
        },
        order: [],
        columns: [
          { data: 'code'},
          { data: 'descr'},
          { 
            data: 'id',
            orderable: false,
            render: function(data, type, row, meta){
              return `<style>
                        .action-btn-wrap{
                          display: flex;
                          justify-content: center;
                          
                          @media(max-width: 768px){
                            flex-wrap: wrap;
                          }
  
                          .btn{
                            color: white;
                            font-family: Roboto,"Helvetica Neue",sans-serif;
                            font-size: 14px;
                            font-weight: 500;
  
                            &.btn-edit{
                              background: #007bff;
                            }
  
                            &.btn-delete{
                              background: red;
                            }
                          }
                        }
              </style>
              <div class="action-btn-wrap">
                <button class="btn btn-edit" id="${row.id}">Edit</button>
                <button class="btn btn-delete" id="${row.id}">Delete</button>
              </div>`;
            } 
          }
        ],
        language: {
          paginate: {
            first: '',
            previous: '◄',
            next: '►',
            last: ''
          },
          emptyTable: "No records found"
        },
        columnDefs:[
          { targets: [0], width: '15%'},
          { targets: [1], width: '60%'},
          { targets: [2], width: '25%'},
          { targets: '_all',
            "createdCell": function (td, cellData, rowData, row, col) {
            $(td).css('padding', '5px 10px')
          }  
          }
        ]
  
      };
    }
  
    openDeleteDialog(data: EmployeeMisc){
      this.matDialog.closeAll();
      let dialogRef = this.matDialog.open(EmployeeMiscModalComponent, {
        width: '500px',
        data: {
          data,
          mode: 2
        }
      }); 
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result != "") {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.search(dtInstance.search()).draw(false)
            })
        }
    });
    }
  
    openUpdateDialog(data: UserDetails){
      this.matDialog.closeAll();
      let dialogRef = this.matDialog.open(EmployeeMiscModalComponent, {
        width: '500px',
        data: {
          title: "Edit Value Creator",
          data: data,
          mode: 1
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result != "") {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.search(dtInstance.search()).draw(false)
            })
        }
    });
    }
  
    openAddDialog(){
      let dialogRef = this.matDialog.open(EmployeeMiscModalComponent, {
        width: '500px',
        data: {
          title: "Add Value Creator",
          id: this.empDetails.currentUser.id,
          type: this.type,
          mode: 0
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result != "") {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.search(dtInstance.search()).draw(false)
            })
        }
    });
    }
  
    ngAfterViewInit(): void {
       this.dtTrigger.next(true);
       this.listenerFn = this.renderer.listen('document', 'click', (event) => {
        if(event.target.classList.contains('btn-edit')){
          let data = this.listData.find(i => _.isEqual(i.ID.toString(), event.target.id));
          this.openUpdateDialog(data);
        }
        if(event.target.classList.contains('btn-delete')){
          let data = this.listData.find(i => _.isEqual(i.ID.toString(), event.target.id));
          this.openDeleteDialog(data);
        }
       })
    }
  
    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
      if(this.listenerFn){
        this.listenerFn();
      }
    }

}
