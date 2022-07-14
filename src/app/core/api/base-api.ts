import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export abstract class BaseApi {

    protected constructor(protected http: HttpClient) {
    }

    protected params(filter: any, embed: string[] = []): HttpParams {
        let params: HttpParams = new HttpParams();

        Object.keys(filter).forEach(key => {
            if (filter[key] == null || filter[key] === '') {
                return;
            }

            if (filter[key] instanceof Array) {
                filter[key].forEach((value: string | number | boolean) => params = params.append(key, value));
            } else if (filter[key].day && filter[key].month && filter[key].year) {
                params = params.append(key, moment(`${filter[key].year}-${filter[key].month}-${filter[key].day}`, 'YYYY-M-D').format('YYYY-MM-DD'));
            } else if (filter[key] instanceof Date) {
                params = params.append(key, moment(filter[key]).toISOString());
            } else {
                params = params.append(key, filter[key]);
            }
        });

        embed.forEach((e: string) => params = params.append('embed', e));

        return params;
    }
}
