import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimeApiResponse, StreamingLinksApiResponse } from '../integration/api.model';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {

  homePage$: Observable<AnimeApiResponse | undefined> = this.store.select(state => state.currentAnime);
  streamingLink$: Observable<StreamingLinksApiResponse | undefined> = this.store.select(state => state.streamingLink);

  constructor(private store: AppStore) { }

  ngOnInit(): void {
    this.store.fetchHomePage();
  }

  ngAfterViewInit(): void {
    this.homePage$.subscribe((homePage: AnimeApiResponse | undefined) => {

    })
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


