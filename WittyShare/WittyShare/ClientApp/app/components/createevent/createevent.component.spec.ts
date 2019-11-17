import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateeventComponent } from './createevent.component';

describe('CreateeventComponent', () => {
  let component: CreateeventComponent;
  let fixture: ComponentFixture<CreateeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
