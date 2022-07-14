import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { AlertsService } from '../components/alerts/alerts.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router, private alerts: AlertsService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.isUserAuthenticated().pipe(
            tap(canActivate => {
                if (canActivate) {
                    return;
                }
                this.auth.logout();
                this.alerts.httpError('Session has expired', 'Please login again');
                this.router.navigateByUrl('/admission/login');
            })
        );
    }
}
