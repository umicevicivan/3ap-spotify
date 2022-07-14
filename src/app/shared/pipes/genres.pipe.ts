import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genres'
})
export class GenresPipe implements PipeTransform {

    transform(genres: string[]): string {
        if (!genres || genres.length === 0) {
            return '/';
        }
        const str: string[] = [];
        genres.forEach(genre => {
            str.push(genre.charAt(0).toUpperCase() + genre.slice(1));
        })
        return str.join(', ');
    }

}
