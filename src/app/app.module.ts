import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';
import { CellComponent } from './cell/cell.component';
import { CellService } from './cell.service';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    CellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CellService],
  bootstrap: [AppComponent]
})
export class AppModule { }
