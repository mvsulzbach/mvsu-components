import {Component, Input, OnInit, signal} from '@angular/core';
import {DataService, Member, Participation} from "../data.service";
import {CommonModule} from "@angular/common";
import {OverlayModule} from "@angular/cdk/overlay";

@Component({
    selector: 'app-participating-members',
    imports: [CommonModule, OverlayModule],
    templateUrl: './participating-members.component.html',
    styleUrl: './participating-members.component.css'
})
export class ParticipatingMembersComponent implements OnInit {
  @Input() divid = '';
  members = signal<[Map<string,Member[]>, number, number]>(undefined);

  constructor(private dataService: DataService) {}

  groupBy<K,V>(list: V[], keyGetter: (input: V) => K): Map<K, V[]> {
    const map = new Map();
    Array.from(list).forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return new Map([...map.entries()].sort());
  }


  ngOnInit(): void {
    this.dataService.get_participating_members(this.divid).subscribe(r => {
      const grouped = this.groupBy(r, m => m.register.trim());
      const accepts = r.filter(member => member.participation == Participation.Yes).length;
      const declines = r.filter(member => member.participation == Participation.No).length;
      this.members.set([grouped, accepts, declines]);
    });
  }

  yes(): Participation {
    return Participation.Yes;
  }

  no(): Participation {
    return Participation.No;
  }

}
