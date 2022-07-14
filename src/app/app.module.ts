import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './core/interceptors/http-request-interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error-interceptor';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
