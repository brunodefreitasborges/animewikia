import { AfterViewInit, Component, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription } from 'rxjs';
import { AnimeApiResponse, StreamingLinksApiResponse } from '../integration/api.model';
import { MediaService } from '../services/media.service';
import { DeviceSize } from '../services/shared.types';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  device!: DeviceSize;
  homePage$: Observable<AnimeApiResponse | undefined> = this.store.select(state => state.currentAnime);
  streamingLink$: Observable<StreamingLinksApiResponse | undefined> = this.store.select(state => state.streamingLink);
  subscription: Subscription = new Subscription();

  constructor(private store: AppStore, private readonly _mediaChangeService: MediaService) {
    this._mediaChangeService.init();
   }

  ngOnInit(): void {
    this.store.fetchHomePage();
    this.initializeDevicePage();
  }

  ngAfterViewInit(): void {
  }

  initializeDevicePage(): void {
    setTimeout( () => {
        this.subscription = this._mediaChangeService.deviceSize$
            .pipe(
                filter(value => !!value),
                map(value => value as DeviceSize)
            )
            .subscribe((device) => {
                this.device = device;
            });
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


