export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category?: Category | null; // <-- categoría puede ser null o undefined
  condition: string;
  price?: number;
  publishedAt?: string;
  imageUrl?: string;
  userId?: number;
}
