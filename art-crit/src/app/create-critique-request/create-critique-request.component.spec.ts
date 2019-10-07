import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCritiqueRequestComponent } from './create-critique-request.component';

describe('CreateCritiqueRequestComponent', () => {
  let component: CreateCritiqueRequestComponent;
  let fixture: ComponentFixture<CreateCritiqueRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCritiqueRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCritiqueRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
