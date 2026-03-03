import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionMap } from './vision-map';

describe('VisionMap', () => {
  let component: VisionMap;
  let fixture: ComponentFixture<VisionMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionMap],
    }).compileComponents();

    fixture = TestBed.createComponent(VisionMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
