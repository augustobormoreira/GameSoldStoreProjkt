import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluserscomponentComponent } from './alluserscomponent.component';

describe('AlluserscomponentComponent', () => {
  let component: AlluserscomponentComponent;
  let fixture: ComponentFixture<AlluserscomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlluserscomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlluserscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
