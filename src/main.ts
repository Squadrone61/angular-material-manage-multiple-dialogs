import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';

import { DialogModule } from './app/dialog/dialog.module';
import { DialogService } from './app/dialog';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    DialogModule,
  ],
  standalone: true,
  template: `
    <section class="mx-2">
      <h1>Manage multiple dialogs in Angular Material!</h1>
      <button mat-stroked-button (click)="openDialog()">Open Dialog</button>
    </section>
  `,
})
export class App implements OnInit {
  
  constructor(private dialogService: DialogService) {}
  ngOnInit(): void {
    this.dialogService.open({
      width: '80vw',
      maxWidth: '1200px',
      position: {
        left: '40px',
        bottom: '20px'
      }
    });

    this.dialogService.open({
      width: '80vw',
      maxWidth: '1200px',
      position: {
        right: '40px',
        top: '40px'
      }
    });
  
  }
  public openDialog(): void {
    this.dialogService.open({
      width: '80vw'
    });
  }
}

bootstrapApplication(App, {
  providers: [provideAnimationsAsync()]
});
