import { NgModule } from '@angular/core';
import { AlbumsComponent } from './albums.component';
import { AlbumComponent } from './album/album.component';
import { SharedModule } from '../shared/shared.module';
import { AlbumsRoutingModule } from './albums-routing.module';

@NgModule({
    declarations: [
        AlbumsComponent,
        AlbumComponent
    ],
    imports: [
        SharedModule,
        AlbumsRoutingModule
    ]
})
export class AlbumsModule {
}
