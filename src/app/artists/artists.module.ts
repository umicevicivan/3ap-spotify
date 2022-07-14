import { NgModule } from '@angular/core';
import { ArtistsComponent } from './artists.component';
import { SharedModule } from '../shared/shared.module';
import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistComponent } from './artist/artist.component';

@NgModule({
    declarations: [
        ArtistsComponent,
        ArtistComponent
    ],
    imports: [
        SharedModule,
        ArtistsRoutingModule
    ]
})
export class ArtistsModule {
}
