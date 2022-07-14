import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BaseApi } from '../../base-api';
import { SearchWrapper } from '../common/search-wrapper';

export class SearchFilter {
    query: string;
    type: string;
}

@Injectable({
    providedIn: 'root'
})
export class SearchService extends BaseApi {

    constructor(protected override http: HttpClient) {
        super(http)
    }

    find(filter: SearchFilter): Observable<SearchWrapper> {
        return this.http.get<SearchWrapper>(`${environment.CORE_URL}/search`, {
            params: this.params(filter, [])
        });
    }
}
