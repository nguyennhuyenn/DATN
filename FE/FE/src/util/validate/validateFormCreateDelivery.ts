import { ProductFormData } from "../type/product";

export interface errorProduct {
  name: string;
  category: string;
  price: string;
  description: string;
  colors: string;
  sizes: string;
  imageUrl: string;
  isSuccess: boolean;
}

export const errorCreateProduct: errorProduct = {
  name: "",
  category: "",
  price: "",
  description: "",
  colors: "",
  sizes: "",
  imageUrl: "",
  isSuccess: true,
};

export function validDataFormProduct(data: ProductFormData) {
  const error: errorProduct = {
    name: "",
    category: "",
    price: "",
    description: "",
    colors: "",
    sizes: "",
    imageUrl: "",
    isSuccess: true,
  };

  const requiredFields: (keyof ProductFormData)[] = [
    "name",
    "category",
    "description",
    "imageUrl",
  ];

  // Kiểm tra trường bắt buộc
  requiredFields.forEach((field) => {
    if (!data[field]) {
      (error[field as keyof errorProduct] as string) = "Không được bỏ trống";
      error.isSuccess = false;
    }
  });

  // Kiểm tra mảng sizes
  if (!data.sizes.length || data.sizes.some((item) => !item)) {
    error.sizes = "Không được bỏ trống";
    error.isSuccess = false;
  }

  // Kiểm tra mảng colors
  if (!data.colors.length || data.colors.some((item) => !item.name)) {
    error.colors = "Không được bỏ trống";
    error.isSuccess = false;
  }

  return error;
}
