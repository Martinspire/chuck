import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/angular-material.module';
import { RefreshService } from './shared/refresh/refresh.service';
import { of, BehaviorSubject } from 'rxjs';

class MockServices {
  // Router
  public events = of( new NavigationEnd(0, 'http://localhost:4200/chucklist', 'http://localhost:4200/chucklist'));
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let refreshService: RefreshService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get( Router);
    refreshService = TestBed.get(RefreshService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('getRandomBackground', () => {
    it('should return the random number', () => {
      expect(component.getRandomBackground()).toBeDefined();
      expect(typeof component.getRandomBackground()).toEqual('number');
      expect(component.getRandomBackground() > -1).toBeTruthy();
      expect(component.getRandomBackground() < 7).toBeTruthy();
    });
  });

  describe('refreshJokes', () => {
    it('it should trigger refreshservice on proper url', () => {
      component.url = '/chucklist';
      spyOn(refreshService, 'setRefreshChuckList');
      component.refreshJokes();
      expect(refreshService.setRefreshChuckList).toHaveBeenCalled();
    });
    it('it should not trigger refreshservice on wrong url', () => {
      component.url = 'abc';
      spyOn(refreshService, 'setRefreshChuckList');
      component.refreshJokes();
      expect(refreshService.setRefreshChuckList).not.toHaveBeenCalled();
    });
  });

  describe('refreshQuote', () => {
    it('it should trigger refreshservice on proper url', () => {
      component.url = '/quote';
      spyOn(refreshService, 'setRefreshQuote');
      component.refreshQuote();
      expect(refreshService.setRefreshQuote).toHaveBeenCalled();
    });
    it('it should not trigger refreshservice on wrong url', () => {
      component.url = 'abc';
      spyOn(refreshService, 'setRefreshQuote');
      component.refreshQuote();
      expect(refreshService.setRefreshQuote).not.toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should initialize', () => {
      component.ngOnInit();

      // test getting url for chucklist page
      const chuckEvent = new NavigationEnd(42, '/chucklist', '/chucklist');
      TestBed.get(Router).events.next(chuckEvent);

      fixture.detectChanges();
      expect(component.url).toEqual('/chucklist');

      // test getting url for quote page
      const quoteEvent = new NavigationEnd(42, '/quote', '/quote');
      TestBed.get(Router).events.next(quoteEvent);

      fixture.detectChanges();
      expect(component.url).toEqual('/quote');
    });
  });
});
