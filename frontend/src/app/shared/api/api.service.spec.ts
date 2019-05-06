import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { of } from 'rxjs';

let httpTestingController: HttpTestingController;
let service: ApiService;

// const jokeUrlBackup = 'http://api.icndb.com/jokes/random/10';
// const randomJokeUrlBackup = 'http://api.icndb.com/jokes/random/';
const jokeUrl = 'http://localhost:3000/api/v1/jokes/random/10';
const randomJokeUrl = 'http://localhost:3000/api/v1/jokes/random/';

const dummyResponse = {
  type: 'success',
  value: [
    { id: 501, joke: 'Chuck Norris\' programs never exit, they terminate.', categories: ['nerdy'] },
    { id: 456, joke: 'All browsers support the hex definitions #chuck and #norris for the colors black and blue.', categories: ['nerdy'] },
    { id: 297, joke: 'Noah was the only man notified before Chuck Norris relieved himself in the Atlantic Ocean.', categories: [] },
    { id: 189, joke: 'Behind every successful man, there is a woman. Behind every dead man, there is Chuck Norris.', categories: [] },
    { id: 597, joke: 'Once death had a near Chuck Norris experience.', categories: [] },
    { id: 291, joke: 'Chuck Norris never wet his bed as a child. The bed wet itself out of fear.', categories: [] },
    { id: 488, joke: 'Chuck Norris doesn\'t pair program.', categories: ['nerdy'] },
    { id: 359, joke: 'Chuck Norris is his own line at the DMV.', categories: [] },
    { id: 202, joke: 'Google won\'t search for Chuck Norris because it knows you don\'t find Chuck Norris, he finds you.', categories: [] },
    { id: 385, joke: 'Chuck Norris once rode a bull, and nine months later it had a calf.', categories: [] }
  ]
};

const dummyRandomResponse = {
  type: 'success',
  value: [
    { id: 501, joke: 'Chuck Norris\' programs never exit, they terminate.', categories: ['nerdy'] }
  ]
};
describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getJokes', () => {
    it('get a list of 10 jokes when done right', () => {
      service.getJokes()
        .subscribe(jokeData => {
          // console.log(jokeData);
          expect(jokeData.length).toEqual(10);
          expect(jokeData[0].id).toEqual(501);
        });

      const req = httpTestingController.expectOne(jokeUrl);

      expect(req.request.method).toEqual('GET');

      req.flush(dummyResponse);
    });
    it('should get empty array when done wrong', () => {
      service.getJokes()
        .subscribe(jokeData => {
          // console.log(jokeData);
          expect(jokeData.length).toEqual(0);
        });

      const req = httpTestingController.expectOne(jokeUrl);

      expect(req.request.method).toEqual('GET');

      req.flush({});
    });
  });

  describe('getRandomJoke', () => {
    it('get a random joke when done right', () => {
      service.getJokes()
        .subscribe(jokeData => {
          // console.log(jokeData);
          expect(jokeData.length).toEqual(1);
          expect(jokeData[0].id).toEqual(501);
        });

      const req = httpTestingController.expectOne(jokeUrl);

      expect(req.request.method).toEqual('GET');

      req.flush(dummyRandomResponse);
    });
    it('should get empty array when done wrong', () => {
      service.getRandomJoke()
        .subscribe(jokeData => {
          // console.log(jokeData);
          expect(jokeData.length).toEqual(0);
        });

      const req = httpTestingController.expectOne(randomJokeUrl);

      expect(req.request.method).toEqual('GET');

      req.flush({});
    });
  });
});
