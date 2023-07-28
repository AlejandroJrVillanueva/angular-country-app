import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent  implements OnInit{

  countriesByCapital : Country [] = [];
  initialValue : string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countriesByCapital = this.countriesService.cacheStore.byCapitals.countries;
    this.initialValue  = this.countriesService.cacheStore.byCapitals.term;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe(c => {
        this.countriesByCapital = c;
        this.isLoading = false;
      });
    }
}
