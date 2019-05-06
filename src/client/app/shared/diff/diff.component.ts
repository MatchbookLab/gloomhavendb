import { Component, Input, OnChanges } from '@angular/core';
import { Change, diffWords, diffWordsWithSpace } from 'diff';
import { PlatformService } from '../../services/platform/platform.service';

@Component({
  selector: 'gdb-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.scss'],
})
export class DiffComponent implements OnChanges {
  @Input() objectA: any;
  @Input() objectB: any;

  changes: Change[];

  constructor(private platformService: PlatformService) {}

  ngOnChanges() {
    if (!this.platformService.isBrowser) {
      return;
    }

    this.changes = diffWordsWithSpace(JSON.stringify(this.objectA, null, 2), JSON.stringify(this.objectB, null, 2));
  }
}
