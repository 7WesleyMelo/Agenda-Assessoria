import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface ResumoPainelItem {
  rotulo: string;
  valor: string;
}

@Component({
  selector: 'app-hero-painel',
  standalone: true,
  templateUrl: './hero-painel.component.html',
  styleUrl: './hero-painel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPainelComponent {
  readonly saudacao = input.required<string>();
  readonly resumo = input.required<ResumoPainelItem[]>();
}
