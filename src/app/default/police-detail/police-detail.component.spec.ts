import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceDetailComponent } from './police-detail.component';

describe('PoliceDetailComponent', () => {
  let component: PoliceDetailComponent;
  let fixture: ComponentFixture<PoliceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
