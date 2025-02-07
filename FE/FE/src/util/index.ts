export type { Category } from "./type/category";
export type { SKU, ProductFormData } from "./type/product";

export { setToken, getToken, removeToken } from "./localStorage/token";
export {
  validePhone,
  validePassword,
  convertToSlug,
} from "./validate/validateForm";
export {
  formatCurrency,
  formatTimeDifference,
  formatTime,
  listTocpicCheckout,
  topicCheckout,
  classLableForm,
  classInputForm,
} from "./format/format";
