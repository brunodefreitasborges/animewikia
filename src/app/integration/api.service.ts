import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnimeApiResponse, QueryApiResponse, StreamingLinkApiResponse } from './api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAnime(id: string): Observable<AnimeApiResponse> {
    return this.http.get<AnimeApiResponse>('https://kitsu.io/api/edge/anime/' + id);
  }

  getStreamingLinks(id: string): Observable<StreamingLinkApiResponse> {
    return this.http.get<StreamingLinkApiResponse>('https://kitsu.io/api/edge/anime/' + id + '/streaming-links');
  }

  searchAnime(query: string): Observable<AnimeApiResponse> {
    return this.http.get<QueryApiResponse>('https://kitsu.io/api/edge/anime?filter[text]=' + query)
      .pipe(
        map((response: QueryApiResponse) => {
          const anime: AnimeApiResponse = {
            data: response.data[0]
          };
          return anime;
        }));

  }
}
