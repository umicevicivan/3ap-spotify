import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists.component';
import { ArtistComponent } from './artist/artist.component';
import { ArtistResolver } from '../core/resolvers/artist.resolver.service';

const routes: Routes = [
    {path: '', component: ArtistsComponent},
    {path: ':id', component: ArtistComponent, resolve: {artist: ArtistResolver}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArtistsRoutingModule {
}
