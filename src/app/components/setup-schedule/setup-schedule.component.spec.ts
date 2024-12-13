import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupScheduleComponent } from './setup-schedule.component';

describe('SetupScheduleComponent', () => {
  let component: SetupScheduleComponent;
  let fixture: ComponentFixture<SetupScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
