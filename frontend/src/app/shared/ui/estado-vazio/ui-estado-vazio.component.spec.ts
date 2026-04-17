import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiEstadoVazioComponent } from './ui-estado-vazio.component';

describe('UiEstadoVazioComponent', () => {
  let fixture: ComponentFixture<UiEstadoVazioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiEstadoVazioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiEstadoVazioComponent);
    fixture.componentRef.setInput('titulo', 'Nenhum registro encontrado');
    fixture.componentRef.setInput('descricao', 'Cadastre um item para começar.');
    fixture.detectChanges();
  });

  it('renderiza título e descrição informados', () => {
    const conteudo = fixture.nativeElement.textContent;

    expect(conteudo).toContain('Nenhum registro encontrado');
    expect(conteudo).toContain('Cadastre um item para começar.');
  });
});
