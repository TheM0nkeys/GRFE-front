import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {BaseComponent} from './components/base/base.component';
import {MenuNavegacaoComponent} from './components/conteudoComplementar/menu-navegacao/menu-navegacao.component';
export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'base', component: BaseComponent, children[
  ]}
];
