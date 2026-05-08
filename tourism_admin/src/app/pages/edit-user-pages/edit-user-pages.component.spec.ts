import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPagesComponent } from './edit-user-pages.component';

describe('EditUserPagesComponent', () => {
  let component: EditUserPagesComponent;
  let fixture: ComponentFixture<EditUserPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
