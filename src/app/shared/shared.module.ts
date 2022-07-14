import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { GenresPipe } from './pipes/genres.pipe';
import { ArtistsPipe } from './pipes/artists.pipe';
import { AlbumsTableComponent } from './components/albums-table/albums-table.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        //bootstrap
        NgbTypeaheadModule
    ],
    declarations: [
        SearchComponent,
        GenresPipe,
        ArtistsPipe,
        AlbumsTableComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SearchComponent,
        GenresPipe,
        ArtistsPipe,
        AlbumsTableComponent,
        NgbTypeaheadModule
    ]
})
export class SharedModule {
}
