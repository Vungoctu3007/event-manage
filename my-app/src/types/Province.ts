export interface Province {
  code: number;
  name: string;
  districts: District[];
}
export interface Ward {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
  wards: Ward[];
}