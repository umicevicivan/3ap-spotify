import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BaseApi } from '../../base-api';
import { Album } from './album';
import { SearchItem } from '../common/search-component';
import { Track } from '../tracks/track';

@Injectable({
    providedIn: 'root'
})
export class AlbumsService extends BaseApi {

    constructor(protected override http: HttpClient) {
        super(http)
    }

    findById(id: string): Observable<Album> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get<Album>(`${environment.CORE_URL}/albums/id`, {
            params: params
        });
    }

    tracks(id: string): Observable<SearchItem<Track>> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.http.get<SearchItem<Track>>(`${environment.CORE_URL}/albums/id/tracks`, {
            params: params
        });
    }
}
