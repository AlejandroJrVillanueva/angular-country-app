import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa'|'Americas'|'Asia'|'Europe' |'Oceania'

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {

  countriesByRegion : Country[] = [];
  public regions : Region[] = ['Africa','Americas','Asia','Europe','Oceania']

  constructor(private countriesService: CountriesService) {}

  searchByRegion(term: string):void{
    this.countriesService.searchRegion(term)
      .subscribe(c => this.countriesByRegion = c );
    }
}
