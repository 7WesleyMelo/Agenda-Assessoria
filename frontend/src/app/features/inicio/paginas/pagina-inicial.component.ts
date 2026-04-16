import { ChangeDetectionStrategy, Component } from '@angular/core';
import { apiConfig } from '../../../core/configuracao/api.config';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaInicialComponent {
  protected readonly urlApi = apiConfig.urlBase;

  protected readonly pilares = [
    'Backend em Laravel com foco em API RESTful, SOLID e regras de negocio fora da camada HTTP.',
    'Frontend em Angular organizado por funcionalidade, componentizacao forte e base pronta para evolucao.',
    'Infraestrutura local totalmente em Docker, com PostgreSQL como banco principal e fluxo reproduzivel.',
  ];
}
