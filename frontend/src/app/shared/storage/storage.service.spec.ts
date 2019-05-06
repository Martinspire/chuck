import { TestBed } from '@angular/core/testing';

import { Joke } from 'src/app/models/joke/joke';

import { StorageService } from './storage.service';

const jokes: Joke[] = [{
  id: 501,
  joke: 'Chuck Norris\' programs never exit, they terminate.',
  categories: ['nerdy']
}];

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
  });

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  describe('haveStorage', () => {
    it('have no data when nothing has been set', () => {
      const service: StorageService = TestBed.get(StorageService);
      const haveStorage = service.haveJokeStorage();
      expect(haveStorage).toEqual(false);
    });
    it('have no data when nothing has been set', () => {
      const service: StorageService = TestBed.get(StorageService);
      localStorage.setItem('favoriteJokes', 'abcdef');
      const haveStorage = service.haveJokeStorage();
      expect(haveStorage).toEqual(true);
    });
  });

  describe('getStorage', () => {
    it('get the data that has been stored', () => {
      const service: StorageService = TestBed.get(StorageService);
      localStorage.setItem('favoriteJokes', JSON.stringify(jokes));
      const getStorage = service.getJokeStorage();
      expect(getStorage).toEqual(jokes);
    });
  });

  describe('setStorage', () => {
    it('get the data that has been stored', () => {
      const service: StorageService = TestBed.get(StorageService);
      localStorage.setItem('favoriteJokes', JSON.stringify(jokes));
      service.setJokeStorage(jokes);
      const setStorage = JSON.parse(localStorage.getItem('favoriteJokes'));
      expect(setStorage).toEqual(jokes);
    });
  });
});
