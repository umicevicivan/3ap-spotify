import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Album } from '../api/core/albums/album';
import { AlbumsService } from '../api/core/albums/albums.service';

@Injectable({
    providedIn: 'root'
})
export class AlbumResolver implements Resolve<Album> {

    constructor(private albumsService: AlbumsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> {
        return this.albumsService.findById(route.paramMap.get('id'));
    }
}
