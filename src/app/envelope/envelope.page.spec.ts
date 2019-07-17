import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvelopePage } from './envelope.page';

describe('EnvelopePage', () => {
  let component: EnvelopePage;
  let fixture: ComponentFixture<EnvelopePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnvelopePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvelopePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
