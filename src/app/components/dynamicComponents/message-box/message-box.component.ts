import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bss-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {
  @Output() showMessage = new EventEmitter()
  @Input() message = 'An alert box'
  onRemoveAlert() {
    this.showMessage.emit()
  }
}
