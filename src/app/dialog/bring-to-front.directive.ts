import { OverlayContainer } from '@angular/cdk/overlay';
import { DestroyRef, Directive, ElementRef, HostListener } from '@angular/core';

import { DialogService } from './services/dialog.service';

@Directive({
  selector: '[bring-to-front]'
})
export class BringToFrontDirective {
  @HostListener('mousedown')
  public onMouseDown() {
    // closest mat-dialog-container that might have the id
    const parentEl = this.el.nativeElement.closest(this.dialogContainerTagName);
    const dialogId = parentEl?.getAttribute('id');

    // check for parent element to be ag-material dialog container and has attr id
    if (dialogId && parentEl.tagName === this.dialogContainerTagName) {
      this.dialogService.bringToFront(dialogId);
    }
  }

  private readonly dialogContainerTagName = 'MAT-DIALOG-CONTAINER';

  constructor(
    private cdk: OverlayContainer,
    private el: ElementRef,
    private dialogService: DialogService,
    public destroyRef: DestroyRef
  ) {
    destroyRef.onDestroy(() => this.onDestroy());
  }

  /**
   * On dialog destroy
   * If there is any - brings back focus to the next opened dialog
   */
  private onDestroy(): void {
    setTimeout(() => {
      const dialogs = Array.from(this.cdk.getContainerElement().childNodes);
      const dialogContainers = dialogs.map((el: HTMLElement) =>
        el.querySelector(this.dialogContainerTagName)
      );
      const lastDialogId = dialogContainers[dialogContainers?.length - 1]?.id;

      if (lastDialogId) {
        this.dialogService.bringToFront(lastDialogId);
      }
    });
  }
}
