import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtistsService } from '../api/core/artists/artists.service';
import { Artist } from '../api/core/artists/artist';

@Injectable({
    providedIn: 'root'
})
export class ArtistResolver implements Resolve<Artist> {

    constructor(private artistsService: ArtistsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Artist> {
        return this.artistsService.findById(route.paramMap.get('id'));
    }
}
