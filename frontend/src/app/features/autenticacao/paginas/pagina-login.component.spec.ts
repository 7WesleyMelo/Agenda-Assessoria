import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SessaoService } from '../../../core/autenticacao/estado/sessao.service';
import { RespostaLogin } from '../../../core/modelos/autenticacao.model';
import { AutenticacaoApiService } from '../servicos/autenticacao-api.service';
import { PaginaLoginComponent } from './pagina-login.component';

describe('PaginaLoginComponent', () => {
  let fixture: ComponentFixture<PaginaLoginComponent>;
  let component: PaginaLoginComponent;
  let autenticacaoApiService: jasmine.SpyObj<AutenticacaoApiService>;
  let sessaoService: jasmine.SpyObj<SessaoService>;
  let router: jasmine.SpyObj<Router>;

  const respostaLogin: RespostaLogin = {
    access_token: 'token-jwt',
    token_type: 'Bearer',
    expires_in: 3600,
    usuario: {
      id: 1,
      nome: 'Administrador ERP',
      email: 'admin@agendaassessoria.com.br',
      cargo: 'Administrador',
      ativo: true,
    },
  };

  beforeEach(async () => {
    autenticacaoApiService = jasmine.createSpyObj<AutenticacaoApiService>('AutenticacaoApiService', [
      'autenticar',
    ]);
    sessaoService = jasmine.createSpyObj<SessaoService>('SessaoService', ['iniciarSessao']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    router.navigate.and.resolveTo(true);

    await TestBed.configureTestingModule({
      imports: [PaginaLoginComponent],
      providers: [
        { provide: AutenticacaoApiService, useValue: autenticacaoApiService },
        { provide: SessaoService, useValue: sessaoService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaLoginComponent);
    component = fixture.componentInstance;
  });

  it('autentica o usuário e navega para o ERP', async () => {
    autenticacaoApiService.autenticar.and.returnValue(of(respostaLogin));

    fixture.detectChanges();
    component['formulario'].setValue({
      email: 'admin@agendaassessoria.com.br',
      password: '123456',
    });

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(autenticacaoApiService.autenticar).toHaveBeenCalledWith({
      email: 'admin@agendaassessoria.com.br',
      password: '123456',
    });
    expect(sessaoService.iniciarSessao).toHaveBeenCalledWith(respostaLogin);
    expect(router.navigate).toHaveBeenCalledWith(['/erp']);
  });

  it('exibe a mensagem retornada pela API quando o login falha', () => {
    autenticacaoApiService.autenticar.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            error: { message: 'Credenciais inválidas.' },
          })
      )
    );

    fixture.detectChanges();
    component['formulario'].setValue({
      email: 'admin@agendaassessoria.com.br',
      password: 'senha-incorreta',
    });

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const erro = fixture.nativeElement.querySelector('.erro');

    expect(erro?.textContent).toContain('Credenciais inválidas.');
  });
});
