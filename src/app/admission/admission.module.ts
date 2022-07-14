import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AdmissionRoutingModule } from './admission-routing.module';

@NgModule({
    imports: [
        SharedModule,
        AdmissionRoutingModule,
    ],
    declarations: [
        LoginComponent
    ]
})
export class AdmissionModule {
}
