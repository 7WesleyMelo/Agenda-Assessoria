import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-alerta',
  standalone: true,
  templateUrl: './ui-alerta.component.html',
  styleUrl: './ui-alerta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAlertaComponent {
  readonly variante = input<'erro' | 'info' | 'sucesso'>('info');
}
