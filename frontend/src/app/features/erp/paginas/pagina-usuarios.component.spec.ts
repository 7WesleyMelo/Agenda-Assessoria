import { HttpErrorResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';
import { Usuario } from '../../../core/modelos/usuario.model';
import { UsuariosApiService } from '../servicos/usuarios-api.service';
import { PaginaUsuariosComponent } from './pagina-usuarios.component';

describe('PaginaUsuariosComponent', () => {
  let fixture: ComponentFixture<PaginaUsuariosComponent>;
  let usuariosApiService: jasmine.SpyObj<UsuariosApiService>;

  const usuarioAutenticado: Usuario = {
    id: 1,
    nome: 'Administrador ERP',
    email: 'admin@agendaassessoria.com.br',
    cargo: 'Administrador',
    ativo: true,
  };

  const usuarios: Usuario[] = [
    usuarioAutenticado,
    {
      id: 2,
      nome: 'Maria Operadora',
      email: 'maria@agendaassessoria.com.br',
      cargo: 'Operador',
      ativo: true,
    },
  ];

  beforeEach(async () => {
    usuariosApiService = jasmine.createSpyObj<UsuariosApiService>('UsuariosApiService', [
      'listar',
      'criar',
      'atualizar',
      'excluir',
    ]);
    usuariosApiService.listar.and.returnValue(of(usuarios));

    await TestBed.configureTestingModule({
      imports: [PaginaUsuariosComponent],
      providers: [
        { provide: UsuariosApiService, useValue: usuariosApiService },
        {
          provide: SessaoService,
          useValue: {
            usuario: signal(usuarioAutenticado),
            definirUsuario: jasmine.createSpy('definirUsuario'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaUsuariosComponent);
    fixture.detectChanges();
  });

  it('renderiza a listagem inicial de usuários', () => {
    const linhas = fixture.nativeElement.querySelectorAll('.linha');
    const conteudo = fixture.nativeElement.textContent;

    expect(usuariosApiService.listar).toHaveBeenCalled();
    expect(linhas.length).toBe(2);
    expect(conteudo).toContain('Administrador ERP');
    expect(conteudo).toContain('Maria Operadora');
  });

  it('abre o drawer ao iniciar um novo cadastro', () => {
    const botoes = Array.from(
      fixture.nativeElement.querySelectorAll('button')
    ) as HTMLButtonElement[];
    const botaoNovoUsuario = botoes.find((botao: HTMLButtonElement) =>
      botao.textContent?.includes('Novo usuário')
    ) as HTMLButtonElement;

    botaoNovoUsuario.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.drawer')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Novo usuário');
  });

  it('mantém o modal aberto e exibe a mensagem da API quando a exclusão falha', () => {
    usuariosApiService.excluir.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 422,
            error: {
              errors: {
                usuario: ['Não é permitido excluir o usuário autenticado.'],
              },
            },
          })
      )
    );

    const botoesExcluir = Array.from(
      fixture.nativeElement.querySelectorAll('.botao--texto-alerta')
    ) as HTMLButtonElement[];

    botoesExcluir[0].click();
    fixture.detectChanges();

    const botoesModal = Array.from(
      fixture.nativeElement.querySelectorAll('.modal .botao')
    ) as HTMLButtonElement[];
    const botaoConfirmar = botoesModal.find((botao: HTMLButtonElement) =>
      botao.textContent?.includes('Confirmar exclusão')
    ) as HTMLButtonElement;

    botaoConfirmar.click();
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('.modal');

    expect(usuariosApiService.excluir).toHaveBeenCalledWith(1);
    expect(modal).not.toBeNull();
    expect(modal.textContent).toContain('Não é permitido excluir o usuário autenticado.');
  });
});
