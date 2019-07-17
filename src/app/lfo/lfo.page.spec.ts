import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LfoPage } from './lfo.page';

describe('LfoPage', () => {
  let component: LfoPage;
  let fixture: ComponentFixture<LfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
