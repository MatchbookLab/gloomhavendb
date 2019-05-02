import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

export const ROUTE_TITLE_PLACEHOLDER = 'PLACEHOLDER';

@Injectable({ providedIn: 'root' })
export class TitleService {
  constructor(private title: Title) {}

  getTitle(): string {
    return this.title.getTitle();
  }

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  patchTitle(titlePart: string) {
    const newTitle = this.getTitle().replace(ROUTE_TITLE_PLACEHOLDER, titlePart);
    this.setTitle(newTitle);
  }
}
