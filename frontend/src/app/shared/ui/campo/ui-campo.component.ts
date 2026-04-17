import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-campo',
  standalone: true,
  templateUrl: './ui-campo.component.html',
  styleUrl: './ui-campo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCampoComponent {
  readonly rotulo = input.required<string>();
}
