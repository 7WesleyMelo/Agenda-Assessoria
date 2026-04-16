import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PainelInicial } from '../../../core/modelos/painel-inicial.model';

@Component({
  selector: 'app-listas-contexto-painel',
  standalone: true,
  templateUrl: './listas-contexto-painel.component.html',
  styleUrl: './listas-contexto-painel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListasContextoPainelComponent {
  readonly menuPrincipal = input.required<PainelInicial['menu_principal']>();
  readonly atalhos = input.required<PainelInicial['atalhos']>();
}
