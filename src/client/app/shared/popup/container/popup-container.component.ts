import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { PopupRef } from '../popup-ref.class';

// basic container component that would work as a "backdrop" for containers 99% of the time

@Component({
  selector: 'tc-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.scss'],
})
export class PopupContainerComponent {
  @HostBinding('class.is-modal')
  @Input()
  isModal = false;

  @Output() backgroundClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elemRef: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  close(event: MouseEvent) {
    if (!this.isModal && event.target === this.elemRef.nativeElement) {
      this.backgroundClick.emit();
    }
  }
}
