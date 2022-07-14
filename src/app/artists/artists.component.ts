import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artist } from '../core/api/core/artists/artist';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnDestroy {

    private artists: BehaviorSubject<Artist[]> = new BehaviorSubject<Artist[]>([]);
    private searched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    artists$: Observable<Artist[]> = this.artists.asObservable();
    searched$: Observable<boolean> = this.searched.asObservable();
    artistsEmpty$: Observable<boolean> = this.artists$.pipe(map(artists => !artists || artists.length === 0));

    constructor() {
    }

    ngOnDestroy(): void {
        this.artists.complete();
        this.searched.complete();
    }

    onResults(event): void {
        this.artists.next(event);
        this.searched.next(true);
    }

}
