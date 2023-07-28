import { Country } from './country.interface';
import { Region } from './region.type';

export interface CacheStore{
  byCapitals: TermCountries;
  byCountries: TermCountries;
  byRegions: RegionCountries;
}

export interface TermCountries{
  term: string;
  countries: Country[];
}

export interface RegionCountries{
  region: Region;
  countries: Country[];
}
