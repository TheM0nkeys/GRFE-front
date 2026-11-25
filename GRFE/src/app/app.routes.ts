import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastrosComponent } from './components/cadastros/cadastros.component';
import { MenuNavegacaoComponent } from './components/conteudoComplementar/menu-navegacao/menu-navegacao.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChamadoListComponent } from './components/chamados/chamado-list/chamado-list.component';
import { ChamadoDetailComponent } from './components/chamados/chamado-detail/chamado-detail.component';
import { RelatorioDashboardComponent } from './components/relatorios/relatorio-dashboard/relatorio-dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EscalaComumComponent } from './components/escalas/escala-comum/escala-comum.component';
import { adminGuard, authGuard } from './service/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'navbar',
    component: MenuNavegacaoComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'chamados', component: ChamadoListComponent },
      { path: 'chamados/:id', component: ChamadoDetailComponent },
      { path: 'relatorios', component: RelatorioDashboardComponent },
      {
        path: 'admin/manipular',
        component: CadastrosComponent,
        canActivate: [adminGuard],
        data: { modoEdicao: true }
      },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'admin', component: CadastrosComponent },
      { path: 'escalas', component: EscalaComumComponent }
    ]
  },
  { path: 'cadastro', component: CadastrosComponent },
  { path: '**', redirectTo: 'login' }
];
