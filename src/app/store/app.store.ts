import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AnimeApiResponse, AnimeArrayApiResponse, StreamingLinksApiResponse } from '../integration/api.model';
import { ApiService } from '../integration/api.service';

export interface AppState {
  currentAnime?: AnimeApiResponse
  streamingLink?: StreamingLinksApiResponse
  trendingAnimes?: AnimeArrayApiResponse
}

const initialState: AppState = {
}

@Injectable({
  providedIn: 'root'
})
export class AppStore extends ComponentStore<AppState>  {


  constructor(private apiService: ApiService,
    private errorSnackBar: MatSnackBar) {
    super(initialState);
  }

  fetchHomePage = this.effect((homeFetch$: Observable<void>) => {
    return homeFetch$.pipe(
      switchMap(() => this.apiService.getAnime('41370').pipe(
          tapResponse(
            (currentAnime: AnimeApiResponse) => this.setCurrentAnime(currentAnime),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  });

  fetchStreamingLink = this.effect((id$: Observable<string>) => {
    return id$.pipe(
      switchMap((id: string) => this.apiService.getStreamingLinks(id).pipe(
          tapResponse(
            (streamingLink: StreamingLinksApiResponse) => {
            this.setStreamingLink(streamingLink)
            }
            ,
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  });

  fetchAnime = this.effect((query$: Observable<string>) => {
    return query$.pipe(
      switchMap((query: string) => this.apiService.searchAnime(query).pipe(
          tapResponse(
            (anime: AnimeApiResponse) => {
              if(anime.data == undefined) {
                this.errorSnackBar.open('No anime found with that name', 'OK', {});
              } if(anime.data.attributes.coverImage == null || anime.data.attributes.posterImage == null) {
                this.errorSnackBar.open('No anime found with that name', 'OK', {});
              }
              else {
                this.setCurrentAnime(anime)
              }
            },
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  });

  fetchTrendingAnime = this.effect((trendingFetch$: Observable<void>) => {
    return trendingFetch$.pipe(
      switchMap(() => this.apiService.getTrendingAnimes().pipe(
          tapResponse(
            (trendingAnimes: AnimeArrayApiResponse) => {
              this.setTrendingAnimes(trendingAnimes);
              this.setCurrentAnime({
                data: trendingAnimes.data[0]
              });
            },
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  });


  setCurrentAnime = this.updater(
    (state, currentAnime: AnimeApiResponse) => ({...state, currentAnime})
  );

  setStreamingLink = this.updater(
    (state, streamingLink: StreamingLinksApiResponse) => ({...state, streamingLink})
  );

  setTrendingAnimes = this.updater(
    (state, trendingAnimes: AnimeArrayApiResponse) => ({...state, trendingAnimes})
  );

  setNextAnime(index: number) {
    const nextAnime = this.get().trendingAnimes?.data[index];
    if(nextAnime == undefined) {
      return;
    }
    this.setCurrentAnime({
      data: nextAnime
    })
  };

  setPreviousAnime(index: number) {
    const previousAnime = this.get().trendingAnimes?.data[index];
    if(previousAnime == undefined) {
      return;
    }
    this.setCurrentAnime({
      data: previousAnime
    })
  }

}
