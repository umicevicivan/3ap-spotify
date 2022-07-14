import { Artist } from '../artists/artist';
import { Image } from '../common/image';

export class Album {
    id: string;
    artists: Artist[];
    images: Image[];
    name: string;
    release_date: string;
    total_tracks: number;
    type: string;
}
