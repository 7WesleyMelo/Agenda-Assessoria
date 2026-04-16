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
      position: relative;
      overflow: hidden;
      padding: 2rem;
      border: 1px solid var(--cor-borda);
      border-radius: var(--raio-lg);
      background: linear-gradient(180deg, rgba(255, 253, 249, 0.95), rgba(249, 244, 236, 0.8));
      box-shadow: var(--sombra-card);
    }

    .placeholder::after {
      content: '';
      position: absolute;
      inset: auto -2rem -2rem auto;
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(27, 106, 97, 0.16), transparent 68%);
    }

    .placeholder__legenda {
      margin: 0;
      color: var(--cor-secundaria);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.72rem;
      font-weight: 800;
    }

    h2 {
      position: relative;
      margin: 0.65rem 0 0;
      font-size: clamp(1.8rem, 3vw, 2.35rem);
      z-index: 1;
    }

    p:last-child {
      position: relative;
      max-width: 42rem;
      margin: 0.85rem 0 0;
      color: var(--cor-texto-suave);
      z-index: 1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaPlaceholderComponent {
  readonly titulo = input.required<string>();
  readonly descricao = input.required<string>();
}
