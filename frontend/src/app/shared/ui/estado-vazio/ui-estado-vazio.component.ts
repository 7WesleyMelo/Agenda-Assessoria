import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-estado-vazio',
  standalone: true,
  templateUrl: './ui-estado-vazio.component.html',
  styleUrl: './ui-estado-vazio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiEstadoVazioComponent {
  readonly titulo = input.required<string>();
  readonly descricao = input.required<string>();
}
