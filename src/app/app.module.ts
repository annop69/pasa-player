import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//MatDialog Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

//Services
import { SetupService } from './services/setup-service';

//Interceptors
import { LoadingInterceptor } from './interceptor/loading.interceptor';

//Components
import { EmployeeMiscModalComponent } from './components/employee-misc-modal/employee-misc-modal.component';
import { EmployeeMisc2ModalComponent } from './components/employee-misc2-modal/employee-misc2-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

//Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataTablesModule} from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxLoadingButtonsModule } from 'ngx-loading-buttons';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    EmployeeMiscModalComponent,
    EmployeeMisc2ModalComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    DataTablesModule,
    FormsModule,
    FontAwesomeModule,
    NgxLoadingButtonsModule
  ],
  providers: [SetupService,
    {
      provide: APP_INITIALIZER,
      useFactory: SetUpSessionLogger,
      deps: [SetupService],
      multi: true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function SetUpSessionLogger(setup: SetupService){
  return () => setup.initializeApp();
}
