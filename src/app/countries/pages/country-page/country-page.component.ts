import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
    ) {}

  ngOnInit(): void {
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

    this.activatedRoute.params
      .subscribe( ({id}) => {

        this.countriesService.searchCountryByAlphaCode(id)
          .subscribe( country => {
            console.log({country})
          });

      });
  }
}
