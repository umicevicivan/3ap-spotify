import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes(environment.CORE_URL)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                }
            });
        }
        return next.handle(request);
    }
}
