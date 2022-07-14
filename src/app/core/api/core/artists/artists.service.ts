import { Injectable } from '@angular/core';
import { BaseApi } from '../../base-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SearchItem } from '../common/search-component';
import { Album } from '../albums/album';
import { Artist } from './artist';

@Injectable({
    providedIn: 'root'
})
export class ArtistsService extends BaseApi {

    constructor(protected override http: HttpClient) {
        super(http)
    }

    findById(id: string): Observable<Artist> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get<Artist>(`${environment.CORE_URL}/artists/id`, {
            params: params
        });
    }

    albums(id: string): Observable<SearchItem<Album>> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get<SearchItem<Album>>(`${environment.CORE_URL}/artists/id/albums`, {
            params: params
        });
    }
}
