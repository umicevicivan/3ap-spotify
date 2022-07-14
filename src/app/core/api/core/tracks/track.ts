import { Artist } from '../artists/artist';
import { Album } from '../albums/album';

export class Track {
    id: string;
    album: Album;
    artists: Artist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    name: string;
    popularity: number;
    track_number: number;
    type: string;
}
