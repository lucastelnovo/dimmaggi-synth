import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MixerPage} from './mixer.page';

describe('MixerPage', () => {
    let component: MixerPage;
    let fixture: ComponentFixture<MixerPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MixerPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MixerPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
