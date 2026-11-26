import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ficha',
    pathMatch: 'full'
  },
  {
    path: 'folder/:folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'ficha',
    loadChildren: () => import('./pages/ficha/ficha.module').then( m => m.FichaPageModule)
  },
  {
    path: 'livro',
    loadChildren: () => import('./pages/livro/livro.module').then( m => m.LivroPageModule)
  },
  {
    path: 'grafos',
    loadChildren: () => import('./pages/grafos/grafos.module').then( m => m.GrafosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, bindToComponentInputs: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
