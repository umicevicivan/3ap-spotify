import { Component } from '@angular/core';
import { SettingsService } from '../core/util/settings.service';
import { AlertsService } from '../core/components/alerts/alerts.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    albumHistoryMaxLength = this.settings.albumHistoryMaxLength;
    albumHistoryDisplayLength = this.settings.albumHistoryDisplayLength;

    searchHistoryMaxLength = this.settings.searchHistoryMaxLength;
    searchHistoryDisplayLength = this.settings.searchHistoryDisplayLength;

    constructor(public settings: SettingsService, private alerts: AlertsService) {
    }

    save(): void {
        this.alerts.confirm(
            'Are you sure you want to save?',
            'Some cached data may be lost.'
        ).then(confirmed => {
            if (!confirmed) {
                return;
            }
            this.settings.albumHistoryMaxLength = this.albumHistoryMaxLength;
            this.settings.albumHistoryDisplayLength = this.albumHistoryDisplayLength;
            this.settings.searchHistoryMaxLength = this.searchHistoryMaxLength;
            this.settings.searchHistoryDisplayLength = this.searchHistoryDisplayLength;
        });
    }

    numberOnly(event): boolean {
        return !(!event.code.includes('Digit') && !event.code.includes('Numpad'));
    }

}
