import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  protected readonly appPages = [
    { title: 'Ficha', url: '/ficha', icon: 'document' },
    { title: 'Livro', url: '/livro', icon: 'book' },
    { title: 'Base de conhecimento', url: '/grafos', icon: 'library' },
  ];
  protected readonly characters = ['Carlos Marighella', 'Marilene Vilas-Boas'];
  constructor() {}
}
