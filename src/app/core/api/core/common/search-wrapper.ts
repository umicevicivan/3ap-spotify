import { SearchItem } from './search-component';
import { Artist } from '../artists/artist';
import { Album } from '../albums/album';
import { Track } from '../tracks/track';

export class SearchWrapper {
    artists: SearchItem<Artist>[];
    albums: SearchItem<Album>[];
    tracks: SearchItem<Track>[];
}
