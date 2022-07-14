import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Album } from '../core/api/core/albums/album';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnDestroy {

    private albums: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
    private searched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    albums$: Observable<Album[]> = this.albums.asObservable();
    searched$: Observable<boolean> = this.searched.asObservable();

    constructor() {
    }

    ngOnDestroy(): void {
        this.albums.complete();
        this.searched.complete();
    }

    onResults(event): void {
        this.albums.next(event);
        this.searched.next(true);
    }
}
