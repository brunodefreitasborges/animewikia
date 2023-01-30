import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DeviceSize } from './shared.types';

@Injectable({
  providedIn: 'root'
})
export class MediaService implements OnDestroy {
    private device$ = new BehaviorSubject<DeviceSize | undefined>(undefined);
    readonly deviceSize$ = this.device$.asObservable();
    subscription?: Subscription;


    constructor(private readonly _breakpointObserver: BreakpointObserver) {
    }

    init(): void {
        this.subscription = this._breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge
        ]).subscribe((state: BreakpointState) => {
            if (state.breakpoints[Breakpoints.XSmall]) {
                this.setObservable('mobile');
            }
            if (state.breakpoints[Breakpoints.Small] || state.breakpoints[Breakpoints.Medium]) {
                this.setObservable('tablet');
            }
            if (state.breakpoints[Breakpoints.Large] || state.breakpoints[Breakpoints.XLarge]) {
                this.setObservable('desktop');
            }
        });
    }

    setObservable(device: DeviceSize): void {
        this.device$.next(device);
    }

    ngOnDestroy(): void {
        this.device$.complete();
        this.subscription?.unsubscribe();
    }

}
