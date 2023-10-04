import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllorderscomponentComponent } from './allorderscomponent.component';

describe('AllorderscomponentComponent', () => {
  let component: AllorderscomponentComponent;
  let fixture: ComponentFixture<AllorderscomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllorderscomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllorderscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
