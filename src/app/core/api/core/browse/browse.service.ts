import { Injectable } from '@angular/core';
import { BaseApi } from '../../base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BrowseService extends BaseApi {

    constructor(protected override http: HttpClient) {
        super(http)
    }

    newReleases(): Observable<any> {
        return this.http.get<any>(`${environment.CORE_URL}/browse/new-releases`);
    }
}
