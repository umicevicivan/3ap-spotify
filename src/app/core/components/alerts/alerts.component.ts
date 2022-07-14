import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsComponent {

    constructor() {
    }

}
