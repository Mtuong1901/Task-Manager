import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDuanComponent } from './add-duan.component';

describe('AddDuanComponent', () => {
  let component: AddDuanComponent;
  let fixture: ComponentFixture<AddDuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDuanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
