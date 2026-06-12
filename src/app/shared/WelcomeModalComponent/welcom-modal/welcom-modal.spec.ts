import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomModal } from './welcom-modal';

describe('WelcomModal', () => {
  let component: WelcomModal;
  let fixture: ComponentFixture<WelcomModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
