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
  colors: string[];
  sizes: string[];
  imageUrl: string;
  sku: SKU[];
  type: "quần" | "áo" | "combo";
  active: boolean;
}
