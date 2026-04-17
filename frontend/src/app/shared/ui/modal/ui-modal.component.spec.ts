import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModalComponent } from './ui-modal.component';

describe('UiModalComponent', () => {
  let fixture: ComponentFixture<UiModalComponent>;
  let component: UiModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('aberto', true);
    fixture.detectChanges();
  });

  it('renderiza o modal com semântica de diálogo', () => {
    fixture.componentRef.setInput('ariaLabel', 'Modal de teste');
    fixture.detectChanges();

    const modal = fixture.nativeElement.querySelector('.ui-modal') as HTMLElement;

    expect(modal.getAttribute('role')).toBe('dialog');
    expect(modal.getAttribute('aria-modal')).toBe('true');
    expect(modal.getAttribute('aria-label')).toBe('Modal de teste');
  });

  it('emite fechamento ao pressionar Escape', () => {
    spyOn(component['fechar'], 'emit');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(component['fechar'].emit).toHaveBeenCalled();
  });
});
