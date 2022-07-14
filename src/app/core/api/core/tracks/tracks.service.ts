import { Injectable } from '@angular/core';
import { BaseApi } from '../../base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export class TrackFilter {
    ids: string[];
}

@Injectable({
    providedIn: 'root'
})
export class TracksService extends BaseApi {

    constructor(protected override http: HttpClient) {
        super(http)
    }

    find(filter: TrackFilter): Observable<any> {
        return this.http.get<any>(`${environment.CORE_URL}/tracks`, {
            params: this.params(filter, [])

        });
    }

}
