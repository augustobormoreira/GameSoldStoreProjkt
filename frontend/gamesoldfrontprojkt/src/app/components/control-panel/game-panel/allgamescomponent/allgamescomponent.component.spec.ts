import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllgamescomponentComponent } from './allgamescomponent.component';

describe('AllgamescomponentComponent', () => {
  let component: AllgamescomponentComponent;
  let fixture: ComponentFixture<AllgamescomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllgamescomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllgamescomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
