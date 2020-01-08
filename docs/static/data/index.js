import city from './city-simplified';
import cityEn from './en/city-simplified';

import province from './province-simplified';
import provinceEn from './en/province-simplified';

export function getCity(locale) {
  if (locale === 'en') {
    return {
      data: cityEn
    };
  }
  return {
    data: city
  };
}

export function getProvince(locale) {
  if (locale === 'en') {
    return {
      data: provinceEn
    };
  }
  return {
    data: province
  };
}
