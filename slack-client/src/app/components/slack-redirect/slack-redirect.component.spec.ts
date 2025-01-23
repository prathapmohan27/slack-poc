import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlackRedirectComponent } from './slack-redirect.component';

describe('SlackRedirectComponent', () => {
  let component: SlackRedirectComponent;
  let fixture: ComponentFixture<SlackRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlackRedirectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlackRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
