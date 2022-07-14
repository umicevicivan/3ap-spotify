import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AlertsService } from '../components/alerts/alerts.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private alerts: AlertsService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    if (event && event.body && event.body.error) {
                        this.alerts.httpError('API Error', event.body.error.message || '');
                    }
                }
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this.alerts.httpError('Server Error', 'Check if server is running.');
                }
            }));
    }
}
