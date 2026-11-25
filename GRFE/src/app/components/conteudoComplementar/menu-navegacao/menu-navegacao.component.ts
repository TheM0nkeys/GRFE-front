import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './menu-navegacao.component.html',
  styleUrl: './menu-navegacao.component.scss'
})
export class MenuNavegacaoComponent {
  menuAberto = false;

  @ViewChild('menuWrapper') menuWrapper!: ElementRef<HTMLElement>;

  constructor(private readonly authService: AuthService) {}

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  sair(): void {
    this.authService.limparToken();
  }

  @HostListener('document:click', ['$event'])
  fecharAoClicarFora(event: MouseEvent): void {
    if (this.menuAberto && this.menuWrapper && !this.menuWrapper.nativeElement.contains(event.target as Node)) {
      this.menuAberto = false;
    }
  }

  @HostListener('window:scroll')
  fecharAoRolar(): void {
    this.menuAberto = false;
  }
}
