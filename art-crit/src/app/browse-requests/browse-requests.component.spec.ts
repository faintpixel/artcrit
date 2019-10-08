import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRequestsComponent } from './browse-requests.component';

describe('BrowseRequestsComponent', () => {
  let component: BrowseRequestsComponent;
  let fixture: ComponentFixture<BrowseRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
