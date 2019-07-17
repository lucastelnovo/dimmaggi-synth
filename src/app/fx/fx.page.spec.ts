import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxPage } from './fx.page';

describe('FxPage', () => {
  let component: FxPage;
  let fixture: ComponentFixture<FxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
