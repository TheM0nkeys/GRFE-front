import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ApiError } from '../../models/api-error';
import { Departamento, DepartamentoRequest } from '../../models/departamento';
import { Divisao } from '../../models/divisao';
import { Especialidade, EspecialidadeRequest } from '../../models/especialidade';
import { Escala, EscalaRequest } from '../../models/Escala';
import { Funcionario } from '../../models/funcionario';
import { CadastroService } from '../../service/cadastro-service.service';
import { EscalaService } from '../../service/escala.service';
import { FuncionarioService } from '../../service/funcionario.service';
import { AuthService } from '../../service/auth.service';
import { EscolhaDropdownComponent } from '../conteudoComplementar/escolha-dropdown/escolha-dropdown.component';

type AbaCadastro = 'divisoes' | 'departamentos' | 'especialidades' | 'escalas';
type OpcaoCadastro = Divisao | Departamento | Especialidade;
type RegistroCadastro = OpcaoCadastro | Escala;

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, EscolhaDropdownComponent],
  templateUrl: './cadastros.component.html',
  styleUrl: './cadastros.component.scss'
})
export class CadastrosComponent implements OnInit {
  aba: AbaCadastro = 'divisoes';
  carregando = false;
  erro = '';
  podeManipular = false;
  readonly ehAdmin: boolean;
  editandoId: number | null = null;
  divisoes: Divisao[] = [];
  departamentos: Departamento[] = [];
  especialidades: Especialidade[] = [];
  escalas: Escala[] = [];
  funcionarios: Funcionario[] = [];
  nome = '';
  descricao = '';
  divisaoId: number | null = null;
  departamentoId: number | null = null;
  escala: EscalaRequest = {
    dataHoraInicio: '',
    dataHoraFim: '',
    especialidadeId: 0,
    funcionarioId: 0
  };

  constructor(
    private readonly cadastroService: CadastroService,
    private readonly escalaService: EscalaService,
    private readonly funcionarioService: FuncionarioService,
    private readonly route: ActivatedRoute,
    authService: AuthService
  ) {
    this.ehAdmin = authService.ehAdmin();
  }

  ngOnInit(): void {
    this.route.data.subscribe((dados) => {
      this.podeManipular = dados['modoEdicao'] === true && this.ehAdmin;
    });
    this.carregarTudo();
  }

  carregarTudo(): void {
    this.carregando = true;
    this.erro = '';
    forkJoin({
      divisoes: this.cadastroService.listarDivisoes(),
      departamentos: this.cadastroService.listarDepartamentos(),
      especialidades: this.cadastroService.listarEspecialidades(),
      escalas: this.escalaService.listar(),
      funcionarios: this.funcionarioService.listar()
    }).subscribe({
      next: (dados) => {
        this.divisoes = dados.divisoes;
        this.departamentos = dados.departamentos;
        this.especialidades = dados.especialidades;
        this.escalas = dados.escalas;
        this.funcionarios = dados.funcionarios;
        this.carregando = false;
      },
      error: (error: HttpErrorResponse) => this.mostrarErro(error)
    });
  }

  salvar(): void {
    this.erro = '';
    if (!this.podeManipular) {
      this.erro = 'Seu perfil não pode manipular estes cadastros.';
      return;
    }

    if (this.aba === 'escalas') {
      const operacao = this.editandoId === null
        ? this.escalaService.criar(this.escala)
        : this.escalaService.atualizar(this.editandoId, this.escala);
      this.executarCrud(operacao);
      return;
    }

    if (this.aba === 'divisoes') {
      const dados = { nome: this.nome };
      const operacao = this.editandoId === null
        ? this.cadastroService.criarDivisao(dados)
        : this.cadastroService.atualizarDivisao(this.editandoId, dados);
      this.executarCrud(operacao);
      return;
    }

    if (this.aba === 'departamentos') {
      const dados: DepartamentoRequest = {
        nome: this.nome,
        divisaoId: this.divisaoId ?? 0
      };
      const operacao = this.editandoId === null
        ? this.cadastroService.criarDepartamento(dados)
        : this.cadastroService.atualizarDepartamento(this.editandoId, dados);
      this.executarCrud(operacao);
      return;
    }

    const dados: EspecialidadeRequest = {
      nome: this.nome,
      descricao: this.descricao,
      divisaoId: this.divisaoId ?? 0,
      departamentoId: this.departamentoId ?? 0
    };
    const operacao = this.editandoId === null
      ? this.cadastroService.criarEspecialidade(dados)
      : this.cadastroService.atualizarEspecialidade(this.editandoId, dados);
    this.executarCrud(operacao);
  }

  editar(item: RegistroCadastro): void {
    this.editandoId = item.id;
    if ('dataHoraInicio' in item) {
      this.aba = 'escalas';
      this.escala = {
        dataHoraInicio: item.dataHoraInicio.slice(0, 16),
        dataHoraFim: item.dataHoraFim.slice(0, 16),
        especialidadeId: item.especialidadeId,
        funcionarioId: item.funcionarioId
      };
      return;
    }

    this.nome = item.nome;
    if ('departamentoId' in item) {
      this.aba = 'especialidades';
      this.descricao = item.descricao ?? '';
      this.divisaoId = item.divisaoId;
      this.departamentoId = item.departamentoId;
      return;
    }

    if ('divisaoId' in item) {
      this.aba = 'departamentos';
      this.divisaoId = item.divisaoId;
    } else {
      this.aba = 'divisoes';
    }
  }

  excluir(item: RegistroCadastro): void {
    if (!this.podeManipular) {
      this.erro = 'Somente administradores podem excluir registros.';
      return;
    }

    const operacao = 'dataHoraInicio' in item
      ? this.escalaService.excluir(item.id)
      : this.aba === 'divisoes'
        ? this.cadastroService.excluirDivisao(item.id)
        : this.aba === 'departamentos'
          ? this.cadastroService.excluirDepartamento(item.id)
          : this.cadastroService.excluirEspecialidade(item.id);
    this.executarCrud(operacao);
  }

  trocarAba(aba: AbaCadastro): void {
    this.aba = aba;
    this.cancelar();
  }

  cancelar(): void {
    this.editandoId = null;
    this.nome = '';
    this.descricao = '';
    this.divisaoId = null;
    this.departamentoId = null;
    this.escala = {
      dataHoraInicio: '',
      dataHoraFim: '',
      especialidadeId: 0,
      funcionarioId: 0
    };
  }

  private executarCrud(operacao: Observable<unknown>): void {
    operacao.subscribe({
      next: () => {
        this.cancelar();
        this.carregarTudo();
      },
      error: (error: HttpErrorResponse) => this.mostrarErro(error)
    });
  }

  private mostrarErro(error: HttpErrorResponse): void {
    this.carregando = false;
    const apiError = error.error as Partial<ApiError> | null;
    this.erro = apiError?.mensagem ?? error.message;
  }
}
