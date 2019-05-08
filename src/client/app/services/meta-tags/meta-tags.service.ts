import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface MetaTags {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string | (number | string)[];
}

export const ROUTE_TITLE_PLACEHOLDER = 'PLACEHOLDER';

@Injectable({ providedIn: 'root' })
export class MetaTagsService {
  constructor(private title: Title, private meta: Meta) {}

  updateTags(tags: MetaTags) {
    if (tags.title) {
      this.patchTitle(tags.title);
      this.meta.updateTag({ property: 'og:title', content: tags.title });
      this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    }

    if (tags.description) {
      this.meta.updateTag({ name: 'description', content: tags.description });
      this.meta.updateTag({ property: 'og:description', content: tags.description });
      this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    }

    if (tags.image) {
      const imageUrl = tags.image[0] === '/' ? `https://gloomhavendb.com${tags.image}` : tags.image;

      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    }

    if (tags.keywords) {
      let keywords: string = Array.isArray(tags.keywords) ? tags.keywords.join(',') : tags.keywords;
      keywords += ',Gloomhaven,Gloomhaven DB';

      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
  }

  private patchTitle(titlePart: string) {
    const newTitle = this.title.getTitle().replace(ROUTE_TITLE_PLACEHOLDER, titlePart);
    this.title.setTitle(newTitle);
  }
}
