import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCritiqueComponent } from './create-critique.component';

describe('CreateCritiqueComponent', () => {
  let component: CreateCritiqueComponent;
  let fixture: ComponentFixture<CreateCritiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCritiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCritiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
