import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private body: HTMLElement;
  private theme: 'light' | 'dark' = 'light';
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');


  constructor() {
    this.body = document.body;
  }

  // Méthode pour basculer le thème
  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    this.themeSubject.next(this.theme);
  }

  // Méthode pour appliquer le thème
  private applyTheme(): void {
    if (this.theme === 'dark') {
      this.activateDarkMode();
    } else {
      this.activateLightMode();
    }
  }

  // Activer le mode clair
  activateLightMode(): void {
    this.body.classList.remove('dark-mode', 'dark-theme');
    this.body.classList.add('light-mode', 'light-theme');
    localStorage.setItem('theme', 'light');
    this.updateNavbarStyles('light');
    this.updateFooterStyles('light');
  }

  // Activer le mode sombre
  activateDarkMode(): void {
    this.body.classList.remove('light-mode', 'light-theme');
    this.body.classList.add('dark-mode', 'dark-theme');
    localStorage.setItem('theme', 'dark');
    this.updateNavbarStyles('dark');
    this.updateFooterStyles('dark');
  }

  // Mettre à jour les styles de la navbar
  private updateNavbarStyles(mode: 'light' | 'dark'): void {
    const navbar = document.querySelector('app-navbar');
    if (navbar) {
      if (mode === 'dark') {
        navbar.classList.add('navbar-dark');
        navbar.classList.remove('navbar-light');
      } else {
        navbar.classList.add('navbar-light');
        navbar.classList.remove('navbar-dark');
      }
    }
  }

  // Mettre à jour les styles du footer
  private updateFooterStyles(mode: 'light' | 'dark'): void {
    const footer = document.querySelector('app-footer');
    if (footer) {
      if (mode === 'dark') {
        footer.classList.add('footer-dark');
        footer.classList.remove('footer-light');
      } else {
        footer.classList.add('footer-light');
        footer.classList.remove('footer-dark');
      }
    }
  }

  // Vérifier le thème au chargement
  checkTheme(): void {
    requestAnimationFrame(() => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      this.theme = savedTheme || 'light';
      this.applyTheme();
      this.themeSubject.next(this.theme);
    });
  }

  // Getter pour le thème actuel
  getCurrentTheme(): Observable<'light' | 'dark'> {
    return this.themeSubject.asObservable();
  }
  
}