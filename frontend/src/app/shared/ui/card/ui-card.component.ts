import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  templateUrl: './ui-card.component.html',
  styleUrl: './ui-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardComponent {
  readonly tonalidade = input<'padrao' | 'destaque'>('padrao');
}
