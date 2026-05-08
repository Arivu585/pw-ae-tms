import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPagesComponent } from './add-user-pages.component';

describe('AddUserPagesComponent', () => {
  let component: AddUserPagesComponent;
  let fixture: ComponentFixture<AddUserPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
