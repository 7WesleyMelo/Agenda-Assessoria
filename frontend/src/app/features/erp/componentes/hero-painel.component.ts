import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UiCardComponent } from '../../../shared/ui/card/ui-card.component';

interface ResumoPainelItem {
  rotulo: string;
  valor: string;
}

@Component({
  selector: 'app-hero-painel',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './hero-painel.component.html',
  styleUrl: './hero-painel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPainelComponent {
  readonly saudacao = input.required<string>();
  readonly resumo = input.required<ResumoPainelItem[]>();
}
