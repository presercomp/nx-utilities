import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogModule } from './site/public/log/log.module';
import { DashboardModule } from './site/private/dashboard/dashboard.module';
import { ApiService } from './utils/api.service';
import { DataService } from './utils/data.service';
import { FunctionsService } from './utils/functions.service';
import { HoursPipe } from './utils/hours.pipe';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserIdleModule } from 'angular-user-idle';
import { NgxXLSXModule } from '@notadd/ngx-xlsx';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { environment } from 'src/environments/environment';


declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    HoursPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DashboardModule,
    HttpClientModule,
    LogModule,
    NgxXLSXModule,
    TextareaAutosizeModule,
    NgbModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-secondary'
    }),
    UserIdleModule.forRoot({
      idle: environment.segEsperaInactivo,
      timeout: environment.segEsperaBloqueo,
      ping: 120}
    )
  ],
  providers: [
    ApiService,
    DataService,
    FuncionesService,
    AuthGuard,
    NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
