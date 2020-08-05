import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewComponent } from './media-view.component';
import { By } from '@angular/platform-browser';

describe('MediaViewComponent', () => {
  let component: MediaViewComponent;
  let fixture: ComponentFixture<MediaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaViewComponent],
    }).compileComponents();
  }));

  const setup = (url) => {
    fixture = TestBed.createComponent(MediaViewComponent);
    component = fixture.componentInstance;
    component.url = url;
    fixture.detectChanges();
  };

  it('should create', () => {
    setup('test.foo');
    expect(component).toBeTruthy();
  });

  describe('when the file extension is JPG', () => {
    it('should render the correct media container element', () => {
      setup('test.jpg');
      const el = fixture.debugElement.query(By.css('#jpg'));
      expect(el).toBeTruthy();
    });
  });

  describe('when the file extension is PNG', () => {
    it('should render the correct media container element', () => {
      setup('test.png');
      const el = fixture.debugElement.query(By.css('#png'));
      expect(el).toBeTruthy();
    });
  });

  describe('when the file extension is JPEG', () => {
    it('should render the correct media container element', () => {
      setup('test.jpeg');
      const el = fixture.debugElement.query(By.css('#jpeg'));
      expect(el).toBeTruthy();
    });
  });

  describe('when the file extension is PDF', () => {
    it('should render the correct media container element', () => {
      setup('test.pdf');
      const el = fixture.debugElement.query(By.css('#pdf'));
      expect(el).toBeTruthy();
    });
  });

  describe('when the file extension is MP4', () => {
    it('should render the correct media container element', () => {
      setup('test.mp4');
      const el = fixture.debugElement.query(By.css('#mp4'));
      expect(el).toBeTruthy();
    });
  });

  describe('when the file extension is anything else', () => {
    it('should render the correct media container element', () => {
      setup('test.php');
      const el = fixture.debugElement.query(By.css('#default'));
      expect(el).toBeTruthy();
    });
  });
});
