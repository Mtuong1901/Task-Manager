import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDuanComponent } from './edit-duan.component';

describe('EditDuanComponent', () => {
  let component: EditDuanComponent;
  let fixture: ComponentFixture<EditDuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDuanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
