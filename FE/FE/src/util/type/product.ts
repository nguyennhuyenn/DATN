export interface SKU {
  size: string;
  color: string;
  quantity: number;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: number;
  description: string;
  colors: { name: string; image: string }[];
  sizes: string[];
  imageUrl: string;
  sku: SKU[];
  type: "quần" | "áo" | "combo";
  active: boolean;
}

export interface ProductDocument {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  colors: { name: string; image: string }[];
  sizes: string[];
  imageUrl: string;
  sku: SKU[];
  type: "quần" | "áo" | "combo";
  active: boolean;
}

export const defaultValueProductFormData: ProductFormData = {
  name: "",
  category: "",
  price: 0,
  description: "",
  colors: [{ name: "", image: "" }],
  sizes: [""],
  imageUrl: "",
  sku: [{ size: "", color: "", quantity: 0 }],
  type: "quần",
  active: true,
};

export const defaultValueProduct: ProductDocument = {
  id: "",
  name: "",
  category: "",
  price: 0,
  description: "",
  colors: [{ name: "", image: "" }],
  sizes: [""],
  imageUrl: "",
  sku: [{ size: "", color: "", quantity: 0 }],
  type: "quần",
  active: true,
};

export const defaultPagination = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 1,
  limit: 1,
};
