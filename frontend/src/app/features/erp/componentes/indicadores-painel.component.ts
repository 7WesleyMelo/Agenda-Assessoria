import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PainelInicial } from '../../../core/modelos/painel-inicial.model';

@Component({
  selector: 'app-indicadores-painel',
  standalone: true,
  templateUrl: './indicadores-painel.component.html',
  styleUrl: './indicadores-painel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicadoresPainelComponent {
  readonly indicadores = input.required<PainelInicial['indicadores']>();
}
