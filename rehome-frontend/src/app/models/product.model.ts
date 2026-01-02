export interface Product {
  id: number;           // Opcional porque al crear un producto todavía no tiene ID
  name: string;
  description: string;
  category: string;
  condition: string;     // "New" o "Used"
  price?: number;        // Opcional, puede ser null si es un regalo
  publishedAt?: string;  // Fecha en formato ISO
  imageUrl?: string;     // URL de la imagen, opcional
  userId?: number;       // Relación con el usuario, opcional
}
