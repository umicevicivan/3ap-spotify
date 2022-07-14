import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export class Token {
    access_token: string;
    token_type: string;
    expires_in: number;

    constructor(access_token: string, token_type: string, expires_in: number) {
        this.access_token = access_token;
        this.token_type = token_type;
        this.expires_in = expires_in;
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {
    }

    obtainAccessToken(): Observable<string | null> {
        return new Observable(observer => {
            const accessToken = sessionStorage.getItem('access_token');
            if (!accessToken || this.isAccessTokenExpired()) {
                observer.next(null);
                observer.complete();
            } else {
                observer.next(accessToken);
                observer.complete();
            }
        });
    }

    isUserAuthenticated(): Observable<boolean> {
        return this.obtainAccessToken().pipe(map(token => !!token));
    }

    logout() {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('token_type');
        sessionStorage.removeItem('expires_in');
        this.router.navigateByUrl('/admission/login');
    }

    login(username: string, password: string): Observable<boolean> {
        return new Observable(observer => {
            this.authorize(username, password).subscribe((token: Token) => {
                this.addTokens(token.access_token, token.token_type, token.expires_in);
                observer.next(true);
                observer.complete();
            }, () => {
                observer.error(false);
                observer.complete();
            });
        });
    }

    private authorize(username: string, password: string): Observable<Token> {
        return this.http.post<Token>(`${environment.CORE_URL}/token`, {username, password});
    }

    private isAccessTokenExpired(): boolean {
        return moment().isAfter(moment(sessionStorage.getItem('expires_in')));
    }

    private addTokens(accessToken: string, tokenType: string, expiresIn: number) {
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('token_type', tokenType);
        sessionStorage.setItem('expires_in', moment().add(expiresIn, 'second').toISOString());
    }
}
