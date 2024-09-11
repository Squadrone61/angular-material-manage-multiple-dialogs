import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from './services/dialog.service';
import { BringToFrontDirective } from './bring-to-front.directive';


@NgModule({
  declarations: [
    DialogComponent,
    BringToFrontDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    DragDropModule
  ],
  providers: [DialogService]
})
export class DialogModule { }
