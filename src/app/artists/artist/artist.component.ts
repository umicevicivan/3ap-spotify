import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artist } from '../../core/api/core/artists/artist';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../core/api/core/albums/album';
import { ArtistsService } from '../../core/api/core/artists/artists.service';

@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {

    private artist: BehaviorSubject<Artist | null> = new BehaviorSubject<Artist | null>(null);
    private albums: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);

    artist$: Observable<Artist | null> = this.artist.asObservable();
    albums$: Observable<Album[]> = this.albums.asObservable();

    constructor(private route: ActivatedRoute, private artistService: ArtistsService) {
    }

    ngOnInit(): void {
        this.artist.next(this.route.snapshot.data['artist']);
        this.fetchAlbums();
    }

    ngOnDestroy(): void {
        this.artist.complete();
        this.albums.complete();
    }

    private fetchAlbums(): void {
        const artist = this.artist.getValue();
        if (!artist || !artist.id) {
            return;
        }
        this.artistService.albums(artist.id).subscribe(data => {
            this.albums.next(data.items);
        })
    }

}
