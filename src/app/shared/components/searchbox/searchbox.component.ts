import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-searchbox',
  templateUrl: './searchbox.component.html',
  styles: [
  ]
})
export class SearchboxComponent {

  @Output()
  public onValue = new EventEmitter<string>();

  @Input()
  public placeholder : string = '';

  emitSearchbox(value : string):void{
    this.onValue.emit(value);
  }

}
