import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetSelectionComponent } from './ruleset-selection.component';

describe('RulesetSelectionComponent', () => {
  let component: RulesetSelectionComponent;
  let fixture: ComponentFixture<RulesetSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesetSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
