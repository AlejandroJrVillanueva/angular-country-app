import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-searchbox',
  templateUrl: './searchbox.component.html',
  styles: [
  ]
})
export class SearchboxComponent {
  @Input()
  public placeholder : string = '';
}
