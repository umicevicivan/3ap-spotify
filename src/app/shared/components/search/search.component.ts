import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SearchFilter, SearchService } from '../../../core/api/core/search/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../../../core/util/settings.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    filter: SearchFilter = new SearchFilter();
    searchForm: FormGroup;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    @Input() type;
    @Input() placeholder;
    @Output() results = new EventEmitter<any[]>();
    @ViewChild('searchInput', {static: true}) searchInput: NgbTypeahead;

    searchHistory: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.searchInput.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => {
                    return (this.type !== 'artist') ? [] : (term === '' ? this.settingsService.searchHistory :
                        this.settingsService.searchHistory
                            .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, this.settingsService.searchHistoryDisplayLength)
                }
            )
        );
    }

    constructor(private searchService: SearchService, fb: FormBuilder, private settingsService: SettingsService) {
        this.searchForm = fb.group({
            search: fb.control(null)
        })
    }

    search(): void {
        const query = this.searchForm.get('search')?.value;
        this.filter.query = query;
        this.filter.type = this.type;
        this.searchService.find(this.filter).subscribe(data => {
            this.results.emit(data[this.type + 's'].items)
        })
        if (this.type === 'artist') {
            this.settingsService.searchHistory = [query];
        }
    }
}
