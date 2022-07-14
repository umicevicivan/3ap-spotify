import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums.component';
import { AlbumComponent } from './album/album.component';
import { AlbumResolver } from '../core/resolvers/album.resolver';

const routes: Routes = [
    {path: '', component: AlbumsComponent},
    {path: ':id', component: AlbumComponent, resolve: {album: AlbumResolver}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlbumsRoutingModule {
}
