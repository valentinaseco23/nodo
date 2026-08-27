export type Category = 'Todos' | 'Tecnología' | 'Ropa' | 'Hogar' | 'Accesorios' | 'Deportes';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';

export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, 'Todos'>;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  discountPercentage?: number;
  brand: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: Category;
  sortBy: SortOption;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
