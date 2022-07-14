import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './components/alerts/alert-modal/alert-modal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AlertsComponent } from './components/alerts/alerts.component';

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule,
        SharedModule,
        NgbModule
    ],
    declarations: [
        NavBarComponent,
        AlertsComponent,
        AlertModalComponent,
    ],
    exports: [
        AlertsComponent,
        NavBarComponent
    ]
})
export class CoreModule {
}
