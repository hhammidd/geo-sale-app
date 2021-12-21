import {RegionsDto} from './RegionsDto';
import {ProvinceDto} from './ProvinceDto';
import {ComuneDto} from './ComuneDto';

export interface SalePointGeoBeta {
  id: number;
  regions: RegionsDto[];
  provinces: ProvinceDto[];
  comunes: ComuneDto[];
  market: string;
  field: string;
}
