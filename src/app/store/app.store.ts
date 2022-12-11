import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';
import { AnimeApiResponse, StreamingLinksApiResponse } from '../integration/api.model';
import { ApiService } from '../integration/api.service';

export interface AppState {
  currentAnime: AnimeApiResponse
  streamingLink?: StreamingLinksApiResponse
}

const initialState: AppState = {
  currentAnime: {
    data: {
      id: '41370',
      type: 'anime',
      attributes: {
        description: 'It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. To make matters worse, his younger sister Nezuko, the sole survivor, has been transformed into a demon herself. Though devastated by this grim reality, Tanjiro resolves to become a “demon slayer” so that he can turn his sister back into a human, and kill the demon that massacred his family.(Source: Crunchyroll)',
        canonicalTitle: 'Kimetsu no Yaiba',
        averageRating: '86.34',
        coverImage: {
          original: 'https://media.kitsu.io/anime/cover_images/41370/original.jpg'
        },
        posterImage: {
          original: 'https://media.kitsu.io/anime/poster_images/41370/original.jpg'
        }
      }
    }
  }
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
              } else {
                this.setCurrentAnime(anime)
              }
            },
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  })

  setCurrentAnime = this.updater(
    (state, currentAnime: AnimeApiResponse) => ({...state, currentAnime})
  );

  setStreamingLink = this.updater(
    (state, streamingLink: StreamingLinksApiResponse) => ({...state, streamingLink})
  );
}
