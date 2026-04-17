import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PainelInicial } from '../../../core/modelos/painel-inicial.model';
import { UiCardComponent } from '../../../shared/ui/card/ui-card.component';

@Component({
  selector: 'app-indicadores-painel',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './indicadores-painel.component.html',
  styleUrl: './indicadores-painel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicadoresPainelComponent {
  readonly indicadores = input.required<PainelInicial['indicadores']>();
}
