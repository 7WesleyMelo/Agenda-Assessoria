import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-pagina-placeholder',
  standalone: true,
  template: `
    <section class="placeholder">
      <p class="placeholder__legenda">Módulo em estruturação</p>
      <h2>{{ titulo() }}</h2>
      <p>{{ descricao() }}</p>
    </section>
  `,
  styles: `
    .placeholder {
      padding: 1.75rem;
      border: 1px solid var(--cor-borda);
      border-radius: 24px;
      background: rgba(255, 252, 247, 0.78);
      box-shadow: var(--sombra-card);
    }

    .placeholder__legenda {
      margin: 0;
      color: var(--cor-secundaria);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.76rem;
      font-weight: 800;
    }

    h2 {
      margin: 0.5rem 0 0;
    }

    p:last-child {
      margin: 0.75rem 0 0;
      color: var(--cor-texto-suave);
      line-height: 1.7;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaPlaceholderComponent {
  readonly titulo = input.required<string>();
  readonly descricao = input.required<string>();
}
