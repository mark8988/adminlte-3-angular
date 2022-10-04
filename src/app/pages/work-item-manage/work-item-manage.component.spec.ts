import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemManageComponent } from './work-item-manage.component';

describe('WorkItemManageComponent', () => {
  let component: WorkItemManageComponent;
  let fixture: ComponentFixture<WorkItemManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkItemManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
