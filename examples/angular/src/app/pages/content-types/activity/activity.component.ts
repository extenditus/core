import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DotCMSContentlet } from '../../../lib/models';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [RouterLink],
  template: ` <article
    class="p-4 overflow-hidden bg-white rounded shadow-lg"
  >
    @if(contentlet.image; as image ) {
      <img
        class="w-full"
        [src]="image + '?language_id=' + contentlet.languageId"
        width="100"
        height="100"
        alt="Activity Image"
      />
    }
    <div class="px-6 py-4">
      <p class="mb-2 text-xl font-bold">{{ contentlet.title }}</p>
      <p class="text-base line-clamp-3">{{ contentlet['description'] }}</p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <a
        [routerLink]="'/activities/' + contentlet['urlTitle'] || '#'"
        class="inline-block px-4 py-2 font-bold text-white bg-red-400 rounded-full hover:bg-purple-700"
      >
        Link to detail →
      </a>
    </div>
  </article>`,
  styleUrl: './activity.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {
  @Input() contentlet!: DotCMSContentlet;
}