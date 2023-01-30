import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an anime when an ID is passed', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getAnime('1');
    expect(spy).toHaveBeenCalledWith('https://kitsu.io/api/edge/anime/1');
  });

  it('should return streaming links when an ID is passed', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getStreamingLinks('1');
    expect(spy).toHaveBeenCalledWith('https://kitsu.io/api/edge/anime/1/streaming-links');
  });

  it('should return an anime when a query is passed', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.searchAnime('Kimetsu no Yaiba');
    expect(spy).toHaveBeenCalledWith('https://kitsu.io/api/edge/anime?filter[text]=Kimetsu no Yaiba');
  });
});
