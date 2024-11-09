import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe((theme) => {
      this.isDarkMode = theme === 'dark';
    });
  }
}