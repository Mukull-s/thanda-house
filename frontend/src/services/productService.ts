import axios from 'axios';

const API_URL = '/api/products'; // Adjust if your backend prefix is different

export interface ProductImage { // This now represents the single image object
  public_id: string;
  url: string;
  secure_url: string;
  _id?: string; // Mongoose might add an _id to subdocuments
}

export interface ProductReview { // Assuming you might use this later
  _id?: string;
  user: string; // User ID
  name: string; // User name
  rating: number;
  comment: string;
  createdAt?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'ice-cream' | 'milkshake' | 'smoothie' | 'sundae' | 'beverage'; // Using enum values
  image: ProductImage; // Changed to single object
  stock: number; // Changed from countInStock
  rating?: number;
  numReviews?: number;
  featured?: boolean; // Renamed from isFeatured for consistency
  discount?: number;
  ingredients: string[];
  allergens?: string[];
  nutritionalInfo: NutritionalInfo;
  reviews?: ProductReview[]; // Added based on controller logic
  createdAt?: string;
  updatedAt?: string;
}

interface GetProductsResponse {
  success: boolean;
  count: number;
  totalPages: number;
  currentPage: string | number;
  products: Product[];
}

export const getAllProducts = async (page: number = 1, limit: number = 10, queryParams: Record<string, string> = {}): Promise<GetProductsResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...queryParams
    });
    const response = await axios.get<GetProductsResponse>(`${API_URL}?${params.toString()}`);
    return response.data; // The backend already returns the structured response
  } catch (error) {
    console.error('Error fetching products:', error);
    // You might want to throw a more specific error or return a default value
    throw error;
  }
}; 