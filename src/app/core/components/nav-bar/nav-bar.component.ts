import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

export type PageType = 'HOME' | 'ARTISTS' | 'ALBUMS' | 'SETTINGS';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

    private urlSub: Subscription;

    private isLoginPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    isLoginPage$: Observable<boolean> = this.isLoginPage.asObservable();

    constructor(private authService: AuthService, private route: Router) {
    }

    ngOnInit(): void {
        this.route.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const url = event.urlAfterRedirects;
                if (url.includes('/login')) {
                    this.isLoginPage.next(true);
                } else {
                    this.isLoginPage.next(false);
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.urlSub.unsubscribe();
        this.isLoginPage.complete();
    }

    logout(): void {
        this.authService.logout();
    }

}
