import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Usuario } from '../../../core/modelos/usuario.model';
import { UsuariosFacade } from '../servicos/usuarios.facade';
import { PaginaUsuariosComponent } from './pagina-usuarios.component';

describe('PaginaUsuariosComponent', () => {
  let fixture: ComponentFixture<PaginaUsuariosComponent>;
  let usuariosFacade: jasmine.SpyObj<UsuariosFacade>;
  let mensagemErroExclusaoSignal = signal<string | null>(null);

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

  async function criarComponente(usuariosState: Usuario[] = usuarios): Promise<void> {
    usuariosFacade = jasmine.createSpyObj<UsuariosFacade>('UsuariosFacade', [
      'carregar',
      'salvar',
      'excluir',
      'limparErroPrincipal',
      'limparErroExclusao',
    ]);
    mensagemErroExclusaoSignal = signal<string | null>(null);
    Object.defineProperties(usuariosFacade, {
      usuarios: { value: signal(usuariosState) },
      carregando: { value: signal(false) },
      salvando: { value: signal(false) },
      excluindo: { value: signal(false) },
      mensagemErro: { value: signal<string | null>(null) },
      mensagemErroExclusao: { value: mensagemErroExclusaoSignal },
    });

    TestBed.resetTestingModule();
    TestBed.overrideComponent(PaginaUsuariosComponent, {
      set: {
        providers: [{ provide: UsuariosFacade, useValue: usuariosFacade }],
      },
    });

    await TestBed.configureTestingModule({
      imports: [PaginaUsuariosComponent],
      providers: [{ provide: UsuariosFacade, useValue: usuariosFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaUsuariosComponent);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await criarComponente();
  });

  it('renderiza a listagem inicial de usuários', () => {
    const linhas = fixture.nativeElement.querySelectorAll('.linha');
    const conteudo = fixture.nativeElement.textContent;

    expect(usuariosFacade.carregar).toHaveBeenCalled();
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

    const drawer = fixture.nativeElement.querySelector('.ui-drawer') as HTMLElement;

    expect(drawer).not.toBeNull();
    expect(drawer.getAttribute('role')).toBe('dialog');
    expect(drawer.getAttribute('aria-label')).toBe('Formulário de usuário');
    expect(fixture.nativeElement.textContent).toContain('Novo usuário');
  });

  it('mantém o modal aberto e exibe a mensagem da API quando a exclusão falha', () => {
    const botoesExcluir = Array.from(
      fixture.nativeElement.querySelectorAll('.ui-botao--texto-alerta')
    ) as HTMLButtonElement[];

    botoesExcluir[0].click();
    fixture.detectChanges();

    const botoesModal = Array.from(
      fixture.nativeElement.querySelectorAll('.modal .ui-botao')
    ) as HTMLButtonElement[];
    const botaoConfirmar = botoesModal.find((botao: HTMLButtonElement) =>
      botao.textContent?.includes('Confirmar exclusão')
    ) as HTMLButtonElement;

    mensagemErroExclusaoSignal.set('Não é permitido excluir o usuário autenticado.');
    botaoConfirmar.click();
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('.ui-modal') as HTMLElement;

    expect(usuariosFacade.excluir).toHaveBeenCalledWith(1, jasmine.any(Function));
    expect(modal).not.toBeNull();
    expect(modal.getAttribute('role')).toBe('dialog');
    expect(modal.getAttribute('aria-label')).toBe('Confirmação de exclusão de usuário');
    expect(modal.textContent).toContain('Não é permitido excluir o usuário autenticado.');
  });

  it('fecha o modal quando a exclusão é concluída com sucesso', () => {
    usuariosFacade.excluir.and.callFake((_usuarioId: number, onSuccess?: () => void) => {
      onSuccess?.();
    });

    const botoesExcluir = Array.from(
      fixture.nativeElement.querySelectorAll('.ui-botao--texto-alerta')
    ) as HTMLButtonElement[];

    botoesExcluir[1].click();
    fixture.detectChanges();

    const botoesModal = Array.from(
      fixture.nativeElement.querySelectorAll('.modal .ui-botao')
    ) as HTMLButtonElement[];
    const botaoConfirmar = botoesModal.find((botao: HTMLButtonElement) =>
      botao.textContent?.includes('Confirmar exclusão')
    ) as HTMLButtonElement;

    botaoConfirmar.click();
    fixture.detectChanges();

    expect(usuariosFacade.excluir).toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.ui-modal')).toBeNull();
  });

  it('exibe estado vazio quando não existem usuários para listar', async () => {
    await criarComponente([]);

    const estadoVazio = fixture.nativeElement.querySelector('app-ui-estado-vazio');

    expect(estadoVazio).not.toBeNull();
    expect(estadoVazio.textContent).toContain('Nenhum usuário encontrado');
  });
});
