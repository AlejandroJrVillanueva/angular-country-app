import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CountriesService } from './../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  country! : Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
    ) {}

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode( id ) ),
      )
      .subscribe( country => {

        if(!country){
          return this.router.navigateByUrl('');
        }

        return this.country = country;

      });

  }


    //#region Sin Factorizar ngOnInit
  // ngOnInit(): void {
    // SIN destructuracion
    // this.activatedRoute.params
      // .subscribe((params) => {
      //   console.log({params: params['id ']})
      // });

    // CON destructuracion
    // this.activatedRoute.params
    // .subscribe( ({id}) => {
    //   this.countriesService
    //   console.log({params: id})

    // });

    // RESOLUCION FINAL
  //   this.activatedRoute.params
  //     .subscribe( ({id}) => {

  //       this.countriesService.searchCountryByAlphaCode(id)
  //         .subscribe( country => {
  //           console.log({country})
  //         });

  //     });
  // }
  //#endregion

}
