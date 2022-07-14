import { Image } from '../common/image';

export class ArtistFollowers {
    href: string;
    total: number;
}

export class Artist {
    id: string;
    name: string;
    type: string;
    genres: string[];
    followers: ArtistFollowers;
    href: string;
    popularity: number;
    images: Image[];
}
