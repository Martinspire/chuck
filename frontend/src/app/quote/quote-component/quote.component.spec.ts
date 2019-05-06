import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { MaterialModule } from 'src/app/shared/angular-material.module';

import { QuoteComponent } from './quote.component';
import { Joke } from 'src/app/models/joke/joke';
import { ApiService } from '../../shared/api/api.service';
import { of } from 'rxjs';
import { RefreshService } from 'src/app/shared/refresh/refresh.service';

const randomJoke: Joke = {
  id: 501,
  joke: 'Chuck Norris\' programs never exit, they terminate.',
  categories: ['nerdy']
};

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;
  let apiService: ApiService;
  let refreshService: RefreshService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteComponent ],
      imports: [ MaterialModule, HttpClientModule ],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: () => 'safehtml',
            bypassSecurityTrustHtml: () => 'safehtml'
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    refreshService = TestBed.get(RefreshService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getRandomBackground', () => {
    it('should return the random number', () => {
      expect(component.getRandomBackground()).toBeDefined();
      expect(typeof component.getRandomBackground()).toEqual('number');
      expect(component.getRandomBackground() > -1).toBeTruthy();
      expect(component.getRandomBackground() < 5).toBeTruthy();
    });
  });

  describe('getSafeJoke', () => {
    it('should return the random', () => {
      expect(component.getSafeJoke('abc')).toEqual('safehtml');
      expect(component.getSafeJoke('')).toEqual('safehtml');
    });
  });

  describe('getRandomJoke', () => {
    it('should return a joke', () => {
      spyOn(apiService, 'getRandomJoke').and.returnValue(of(randomJoke));
      expect(component.joke).toEqual(undefined);
      component.getRandomJoke();
      fixture.detectChanges();
      expect(component.joke).toEqual(randomJoke);
    });
    it('should not set a joke when no data has been recieved', () => {
      spyOn(apiService, 'getRandomJoke').and.returnValue(of());
      component.getRandomJoke();
      fixture.detectChanges();
      expect(component.joke).toEqual(undefined);
    });
  });

  describe('subscribeToRefresh', () => {
    it('get joke when triggered refresh', () => {
      spyOn(apiService, 'getRandomJoke').and.returnValue(of(randomJoke));
      expect(component.joke).toEqual(undefined);
      component.subscribeToRefresh();
      refreshService.setRefreshQuote();
      fixture.detectChanges();
      expect(component.joke).toEqual(randomJoke);
    });
  });

  describe('onInit', () => {
    it('should call service', () => {
      spyOn(apiService, 'getRandomJoke').and.returnValue(of(randomJoke));
      component.ngOnInit();
      expect(component.joke).toEqual(randomJoke);
    });
  });

});
