import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { LoginComponent } from './shared/layout/login/login.component';
import { SearchNavComponent } from './search/search-nav.component';
import { HttpApiService } from './shared/service/http-api.service';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { StateManagmentService } from './shared/service/state-managment.service';
import { HttpModule } from '@angular/http';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { PalComponent } from './search/pal/pal.component';
import { TemplateComponent } from './search/template/template.component';
import { TagsComponent } from './search/tags/tags.component';
import { NotFoundComponent } from './shared/layout/not-found/not-found.component';
import { AppErrorHandler } from './shared/service/handle-errors/app-error-handler';
import { ErrorPageComponent } from './shared/layout/not-found/error-page.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'create', component: CreateComponent, canActivate: [AuthGuardService] },
    { path: 'search', component: SearchNavComponent, canActivate: [AuthGuardService], children: [
      { path: 'pal', component: PalComponent, canActivate: [AuthGuardService] },
      { path: 'template', component: TemplateComponent, canActivate: [AuthGuardService] },
      { path: 'tags', component: TagsComponent, canActivate: [AuthGuardService] },
      { path: '', component: PalComponent, pathMatch: 'full' },
    ]},
    { path: 'update', component: UpdateComponent, canActivate: [AuthGuardService] },
    { path: 'error-page', component: ErrorPageComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
  declarations: 
  [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SearchNavComponent,
    CreateComponent,
    UpdateComponent,
    PalComponent,
    TemplateComponent,
    TagsComponent,
    NotFoundComponent,
    ErrorPageComponent
  ],

  imports: 
  [
    BrowserModule
    ,HttpModule
    ,FormsModule
    ,RouterModule.forRoot(appRoutes)
  ],

  providers: 
  [
    HttpApiService
    ,AuthGuardService
    ,StateManagmentService
    ,{
      provide: ErrorHandler, 
      useClass: AppErrorHandler
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
