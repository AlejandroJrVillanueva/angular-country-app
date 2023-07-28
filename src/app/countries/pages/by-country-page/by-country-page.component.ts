import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: []
})

export class ByCountryPageComponent implements OnInit{

  countriesByCountry : Country [] = [];
  initialValue : string = '';

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countriesByCountry = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term: string):void{
    this.countriesService.searchCountry(term)
      .subscribe(c => this.countriesByCountry = c );
    }
}
