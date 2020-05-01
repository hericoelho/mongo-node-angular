import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationListComponent } from './solicitation-list.component';

describe('SolicitationListComponent', () => {
  let component: SolicitationListComponent;
  let fixture: ComponentFixture<SolicitationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
