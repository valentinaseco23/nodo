import { Product, SortOption, FilterState } from '../types';
import { SORT_OPTIONS } from '../data/products';
import { ProductCard } from './ProductCard';
import { EmptyState } from './EmptyState';
import { 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  X
} from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  totalProductsCount: number;
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  favorites: Set<string>;
  onToggleFavorite: (productId: string) => void;
  viewMode: 'grid' | 'list';
  onChangeViewMode: (mode: 'grid' | 'list') => void;
}

export function ProductGrid({
  products,
  totalProductsCount,
  filters,
  onUpdateFilters,
  onResetFilters,
  onAddToCart,
  onQuickView,
  favorites,
  onToggleFavorite,
  viewMode,
  onChangeViewMode
}: ProductGridProps) {
  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.selectedCategory !== 'Todos' ||
    filters.minRating > 0 ||
    filters.inStockOnly;

  return (
    <div id="product-grid-section" className="flex-1 flex flex-col min-w-0">
      
      {/* Top Toolbar: Counter, Active Badges & Sort Controls */}
      <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 mb-6 shadow-[4px_4px_0px_0px_#0f172a]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Dynamic Counter */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]" />
            <p id="products-counter" className="text-xs sm:text-sm font-bold text-slate-800">
              Mostrando <span className="font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-md">{products.length}</span> de <span className="font-black text-slate-900">{totalProductsCount}</span> productos
            </p>
          </div>

          {/* Controls: Sort Dropdown & View Mode Switch */}
          <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Sort Selector */}
            <div className="relative flex items-center">
              <label htmlFor="sort-select" className="sr-only">Ordenar productos</label>
              <div className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition-all">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span className="hidden md:inline text-slate-600 font-bold">Ordenar:</span>
                <select
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={(e) => onUpdateFilters({ sortBy: e.target.value as SortOption })}
                  className="bg-transparent text-slate-900 font-black focus:outline-none cursor-pointer pr-1"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle (Grid vs List) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <button
                type="button"
                id="view-grid-btn"
                onClick={() => onChangeViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista en cuadrícula"
                aria-label="Vista en cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                id="view-list-btn"
                onClick={() => onChangeViewMode('list')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista en lista"
                aria-label="Vista en lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t-2 border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
              Filtros activos:
            </span>

            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-900 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                Texto: "{filters.searchQuery}"
                <button
                  onClick={() => onUpdateFilters({ searchQuery: '' })}
                  className="hover:text-rose-600 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.selectedCategory !== 'Todos' && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-900 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                Categoría: {filters.selectedCategory}
                <button
                  onClick={() => onUpdateFilters({ selectedCategory: 'Todos' })}
                  className="hover:text-rose-600 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-950 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                {filters.minRating}+ Estrellas
                <button
                  onClick={() => onUpdateFilters({ minRating: 0 })}
                  className="hover:text-rose-600 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-950 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                Solo en stock
                <button
                  onClick={() => onUpdateFilters({ inStockOnly: false })}
                  className="hover:text-rose-600 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={onResetFilters}
              className="text-xs font-black text-indigo-700 hover:text-indigo-900 underline ml-auto transition-colors cursor-pointer"
            >
              Restablecer todo
            </button>
          </div>
        )}
      </div>

      {/* Product Content: Grid / List / Empty State */}
      {products.length === 0 ? (
        <EmptyState
          onResetFilters={onResetFilters}
          searchQuery={filters.searchQuery}
          hasActiveFilters={hasActiveFilters}
        />
      ) : (
        <div
          id="products-display-container"
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'flex flex-col gap-4'
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={onToggleFavorite}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

    </div>
  );
}
