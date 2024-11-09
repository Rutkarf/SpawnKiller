import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentTheme: 'light' | 'dark' = 'light';
  private themeSubscription: Subscription | undefined;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.checkTheme();
    this.themeSubscription = this.themeService.getCurrentTheme().subscribe(
      (theme: 'light' | 'dark') => {
        this.currentTheme = theme;
      }
    );
  }


  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  get navbarClasses() {
    return {
      'navbar-light': this.currentTheme === 'light',
      'navbar-dark': this.currentTheme === 'dark'
    };
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

