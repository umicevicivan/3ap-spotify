import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowseService } from '../core/api/core/browse/browse.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Album } from '../core/api/core/albums/album';
import { map } from 'rxjs/operators';
import { SettingsService } from '../core/util/settings.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    private newReleases: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
    private albumHistory: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
    private pending: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    newReleases$: Observable<Album[]> = this.newReleases.asObservable();
    newReleasesEmpty$: Observable<boolean> = this.newReleases$.pipe(map(newReleases => !newReleases || newReleases.length === 0));
    albumHistory$: Observable<Album[]> = this.albumHistory.asObservable();
    albumHistoryEmpty$: Observable<boolean> = this.albumHistory$.pipe(map(albumHistory => !albumHistory || albumHistory.length === 0));
    pending$: Observable<boolean> = this.pending.asObservable();

    constructor(private browseService: BrowseService, private settingsService: SettingsService) {
    }

    ngOnInit(): void {
        this.pending.next(true);
        this.browseService.newReleases().subscribe(data => {
            if (!data || !data.albums || !data.albums.items) {
                return;
            }
            this.pending.next(false);
            this.newReleases.next(data.albums.items.slice(0, 12));
        })
        this.albumHistory.next(this.settingsService.albumHistory.slice(0, this.settingsService.albumHistoryDisplayLength));
    }

    ngOnDestroy(): void {
        this.newReleases.complete();
        this.albumHistory.complete();
        this.pending.complete();
    }

}
