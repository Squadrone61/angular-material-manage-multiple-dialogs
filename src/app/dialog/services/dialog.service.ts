import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private currentDialogRef: MatDialogRef<any>;

  constructor(private dialog: MatDialog, private cdk: OverlayContainer) {}

  /**
   * Brings the selected dialog to front if it is not in front already
   * by appending it as the last child in the parent container
   * @param dialogId
   * @returns dialog ref that's brought to front
   */
  public bringToFront(dialogId: string): MatDialogRef<any> {
    if (this.currentDialogRef && this.currentDialogRef?.id !== dialogId) {
      this.currentDialogRef = this.dialog.getDialogById(dialogId);
      const focusedDialog = Array.from(this.cdk.getContainerElement().childNodes).find(
        (el: HTMLElement) => el.querySelector(`#${dialogId}`)
      );

      if (focusedDialog) {
        // appendChild removes from existing position and append it as the last child
        this.cdk.getContainerElement().appendChild(focusedDialog);
      }
    }

    return this.currentDialogRef;
  }

  public close(result?: any): void {
    this.currentDialogRef?.close(result);
  }

  public open(config?: MatDialogConfig): MatDialogRef<any> {
    this.currentDialogRef = this.dialog.open(DialogComponent, config);
    
    return this.currentDialogRef;
  }
}
