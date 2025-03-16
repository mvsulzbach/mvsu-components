import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatingMembersComponent } from './participating-members.component';

describe('ParticipatingMembersComponent', () => {
  let component: ParticipatingMembersComponent;
  let fixture: ComponentFixture<ParticipatingMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipatingMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipatingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
