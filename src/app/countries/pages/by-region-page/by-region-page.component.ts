import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent implements OnInit {

  public countriesByRegion: Country[] = [];
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesByRegion = this.countriesService.cacheStore.byRegions.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegions.region;
  }

  searchByRegion(region: Region):void{
    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
      .subscribe(c => this.countriesByRegion = c );
    }
}
