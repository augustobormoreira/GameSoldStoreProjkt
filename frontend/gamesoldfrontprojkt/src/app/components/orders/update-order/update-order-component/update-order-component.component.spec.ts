import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderComponentComponent } from './update-order-component.component';

describe('UpdateOrderComponentComponent', () => {
  let component: UpdateOrderComponentComponent;
  let fixture: ComponentFixture<UpdateOrderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
