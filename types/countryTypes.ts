export interface CountryProps {
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
  };
  continents: string[];
}

export interface CountryPageProps extends CountryProps {
  currencies?: Record<string, { symbol?: string; name?: string }>;
  capital?: string[];
  languages?: Record<string, string>;
  maps?: {
    googleMaps: string;
  };
  population?: number;
  coatOfArms?: {
    svg?: string;
  };
}
