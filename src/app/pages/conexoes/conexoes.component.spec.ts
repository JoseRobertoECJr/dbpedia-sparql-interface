import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexoesComponent } from './conexoes.component';

describe('ConexoesComponent', () => {
  let component: ConexoesComponent;
  let fixture: ComponentFixture<ConexoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
