import { async, ComponentFixture, TestBed, flush, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { MaterialModule } from '../../shared/angular-material.module';

import { ChuckListComponent } from './chuck-list.component';
import { Joke } from 'src/app/models/joke/joke';
import { ApiService } from '../../shared/api/api.service';
import { of } from 'rxjs';
import { RefreshService } from 'src/app/shared/refresh/refresh.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { MatSnackBar } from '@angular/material';
import { browser } from 'protractor';

const jokes: Joke[] = [
  { id: 501, joke: 'Chuck Norris\' programs never exit, they terminate.', categories: ['nerdy'] },
  { id: 456, joke: 'All browsers support the hex definitions #chuck and #norris for the colors black and blue.', categories: ['nerdy'] },
  { id: 297, joke: 'Noah was the only man notified before Chuck Norris relieved himself in the Atlantic Ocean.', categories: [] },
  { id: 189, joke: 'Behind every successful man, there is a woman. Behind every dead man, there is Chuck Norris.', categories: [] }
];
const favoriteJokes: Joke[] = [
  { id: 456, joke: 'All browsers support the hex definitions #chuck and #norris for the colors black and blue.', categories: ['nerdy'] },
  { id: 297, joke: 'Noah was the only man notified before Chuck Norris relieved himself in the Atlantic Ocean.', categories: [] }
];
const favoriteJokeIds: number[] = [456, 297];

describe('ChuckListComponent', () => {
  let component: ChuckListComponent;
  let fixture: ComponentFixture<ChuckListComponent>;
  let apiService: ApiService;
  let refreshService: RefreshService;
  let storageService: StorageService;
  let snackBar: MatSnackBar;
  let haveJokeStorageSpy: jasmine.Spy;
  let getJokeStorageSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuckListComponent ],
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
    fixture = TestBed.createComponent(ChuckListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    refreshService = TestBed.get(RefreshService);
    storageService = TestBed.get(StorageService);
    snackBar = TestBed.get(MatSnackBar);

    localStorage.clear();
    haveJokeStorageSpy = spyOn(storageService, 'haveJokeStorage').and.returnValue(false);
    getJokeStorageSpy = spyOn(storageService, 'getJokeStorage').and.returnValue([]);

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

  describe('getJokes', () => {
    it('should return a joke', () => {
      spyOn(apiService, 'getJokes').and.returnValue(of(jokes));
      expect(component.jokes).toEqual([]);
      component.getJokes();
      fixture.detectChanges();
      expect(component.jokes).toEqual(jokes);
    });
    it('should not set a joke when no data has been recieved', () => {
      spyOn(apiService, 'getJokes').and.returnValue(of());
      component.getJokes();
      fixture.detectChanges();
      expect(component.jokes).toEqual([]);
    });
  });

  describe('getFavorites', () => {
    beforeEach(() => {
      component.jokes = JSON.parse(JSON.stringify(jokes)); // copy
      fixture.detectChanges();
    });
    it('should return a joke', () => {
      haveJokeStorageSpy.and.returnValue(true);
      getJokeStorageSpy.and.returnValue(favoriteJokes);
      component.getFavorites();
      fixture.detectChanges();
      expect(component.jokes[0].favorite).toBeFalsy();
      expect(component.jokes[1].favorite).toBeTruthy();
      expect(component.jokes[2].favorite).toBeTruthy();
      expect(component.jokes[3].favorite).toBeFalsy();
      expect(component.favoriteJokes).toEqual(favoriteJokes);
    });
    it('should not set favorites when no jokes have been set', () => {
      haveJokeStorageSpy.and.returnValue(true);
      getJokeStorageSpy.and.returnValue([]);
      component.getFavorites();
      fixture.detectChanges();
      expect(component.jokes[0].favorite).toBeFalsy();
      expect(component.jokes[1].favorite).toBeFalsy();
      expect(component.jokes[2].favorite).toBeFalsy();
      expect(component.jokes[3].favorite).toBeFalsy();
      expect(component.favoriteJokes).toEqual([]);
    });
    it('should not set a favorite joke when no data has been recieved', () => {
      haveJokeStorageSpy.and.returnValue(false);
      getJokeStorageSpy.and.returnValue(undefined);
      component.getFavorites();
      fixture.detectChanges();
      expect(component.jokes[0].favorite).toBeFalsy();
      expect(component.jokes[1].favorite).toBeFalsy();
      expect(component.jokes[2].favorite).toBeFalsy();
      expect(component.jokes[3].favorite).toBeFalsy();
      expect(component.favoriteJokes).toEqual([]);
    });
    afterAll(() => {
      haveJokeStorageSpy.and.returnValue(of(false));
      getJokeStorageSpy.and.returnValue([]);
    });
  });

  describe('subscribeToRefresh', () => {
    it('get joke when triggered refresh', () => {
      spyOn(apiService, 'getJokes').and.returnValue(of(jokes));
      expect(component.jokes).toEqual([]);
      component.subscribeToRefresh();
      refreshService.setRefreshChuckList();
      fixture.detectChanges();
      expect(component.jokes).toEqual(jokes);
    });
  });

  describe('getNewFavorite', () => {
    it('should return a joke', () => {
      spyOn(apiService, 'getRandomJoke').and.returnValue(of(jokes[0]));
      component.getNewFavorite();
      fixture.detectChanges();
      expect(apiService.getRandomJoke).toHaveBeenCalled();
    });
  });

  describe('setFavorite', () => {
    let newJoke;
    let newFavoriteJoke;
    let setSnackbar;
    let setStorage;
    beforeEach(() => {
      setSnackbar = 0;
      setStorage = 0;

      spyOn(snackBar, 'open').and.callFake((message, action, config) => setSnackbar++); // increase for every call made
      spyOn(storageService, 'setJokeStorage').and.callFake(() => setStorage++); // increase for every call made

      component.jokes = JSON.parse(JSON.stringify(jokes)); // copy
      component.favoriteJokes = []; // reset
      component.jokes[0].favorite = false; // because it should be not listed yet
      newJoke = JSON.parse(JSON.stringify(jokes[0])); // copy
      newJoke.favorite = false; // because it should be not listed yet
      newFavoriteJoke = JSON.parse(JSON.stringify(newJoke)); // copy
      newFavoriteJoke.favorite = true; // because it would be enabled

      fixture.detectChanges();
    });
    it('should set a favorite when enough space', () => {
      expect(component.favoriteJokes).toEqual([]);
      component.setFavorite(newJoke);
      fixture.detectChanges();
      expect(component.favoriteJokes).toEqual([newFavoriteJoke]);
      expect(setSnackbar).toBe(0);
      expect(setStorage).toBe(1);
    });
    it('should be able to toggle a favorite', () => {
      component.favoriteJokes = [newFavoriteJoke];
      component.setFavorite({
        id: 123,
        joke: 'Noah was the only man notified before Chuck Norris relieved himself in the Atlantic Ocean.',
        categories: [],
        favorite: false
      });
      fixture.detectChanges();
      expect(component.favoriteJokes).toEqual([
        newFavoriteJoke,
        {
          id: 123,
          joke: 'Noah was the only man notified before Chuck Norris relieved himself in the Atlantic Ocean.',
          categories: [],
          favorite: true
        }
      ]);
      component.setFavorite({
        id: 123,
        joke: 'Noah was the only man notified before Chuck Norris relieved himself in the Atlantic Ocean.',
        categories: [],
        favorite: true
      });
      fixture.detectChanges();
      expect(component.favoriteJokes).toEqual([newFavoriteJoke]);
      expect(setSnackbar).toBe(0);
      expect(setStorage).toBe(2);
    });
    it('should show message when it is limited', () => {
      component.favoriteJokes = [
        newFavoriteJoke,
        newFavoriteJoke,
        newFavoriteJoke,
        newFavoriteJoke,
        newFavoriteJoke,
        newFavoriteJoke,
        newFavoriteJoke,
        newFavoriteJoke,
        newFavoriteJoke
      ];
      newJoke.favorite = false; // make sure we add it
      component.setFavorite(newJoke);
      fixture.detectChanges();
      expect(setSnackbar).toBe(0); // no notification
      expect(setStorage).toBe(1); // has been stored
      newJoke.favorite = false; // make sure we add it
      component.setFavorite(newJoke);
      fixture.detectChanges();
      expect(setSnackbar).toBe(1);
      expect(setStorage).toBe(1);
    });
    it('should remove favorite when it is unset', () => {
      newJoke.favorite = false; // make sure we set it right
      newFavoriteJoke.favorite = true; // make sure we set it right
      component.favoriteJokes = [
        newFavoriteJoke,
      ];
      component.setFavorite(newFavoriteJoke);
      fixture.detectChanges();
      expect(setSnackbar).toBe(0); // no notification
      expect(setStorage).toBe(1); // has been stored
      expect(component.favoriteJokes).toEqual([]);
    });
  });

  describe('fillFavorites', () => {
    const sleep = m => new Promise(r => setTimeout(r, m));

    it('should fill the list', async () => {
      component.timeout = 10; // lets not wait 5 whole seconds on each interval
      expect(component.favoriteJokes).toEqual([]);
      const apiSpy = spyOn(apiService, 'getRandomJoke').and.returnValue(of(jokes[0]));
      apiSpy.calls.reset();
      component.fillFavorites();
      await sleep(1000);
      expect(apiService.getRandomJoke).toHaveBeenCalled();
    });
  });

  describe('onInit', () => {
    it('should call service', () => {
      spyOn(apiService, 'getJokes').and.returnValue(of(jokes));
      component.ngOnInit();
      expect(component.jokes).toEqual(jokes);
    });
  });

});
