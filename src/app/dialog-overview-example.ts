import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  note: string;
  Reason: string;
}

const Reasons: string[] = [
  'Order Entry Error',
  'Error in Order Form',
  'Change in requirements',
  'Feasibility Issue',
  'Changes in Operational or Build',
  'Other',
];

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
})
export class DialogOverviewExample {
  note: string;
  Reason: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { note: this.note, Reason: this.Reason},
    
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.note = result;
      this.Reason = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  OrderForm = new FormGroup({
    Reason: new FormControl('', [Validators.required])
    
  });

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  getReasons(): string[] {
    return Reasons;
  }

  onSubmitClick(): void{
    console.log(this.data.note);
    this.dialogRef.close();
    // this.dialogRef.close((note: this.data.note, Reason: this.data.Reason));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
