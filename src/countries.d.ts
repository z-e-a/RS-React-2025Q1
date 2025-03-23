export interface Country {
  altSpellings: string[];
  area: number;
  capital: string[];
  capitalInfo: {
    latlng: [number, number];
  };
  car: {
    side: string;
    signs: string[];
  };
  cca2: string;
  cca3: string;
  ccn3: string;
  coatOfArms: {
    png?: string;
    svg?: string;
  };
  continents: string[];
  currencies: {
    /* currency */ [key: string]: {
      official: string;
      common: string;
    };
  };
  demonyms: {
    /* language */ [key: string]: {
      f: string;
      m: string;
    };
  };
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  independent: boolean;
  landlocked: boolean;
  languages: {
    /* language */ [key: string]: string;
  };
  latlng: number[];
  maps: {
    /* maps provider: googleMaps | openStreetMaps */ [key: string]: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: {
      /* language */ [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  startOfWeek: string;
  status: string;
  timezones: string[];
  tld: string[];
  translations: {
    /* language */ [key: string]: {
      official: string;
      common: string;
    };
  };
  unMember: boolean;
}
