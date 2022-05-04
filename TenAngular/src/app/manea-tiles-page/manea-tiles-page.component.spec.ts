import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeaTilesPageComponent } from './manea-tiles-page.component';

describe('ManeaTilesPageComponent', () => {
  let component: ManeaTilesPageComponent;
  let fixture: ComponentFixture<ManeaTilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManeaTilesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManeaTilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
