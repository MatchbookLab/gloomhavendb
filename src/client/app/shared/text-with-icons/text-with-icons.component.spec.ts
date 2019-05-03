import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithIconsComponent } from './text-with-icons.component';
import { TextWithIconsModule } from './text-with-icons.module';

describe('TextWithIconsComponent', () => {
  let component: TextWithIconsComponent;
  let fixture: ComponentFixture<TextWithIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextWithIconsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
