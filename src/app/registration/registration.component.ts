import { Component, Input } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { DataService, Participation } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  @Input() divid = '';
  @Input() title = '';
  @Input() schedule_details = '';
  participation$!: Subject<Participation>;
  showPopup = false;
  reason = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.participation$ = new Subject<Participation>();
    this.dataService.get_participation(this.divid).subscribe(r => this.participation$.next(r));
    this.participation$.subscribe(c => console.log(c));
  }

  yes(): Participation {
    return Participation.Yes;
  }

  no(): Participation {
    return Participation.No;
  }

  participate() {
    this.dataService.update_participation(this.divid, this.yes(), '').subscribe(r => this.participation$.next(r));
  }

  cancel() {
    this.dataService.update_participation(this.divid, this.no(), this.reason).subscribe(r => this.participation$.next(r));
    this.showPopup = false;
  }
}
