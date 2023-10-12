import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BartendersComponent } from './bartenders.component';

describe('BartendersComponent', () => {
  let component: BartendersComponent;
  let fixture: ComponentFixture<BartendersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BartendersComponent]
    });
    fixture = TestBed.createComponent(BartendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
