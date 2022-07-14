import { Pipe, PipeTransform } from '@angular/core';
import { Artist } from '../../core/api/core/artists/artist';

@Pipe({
    name: 'artists'
})
export class ArtistsPipe implements PipeTransform {

    transform(artists: Artist[]): string {
        if (!artists || artists.length === 0) {
            return '';
        }
        const str: string[] = [];
        artists.forEach(artist => {
            str.push(artist.name.charAt(0).toUpperCase() + artist.name.slice(1));
        })
        return str.join(', ');
    }
}
