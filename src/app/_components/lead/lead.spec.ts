import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lead } from './lead';

describe('Lead', () => {
  let component: Lead;
  let fixture: ComponentFixture<Lead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lead);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
