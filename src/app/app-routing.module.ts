import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: '/admission/login', pathMatch: 'full'},
    {
        path: 'admission',
        loadChildren: () => import('./admission/admission.module').then(m => m.AdmissionModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'artists',
        loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'albums',
        loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
    },
    {path: '**', redirectTo: '/admission', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
