import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapitals: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegions: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() : void{
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStorage')) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStorage')! );
  }
  searchCountryByAlphaCode(code: string) : Observable<Country | null>{

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null))
      );
  }

  getCountryRequest(url : string) : Observable<Country[]>{

    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () =>  of( [] )),//of : devuelve un Observable del tipo que se pone en los parentesis
        delay(500) //1000 = 1 SEG //expresado en segundos
      );
  }

  searchCapital(term: string) : Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;

    return this.getCountryRequest(url)
      .pipe(
        // en EcmaScript v6 o superior cuando tiene el mismo nombre no hace falta agregar variable.
        // Lo considera redundante
        // tap( countries => this.cacheStore.byCapital = { term: term, countries: countries })
        tap( countries => this.cacheStore.byCapitals = { term, countries }),
        tap( () => this.saveToLocalStorage())
      );
  }

  searchCountry(term: string) : Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;

    return this.getCountryRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries = { term, countries }),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchRegion(region: Region) : Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;

    return this.getCountryRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegions = { region, countries}),
        tap( () => this.saveToLocalStorage())
      );
  }


}
