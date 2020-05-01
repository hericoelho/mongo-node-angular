import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationCreateComponent } from './solicitation-create.component';

describe('SolicitationCreateComponent', () => {
  let component: SolicitationCreateComponent;
  let fixture: ComponentFixture<SolicitationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
