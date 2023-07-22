import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-searchbox',
  templateUrl: './searchbox.component.html',
  styles: [
  ]
})
export class SearchboxComponent implements OnInit {

  //es un tipo especial de Observable
  private debouncer: Subject<string> = new Subject<string>();

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public placeholder : string = '';

  //Se inicializa justo despues del constructor
  ngOnInit(): void {
    this.debouncer
    .pipe(
    //cuanto tiempo quiero esperar para hacer la siguiente emicion
    //osea espero medio segundo para ver si recibo mas valores, si vuelve a escribir no lo dejo pasar
    // es como una barrera
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  emitSearchbox(value : string):void{
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm);
  }

}
