import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Album } from '../api/core/albums/album';

@Injectable({
    providedIn: 'root'
})
export class SettingsService implements OnDestroy {

    private readonly MUSIC_BOX_ALBUM_HISTORY = 'MUSIC_BOX_ALBUM_HISTORY';
    private readonly MUSIC_BOX_ALBUM_HISTORY_MAX_LENGTH = 'MUSIC_BOX_ALBUM_HISTORY_MAX_LENGTH';
    private readonly MUSIC_BOX_ALBUM_HISTORY_DISPLAY_LENGTH = 'MUSIC_BOX_ALBUM_HISTORY_DISPLAY_LENGTH';
    private readonly MUSIC_BOX_SEARCH_HISTORY = 'MUSIC_BOX_SEARCH_HISTORY';
    private readonly MUSIC_BOX_SEARCH_HISTORY_MAX_LENGTH = 'MUSIC_BOX_SEARCH_HISTORY_MAX_LENGTH';
    private readonly MUSIC_BOX_SEARCH_HISTORY_DISPLAY_LENGTH = 'MUSIC_BOX_SEARCH_HISTORY_DISPLAY_LENGTH';

    public readonly MUSIC_BOX_ALBUM_HISTORY_MAX_LENGTH_DEFAULT_VALUE = 20;
    public readonly MUSIC_BOX_ALBUM_HISTORY_DISPLAY_LENGTH_DEFAULT_VALUE = 20;
    public readonly MUSIC_BOX_SEARCH_HISTORY_MAX_LENGTH_DEFAULT_VALUE = 10;
    public readonly MUSIC_BOX_SEARCH_HISTORY_DISPLAY_LENGTH_DEFAULT_VALUE = 10;

    private albumHistoryValue: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
    private albumHistoryMaxLengthValue: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    private albumHistoryDisplayLengthValue: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    private searchHistoryValue: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    private searchHistoryMaxLengthValue: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    private searchHistoryDisplayLengthValue: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    private static put(key: string, value: string): void {
        if (value === null) {
            return;
        }
        localStorage.setItem(key, value);
    }

    private static get(key: string): string | null {
        return localStorage.getItem(key) || null;
    }

    get albumHistory(): Album[] {
        return this.albumHistoryValue.getValue();
    }

    set albumHistory(albums: Album[]) {
        let temp = SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY) ?
            JSON.parse(SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY) || '') : [];
        albums.forEach(album => {
            const index = temp.findIndex(e => e.id === album.id);
            if (index > -1) {
                temp.splice(index, 1);
            }
            temp.unshift(album);
        })
        temp = temp.slice(0, +SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY_MAX_LENGTH))
        this.albumHistoryValue.next(temp);
        SettingsService.put(this.MUSIC_BOX_ALBUM_HISTORY, JSON.stringify(temp));
    }

    get albumHistoryMaxLength(): number {
        return this.albumHistoryMaxLengthValue.getValue();
    }

    set albumHistoryMaxLength(maxLength: number) {
        this.albumHistoryMaxLengthValue.next(maxLength);
        SettingsService.put(this.MUSIC_BOX_ALBUM_HISTORY_MAX_LENGTH, `${maxLength}`);
        let temp = SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY) ?
            JSON.parse(SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY) || '') : [];
        temp = temp.slice(0, maxLength);
        this.albumHistoryValue.next(temp);
        SettingsService.put(this.MUSIC_BOX_ALBUM_HISTORY, JSON.stringify(temp));
    }

    get albumHistoryDisplayLength(): number {
        return this.albumHistoryDisplayLengthValue.getValue();
    }

    set albumHistoryDisplayLength(displayLength: number) {
        this.albumHistoryDisplayLengthValue.next(displayLength);
        SettingsService.put(this.MUSIC_BOX_ALBUM_HISTORY_DISPLAY_LENGTH, `${displayLength}`);
    }

    get searchHistory(): string[] {
        return this.searchHistoryValue.getValue();
    }

    set searchHistory(searches: string[]) {
        let temp = SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY) ?
            JSON.parse(SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY) || '') : [];
        searches.forEach(search => {
            const index = temp.findIndex(e => e === search);
            if (index > -1) {
                temp.splice(index, 1);
            }
            temp.unshift(search);
        })
        temp = temp.slice(0, +SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY_MAX_LENGTH))
        this.searchHistoryValue.next(temp);
        SettingsService.put(this.MUSIC_BOX_SEARCH_HISTORY, JSON.stringify(temp));
    }

    get searchHistoryMaxLength(): number {
        return this.searchHistoryMaxLengthValue.getValue();
    }

    set searchHistoryMaxLength(maxLength: number) {
        this.searchHistoryMaxLengthValue.next(maxLength);
        SettingsService.put(this.MUSIC_BOX_SEARCH_HISTORY_MAX_LENGTH, `${maxLength}`);
        let temp = SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY) ?
            JSON.parse(SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY) || '') : [];
        temp = temp.slice(0, maxLength);
        this.searchHistoryValue.next(temp);
        SettingsService.put(this.MUSIC_BOX_SEARCH_HISTORY, JSON.stringify(temp));
    }

    get searchHistoryDisplayLength(): number {
        return this.searchHistoryDisplayLengthValue.getValue();
    }

    set searchHistoryDisplayLength(displayLength: number) {
        this.searchHistoryDisplayLengthValue.next(displayLength);
        SettingsService.put(this.MUSIC_BOX_SEARCH_HISTORY_DISPLAY_LENGTH, `${displayLength}`);
    }

    constructor() {
        this.albumHistoryMaxLength = +SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY_MAX_LENGTH) || this.MUSIC_BOX_ALBUM_HISTORY_MAX_LENGTH_DEFAULT_VALUE;
        this.albumHistoryDisplayLength = +SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY_DISPLAY_LENGTH) || this.MUSIC_BOX_ALBUM_HISTORY_DISPLAY_LENGTH_DEFAULT_VALUE;
        this.albumHistory = SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY) ?
            JSON.parse(SettingsService.get(this.MUSIC_BOX_ALBUM_HISTORY) || '') : [];

        this.searchHistoryMaxLength = +SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY_MAX_LENGTH) || this.MUSIC_BOX_SEARCH_HISTORY_MAX_LENGTH_DEFAULT_VALUE;
        this.searchHistoryDisplayLength = +SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY_DISPLAY_LENGTH) || this.MUSIC_BOX_SEARCH_HISTORY_DISPLAY_LENGTH_DEFAULT_VALUE;
        this.searchHistory = SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY) ?
            JSON.parse(SettingsService.get(this.MUSIC_BOX_SEARCH_HISTORY) || '') : [];
    }

    ngOnDestroy(): void {
        this.albumHistoryValue.complete();
        this.albumHistoryMaxLengthValue.complete();
        this.albumHistoryDisplayLengthValue.complete();
        this.searchHistoryValue.complete();
        this.searchHistoryMaxLengthValue.complete();
        this.searchHistoryDisplayLengthValue.complete();
    }
}
