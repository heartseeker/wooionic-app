import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { StriphtmlPipe } from './../pipes/striphtml/striphtml';


@NgModule({
  declarations:[
    StriphtmlPipe
  ],
  imports:[
    CommonModule
  ],
  exports:[
    StriphtmlPipe
  ]
})

export class MainPipeModule {}