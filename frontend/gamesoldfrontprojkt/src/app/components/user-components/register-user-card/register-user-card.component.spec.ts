import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserCardComponent } from './register-user-card.component';

describe('RegisterUserCardComponent', () => {
  let component: RegisterUserCardComponent;
  let fixture: ComponentFixture<RegisterUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
