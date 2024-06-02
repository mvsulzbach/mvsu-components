import {Component, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {DataService, Participation} from '../data.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import {DeclineDialogComponent} from "../decline-dialog/decline-dialog.component";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,FormsModule,DialogModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  @Input() divid = '';
  @Input() title = '';
  @Input() schedule_details = '';
  participation$!: Subject<Participation>;

  constructor(private dataService: DataService, public dialog: Dialog) {}

  ngOnInit(): void {
    this.participation$ = new Subject<Participation>();
    this.dataService.get_participation(this.divid).subscribe(r => this.participation$.next(r));
  }

  no(): Participation {
    return Participation.No;
  }

  participate() {
    this.dataService.update_participation(this.divid, Participation.Yes, '').subscribe(r => this.participation$.next(r));
  }

  declineParticipation(reason: string): void {
    this.dataService.update_participation(this.divid, Participation.No, reason).subscribe(r => this.participation$.next(r));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(DeclineDialogComponent, {
      minWidth: '500px',
      panelClass: 'tribe-common',
      data: {
        divid: this.divid,
        title: this.title,
        schedule_details: this.schedule_details,
      }
    });
    dialogRef.closed.subscribe(result => {
      if (result) {
        this.declineParticipation(result);
      }
    });
  }

  protected readonly open = open;
  protected readonly Participation = Participation;
}
