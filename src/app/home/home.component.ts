import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimeApiResponse, StreamingLinkApiResponse } from '../integration/api.model';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {

  homePage$: Observable<AnimeApiResponse | undefined> = this.store.select(state => state.currentAnime);
  streamingLink$: Observable<StreamingLinkApiResponse | undefined> = this.store.select(state => state.streamingLink);

  constructor(private store: AppStore) { }

  ngOnInit(): void {
    this.store.fetchHomePage();
  }

  ngAfterViewInit(): void {
    this.homePage$.subscribe((homePage: AnimeApiResponse | undefined) => {

    })
  }

  getStreamingLink(): void {
    this.store.fetchStreamingLink();
    this.streamingLink$.subscribe((streamingLink: StreamingLinkApiResponse | undefined) => {
      if(streamingLink) {
        const streamingLinkUrl = streamingLink.data[0].attributes.url;
        window.open(streamingLinkUrl, '_blank');
      }
      });
  }

}


