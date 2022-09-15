export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 32;

const PRICE = "price";
const CREATED = "createdAt";
const UPDATED = "updatedAt";
const ASC = '';
const DESC = '-';

export const SORT_BY = {
  PRICE_ASC: `${ASC}${PRICE}`,
  PRICE_DESC: `${DESC}${PRICE}`,
  CREATED_ASC: `${ASC}${CREATED}`,
  CREATED_DESC: `${DESC}${CREATED}`,
  UPDATED_ASC: `${ASC}${UPDATED}`,
  UPDATED_DESC: `${DESC}${UPDATED}`,
};

export const PAGINATION = {
  PAGE: 1, TAKE: 10,
}

export const TAKE = [10, 20, 50, 100];

export enum URL_PARAMS {
  take = "take",
  page = "page",
  sort = "sort",
  category = "category",
  minPrice = "minPrice",
  maxPrice = "maxPrice",
  location = "location",
  minBuilt = "minBuilt",
  maxBuilt = "maxBuilt",
  minLength = "minLength",
  maxLength = "maxLength",
  minBeam = "minBeam",
  maxBeam = "maxBeam",
  search = "search",
}
