export type { Category } from "./type/category";
export type { Size } from "./type/size";
export type { Color } from "./type/color";
export type {
  SKU,
  ProductFormData,
  defaultValueProductFormData,
} from "./type/product";

export { setToken, getToken, removeToken } from "./localStorage/token";
export {
  validPhone,
  validPassword,
  convertToSlug,
} from "./validate/validateForm";
export {
  formatTimeDifference,
  formatTime,
  formatCurrencyVND,
} from "./format/format";
