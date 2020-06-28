import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'people',
        children:[{
          path:'',
          loadChildren: () => import('../people/people.module').then( m => m.PeoplePageModule)
        }],
      },
      {
        path: 'planets',
        children:[
        {
          path:'',
          loadChildren: () => import('../planets/planets.module').then( m => m.PlanetsPageModule)  
        },
        {
          path: ':id',
          loadChildren: () => import('../palnet-details/palnet-details.module').then( m => m.PalnetDetailsPageModule)
        }]
      },
      {
        path: 'films',
        children:[
          {
            path:'',
            loadChildren: () => import('../films/films.module').then( m => m.FilmsPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../film-details/film-details.module').then( m => m.FilmDetailsPageModule)
          },
        ]
      },
      {
        path:'',
        children:[
          {
            path: 'developers',
            loadChildren: () => import('../developers/developers.module').then( m => m.DevelopersPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../developer/developer.module').then( m => m.DeveloperPageModule)
          }
        ]
      }
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/films',
    pathMatch:'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
