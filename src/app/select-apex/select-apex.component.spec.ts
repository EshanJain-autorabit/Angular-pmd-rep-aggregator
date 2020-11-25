import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectApexComponent } from './select-apex.component';

describe('SelectApexComponent', () => {
  let component: SelectApexComponent;
  let fixture: ComponentFixture<SelectApexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectApexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectApexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
