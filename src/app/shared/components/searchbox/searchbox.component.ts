import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-searchbox',
  templateUrl: './searchbox.component.html',
  styles: [
  ]
})
export class SearchboxComponent {

  // @ViewChild('txtSearchInput')
  // tagInput!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue = new EventEmitter<string>();

  @Input()
  public placeholder : string = '';

  // emitSearchbox():void{
  //   const newTag = this.tagInput.nativeElement.value;
  //   this.onValue.emit(newTag);
  //   this.tagInput.nativeElement.value = '';
  // }

  emitSearchbox(value : string):void{
    this.onValue.emit(value);
  }

}
