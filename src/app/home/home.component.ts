import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable, map } from 'rxjs';
import { AnimeApiResponse, StreamingLinksApiResponse } from '../integration/api.model';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  backgroundPoster!: boolean;
  homePage$: Observable<AnimeApiResponse | undefined> = this.store.select(state => state.currentAnime);
  streamingLink$: Observable<StreamingLinksApiResponse | undefined> = this.store.select(state => state.streamingLink);

  constructor(private store: AppStore,
    private mediaObserver: MediaObserver,
    ) { }

  ngOnInit(): void {
    this.store.fetchHomePage();
    this.mediaObserver.asObservable().pipe(
      map(changes => changes[0])
    ).subscribe(change => {
      if(change.mqAlias === 'xs' || change.mqAlias === 'sm' || change.mqAlias === 'md') {
        this.backgroundPoster = true;
      } else {
        this.backgroundPoster = false;
      }
    });
  }

  getStreamingLink(id: string): void {
    this.store.fetchStreamingLink(id);
    setTimeout(() => {
      this.streamingLink$.subscribe((streamingLink: StreamingLinksApiResponse | undefined) => {
        if(streamingLink) {
          // Get the Crunchyroll link first
          const streamingLinkUrl = streamingLink.data.filter(data => data.attributes.url.includes('crunchyroll')).map(data => data.attributes.url)[0];
          // If there's no Crunchyroll link, open the first link
          if(!streamingLinkUrl) {
            window.open(streamingLink.data[0].attributes.url, '_blank');
          } else {
            window.open(streamingLinkUrl, '_blank');
          }

        }
        });
    }, 1000);
  }

}


