import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrafosPage } from './grafos.page';

describe('GrafosPage', () => {
  let component: GrafosPage;
  let fixture: ComponentFixture<GrafosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
