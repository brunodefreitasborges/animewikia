import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnimeApiResponse, AnimeArrayApiResponse, StreamingLinksApiResponse } from './api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAnime(id: string): Observable<AnimeApiResponse> {
    return this.http.get<AnimeApiResponse>('https://kitsu.io/api/edge/anime/' + id);
  }

  getStreamingLinks(id: string): Observable<StreamingLinksApiResponse> {
    return this.http.get<StreamingLinksApiResponse>('https://kitsu.io/api/edge/anime/' + id + '/streaming-links');
  }

  getTrendingAnimes(): Observable<AnimeArrayApiResponse> {
    return this.http.get<AnimeArrayApiResponse>('https://kitsu.io/api/edge/trending/anime');
  }

  searchAnime(query: string): Observable<AnimeApiResponse> {
    return this.http.get<AnimeArrayApiResponse>('https://kitsu.io/api/edge/anime?filter[text]=' + query)
      .pipe(
        map((response: AnimeArrayApiResponse) => {
          const anime: AnimeApiResponse = {
            data: response.data[0]
          };
          return anime;
        }));

  }
}
