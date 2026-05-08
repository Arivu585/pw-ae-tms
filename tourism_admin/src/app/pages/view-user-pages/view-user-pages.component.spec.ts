import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserPagesComponent } from './view-user-pages.component';

describe('ViewUserPagesComponent', () => {
  let component: ViewUserPagesComponent;
  let fixture: ComponentFixture<ViewUserPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewUserPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUserPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
