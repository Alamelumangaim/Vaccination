import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecenterComponent } from './updatecenter.component';

describe('UpdatecenterComponent', () => {
  let component: UpdatecenterComponent;
  let fixture: ComponentFixture<UpdatecenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatecenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
