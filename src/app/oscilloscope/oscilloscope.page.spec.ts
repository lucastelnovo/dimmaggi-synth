import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscilloscopePage } from './oscilloscope.page';

describe('OscilloscopePage', () => {
  let component: OscilloscopePage;
  let fixture: ComponentFixture<OscilloscopePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OscilloscopePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscilloscopePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
