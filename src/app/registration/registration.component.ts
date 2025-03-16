import {Component, inject, input, linkedSignal, signal} from '@angular/core';
import {DataService, Participation, asParticipation} from '../data.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import {DeclineDialogComponent} from "../decline-dialog/decline-dialog.component";

@Component({
    selector: 'app-registration',
    imports: [CommonModule, FormsModule, DialogModule],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  dataService = inject(DataService);
  dialog = inject(Dialog);

  divid = input<string>();
  title = input<string>();
  schedule_details = input<string>();
  initial = input<number>();
  participation = linkedSignal<Participation>(() => asParticipation(this.initial()));
  loading = signal<boolean>(false);


  yes(): Participation {
    return Participation.Yes;
  }

  no(): Participation {
    return Participation.No;
  }

  participate() {
    this.loading.set(true);
    this.dataService.update_participation(this.divid(), Participation.Yes, '').subscribe(value => this.participation.set(value));
  }

  declineParticipation(reason: string): void {
    this.loading.set(true);
    this.dataService.update_participation(this.divid(), Participation.No, reason).subscribe(value => this.participation.set(value));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(DeclineDialogComponent, {
      minWidth: '500px',
      panelClass: 'tribe-common',
      data: {
        divid: this.divid(),
        title: this.title(),
        schedule_details: this.schedule_details(),
      }
    });
    dialogRef.closed.subscribe(result => {
      if (result) {
        this.declineParticipation(result);
      }
    });
  }

  protected readonly open = open;
}
