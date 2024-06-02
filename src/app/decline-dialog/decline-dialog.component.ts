import {Component, Inject} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

export interface DeclineDialogData {
  divid: string;
  title: string;
  schedule_details: string;
}

@Component({
  selector: 'app-decline-dialog',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './decline-dialog.component.html',
  styleUrl: './decline-dialog.component.css'
})
export class DeclineDialogComponent {
  reason: string = '';
  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: DeclineDialogData) {}
}
