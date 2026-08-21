import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FloatingWhatsappComponent } from './shared/components/floating-whatsapp/floating-whatsapp.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FloatingWhatsappComponent,
    ScrollToTopComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
