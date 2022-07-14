import { Component, Input, OnDestroy } from '@angular/core';
import { Album } from '../../../core/api/core/albums/album';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-albums-table',
    templateUrl: './albums-table.component.html',
    styleUrls: ['./albums-table.component.scss']
})
export class AlbumsTableComponent implements OnDestroy {

    private albums: BehaviorSubject<Album[] | null> = new BehaviorSubject<Album[] | null>([]);

    albums$: Observable<Album[] | null> = this.albums.asObservable();
    albumsEmpty$: Observable<boolean> = this.albums$.pipe(map(albums => !albums || albums.length === 0));

    @Input('albums') set setAlbums(albums: Album[] | null) {
        this.albums.next(albums)
    }

    constructor() {
    }

    ngOnDestroy(): void {
        this.albums.complete();
    }
}
