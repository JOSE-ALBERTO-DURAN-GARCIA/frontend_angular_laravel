import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AuthService } from './services/auth.service';
import { PedidoInterceptor } from '../interceptors/pedido.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PedidoInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }