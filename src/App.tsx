/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Product, FilterState, Category, CartItem } from './types';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { NotificationToast, ToastMessage } from './components/NotificationToast';

export default function App() {
  // Precios mínimo y máximo disponibles en el catálogo base
  const minAvailablePrice = useMemo(() => {
    return Math.floor(Math.min(...PRODUCTS.map((p) => p.price)));
  }, []);

  const maxAvailablePrice = useMemo(() => {
    return Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)));
  }, []);

  // Estado principal de todos los filtros del catálogo
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'Todos',
    sortBy: 'featured',
    minPrice: minAvailablePrice,
    maxPrice: maxAvailablePrice,
    minRating: 0,
    inStockOnly: false,
  });

  // Estado para la vista (cuadrícula o lista)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Estado del Carrito de compras
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado para productos favoritos (Wishlist)
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Estado para el modal de vista rápida
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Estado para el panel lateral de filtros en móviles
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Estado para visibilidad de la barra lateral en escritorio (ocultar / mostrar)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Estado para notificaciones Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // 1. Contador dinámico de productos por categoría
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      Todos: PRODUCTS.length,
      Tecnología: 0,
      Ropa: 0,
      Hogar: 0,
      Accesorios: 0,
      Deportes: 0,
    };

    PRODUCTS.forEach((product) => {
      if (counts[product.category] !== undefined) {
        counts[product.category]++;
      }
    });

    return counts;
  }, []);

  // 2. Cálculo del número de filtros activos
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim() !== '') count++;
    if (filters.selectedCategory !== 'Todos') count++;
    if (filters.maxPrice < maxAvailablePrice) count++;
    if (filters.minRating > 0) count++;
    if (filters.inStockOnly) count++;
    return count;
  }, [filters, maxAvailablePrice]);

  // 3. Filtrado y Ordenamiento en tiempo real
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filtro 1: Buscador de texto en tiempo real (nombre, categoría, marca o descripción)
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filtro 2: Categoría seleccionada (Pills / Sidebar)
    if (filters.selectedCategory !== 'Todos') {
      result = result.filter((p) => p.category === filters.selectedCategory);
    }

    // Filtro 3: Rango de precio
    result = result.filter((p) => p.price <= filters.maxPrice);

    // Filtro 4: Calificación mínima por estrellas
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Filtro 5: Solo artículos en stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // 4. Ordenamiento dinámico
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Mantener orden de catálogo destacado
        break;
    }

    return result;
  }, [filters]);

  // Actualizar filtros de forma parcial
  const handleUpdateFilters = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  // Restablecer todos los filtros a su estado inicial
  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: 'Todos',
      sortBy: 'featured',
      minPrice: minAvailablePrice,
      maxPrice: maxAvailablePrice,
      minRating: 0,
      inStockOnly: false,
    });
    setToast({
      id: Date.now().toString(),
      type: 'info',
      text: 'Todos los filtros han sido restablecidos.',
    });
  };

  // Añadir producto al carrito
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });

    setToast({
      id: Date.now().toString(),
      type: 'success',
      text: `"${product.name}" añadido a la bolsa.`,
    });
  };

  // Modificar cantidad en carrito
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Eliminar producto del carrito
  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Vaciar carrito
  const handleClearCart = () => {
    setCart([]);
  };

  // Alternar favoritos
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  // Total de unidades en el carrito
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased selection:bg-indigo-600 selection:text-white">
      
      {/* 1. Barra de Navegación Superior */}
      <Header
        totalProducts={PRODUCTS.length}
        filteredCount={filteredAndSortedProducts.length}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {/* 2. Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Banner de Categorías Rápidas (Chips / Pills) */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Explorar Catálogo
            </h1>
            <span className="text-xs text-slate-600 font-bold hidden sm:inline bg-white px-2.5 py-1 rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
              ⚡ Filtra y ordena en tiempo real
            </span>
          </div>

          <CategoryChips
            selectedCategory={filters.selectedCategory}
            onSelectCategory={(cat) => handleUpdateFilters({ selectedCategory: cat })}
            categoryCounts={categoryCounts}
          />
        </section>

        {/* Layout Bento: Barra Lateral de Filtros + Grilla de Productos */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          
          {/* Panel Lateral de Filtros (Escritorio) Bento Card */}
          {isSidebarVisible && (
            <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-3xl border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_#0f172a] sticky top-24 transition-all animate-in fade-in slide-in-from-left-4 duration-200">
              <FilterSidebar
                filters={filters}
                onUpdateFilters={handleUpdateFilters}
                onResetFilters={handleResetFilters}
                categoryCounts={categoryCounts}
                minAvailablePrice={minAvailablePrice}
                maxAvailablePrice={maxAvailablePrice}
                activeFilterCount={activeFilterCount}
                onToggleSidebar={() => setIsSidebarVisible(false)}
              />
            </aside>
          )}

          {/* Grilla Principal de Productos */}
          <ProductGrid
            products={filteredAndSortedProducts}
            totalProductsCount={PRODUCTS.length}
            filters={filters}
            onUpdateFilters={handleUpdateFilters}
            onResetFilters={handleResetFilters}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            viewMode={viewMode}
            onChangeViewMode={setViewMode}
            showSidebar={isSidebarVisible}
            onToggleSidebar={() => setIsSidebarVisible(prev => !prev)}
            activeFilterCount={activeFilterCount}
          />

        </div>
      </main>

      {/* 3. Pie de página minimalista Bento */}
      <footer className="bg-white border-t-2 border-slate-900 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700 font-bold">
          <p>© 2026 LUMEN Catálogo Interactivo · Bento Grid Edition.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg border border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 border border-slate-900" />
              Sincronizado en tiempo real
            </span>
          </div>
        </div>
      </footer>

      {/* 4. Drawer de Filtros para Móviles Bento */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white border-l-2 border-slate-900 shadow-2xl overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onUpdateFilters={handleUpdateFilters}
                onResetFilters={handleResetFilters}
                categoryCounts={categoryCounts}
                minAvailablePrice={minAvailablePrice}
                maxAvailablePrice={maxAvailablePrice}
                isMobile={true}
                onCloseMobile={() => setIsMobileFiltersOpen(false)}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal de Vista Rápida del Producto */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Carrito de Compras Lateral */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* 7. Notificaciones Toast Flotantes */}
      <NotificationToast
        toast={toast}
        onDismiss={() => setToast(null)}
      />

    </div>
  );
}
