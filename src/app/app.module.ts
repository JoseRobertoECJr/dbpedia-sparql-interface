import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ConexoesComponent } from './pages/conexoes/conexoes.component';
import { InfosComponent } from './pages/infos/infos.component';
import { MainComponent } from './pages/main/main.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: MainComponent
  },  
  {
      path: 'conexoes',
      component: ConexoesComponent
  },
  {
    path: 'infos',
    component: InfosComponent
}
  ];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InfosComponent,
    ConexoesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
