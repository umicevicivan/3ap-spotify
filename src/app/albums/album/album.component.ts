import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Album } from '../../core/api/core/albums/album';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../../core/api/core/tracks/track';
import { AlbumsService } from '../../core/api/core/albums/albums.service';
import { map } from 'rxjs/operators';
import { TrackFilter, TracksService } from '../../core/api/core/tracks/tracks.service';
import { SettingsService } from '../../core/util/settings.service';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {

    private album: BehaviorSubject<Album | null> = new BehaviorSubject<Album | null>(null);
    private tracks: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);

    album$: Observable<Album | null> = this.album.asObservable();
    tracks$: Observable<Track[]> = this.tracks.asObservable();
    tracksEmpty$: Observable<boolean> = this.tracks$.pipe(map(tracks => !tracks || tracks.length === 0));

    sortBy = "TRACK_NO";

    constructor(private route: ActivatedRoute, private albumsService: AlbumsService, private trackService: TracksService,
                private settingsService: SettingsService) {
    }

    ngOnInit(): void {
        const album = this.route.snapshot.data['album'];
        if (!album) {
            return;
        }
        this.album.next(album);
        this.fetchTracks();
        this.settingsService.albumHistory = [album];
    }

    ngOnDestroy(): void {
        this.album.complete();
        this.tracks.complete();
    }

    toggleSort(sortBy: string): void {
        this.sortBy = sortBy;
        this.sortTracks();
    }

    private fetchTracks(): void {
        const album = this.album.getValue();
        if (!album || !album.id) {
            return;
        }
        this.albumsService.tracks(album.id).pipe(
            map(data => data.items.map(item => item.id)),
            switchMap(itemIds => {
                const filter = new TrackFilter();
                filter.ids = itemIds;
                return this.trackService.find(filter);
            })
        ).subscribe(tracks => {
            this.tracks.next(tracks.tracks);
            this.sortTracks();
        })
    }

    private sortTracks(): void {
        const tracks = this.tracks.getValue();
        switch (this.sortBy) {
            case 'TRACK_NO':
                this.tracks.next(tracks.sort((a, b) => a.track_number - b.track_number));
                break;
            case 'POPULARITY':
                this.tracks.next(tracks.sort((a, b) => b.popularity - a.popularity));
                break;
            default:
                console.warn(`No sort by defined`);
        }
    }
}
