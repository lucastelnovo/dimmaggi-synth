import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscillatorsPage } from './oscillators.page';

describe('OscillatorsPage', () => {
  let component: OscillatorsPage;
  let fixture: ComponentFixture<OscillatorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OscillatorsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscillatorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
