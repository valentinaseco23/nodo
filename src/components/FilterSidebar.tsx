import React, { useState } from 'react';
import { FilterState, Category } from '../types';
import { CATEGORIES } from '../data/products';
import { 
  Search, 
  X, 
  RotateCcw, 
  Star, 
  Check, 
  SlidersHorizontal,
  PackageCheck,
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
  Tag,
  DollarSign,
  Layers
} from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  categoryCounts: Record<Category, number>;
  minAvailablePrice: number;
  maxAvailablePrice: number;
  isMobile?: boolean;
  onCloseMobile?: () => void;
  activeFilterCount: number;
  onToggleSidebar?: () => void;
}

export function FilterSidebar({
  filters,
  onUpdateFilters,
  onResetFilters,
  categoryCounts,
  minAvailablePrice,
  maxAvailablePrice,
  isMobile = false,
  onCloseMobile,
  activeFilterCount,
  onToggleSidebar
}: FilterSidebarProps) {
  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    rating: false,
    stock: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateFilters({ searchQuery: e.target.value });
  };

  const clearSearch = () => {
    onUpdateFilters({ searchQuery: '' });
  };

  const handlePriceChange = (value: number) => {
    onUpdateFilters({ maxPrice: value });
  };

  return (
    <div className={`flex flex-col gap-3.5 ${isMobile ? 'p-5' : 'p-0'}`}>
      
      {/* Mobile Drawer Header */}
      {isMobile && (
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-900" />
            <h2 className="text-sm font-black text-slate-900">Filtros de Catálogo</h2>
            {activeFilterCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-600 text-white font-black border border-slate-900">
                {activeFilterCount}
              </span>
            )}
          </div>
          {onCloseMobile && (
            <button
              id="close-mobile-filters-btn"
              onClick={onCloseMobile}
              className="p-1 text-slate-900 hover:bg-slate-200 rounded-lg border-2 border-slate-900 transition-colors cursor-pointer"
              aria-label="Cerrar filtros"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Header with Clear & Hide Button for Desktop */}
      {!isMobile && (
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-slate-900">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-900" />
            <h2 className="text-xs font-black tracking-tight text-slate-900 uppercase">Filtros</h2>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center border border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]">
                {activeFilterCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                id="desktop-reset-filters-btn"
                onClick={onResetFilters}
                className="text-[11px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition-colors"
                title="Limpiar filtros"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Limpiar
              </button>
            )}

            {onToggleSidebar && (
              <button
                id="hide-sidebar-btn"
                onClick={onToggleSidebar}
                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-300 hover:border-slate-900 transition-all cursor-pointer"
                title="Ocultar barra de filtros"
                aria-label="Ocultar barra de filtros"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 1. Real-time Search Input */}
      <div className="space-y-1">
        <label htmlFor="search-input" className="block text-[10px] font-black uppercase tracking-wider text-slate-700">
          Buscar
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="search-input"
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar..."
            className="w-full pl-8 pr-7 py-1.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-indigo-50/50 shadow-[2px_2px_0px_0px_#0f172a] transition-all"
          />
          {filters.searchQuery && (
            <button
              id="clear-search-btn"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Categorías (Collapsible) */}
      <div className="border-t-2 border-slate-200 pt-2.5">
        <button
          type="button"
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-700 hover:text-slate-900 py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-slate-500" />
            Categoría
          </span>
          <div className="flex items-center gap-1">
            {!openSections.categories && filters.selectedCategory !== 'Todos' && (
              <span className="text-[9px] font-black px-1.5 py-0.2 bg-indigo-600 text-white rounded">
                {filters.selectedCategory}
              </span>
            )}
            {openSections.categories ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </div>
        </button>

        {openSections.categories && (
          <div className="space-y-1 mt-1.5">
            {CATEGORIES.map((category) => {
              const isSelected = filters.selectedCategory === category;
              const count = categoryCounts[category] || 0;

              return (
                <button
                  key={category}
                  id={`sidebar-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => onUpdateFilters({ selectedCategory: category })}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left border-2 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                      : 'bg-white text-slate-800 border-transparent hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full border border-slate-900 ${isSelected ? 'bg-amber-300' : 'bg-slate-300'}`} />
                    <span className="truncate">{category}</span>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-black border ${
                      isSelected
                        ? 'bg-indigo-800 text-white border-indigo-900'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Rango de Precio (Collapsible) */}
      <div className="border-t-2 border-slate-200 pt-2.5">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-700 hover:text-slate-900 py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-3 h-3 text-slate-500" />
            Precio Máximo
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.2 rounded">
              ${filters.maxPrice.toFixed(0)}
            </span>
            {openSections.price ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </div>
        </button>

        {openSections.price && (
          <div className="space-y-2 mt-1.5">
            <input
              id="price-range-slider"
              type="range"
              min={minAvailablePrice}
              max={maxAvailablePrice}
              step={5}
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 border border-slate-400"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-bold">
              <span>${minAvailablePrice.toFixed(0)}</span>
              <span>${maxAvailablePrice.toFixed(0)}</span>
            </div>

            {/* Quick price presets */}
            <div className="grid grid-cols-3 gap-1">
              {[50, 100, 250].map((presetPrice) => (
                <button
                  key={presetPrice}
                  id={`price-preset-${presetPrice}`}
                  onClick={() => handlePriceChange(presetPrice)}
                  className={`py-0.5 px-1 text-[10px] font-black rounded border-2 transition-all cursor-pointer ${
                    filters.maxPrice === presetPrice
                      ? 'bg-indigo-600 text-white border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900'
                  }`}
                >
                  &le;${presetPrice}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Calificación Mínima (Collapsible) */}
      <div className="border-t-2 border-slate-200 pt-2.5">
        <button
          type="button"
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-700 hover:text-slate-900 py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-slate-500" />
            Calificación
          </span>
          <div className="flex items-center gap-1">
            {filters.minRating > 0 && (
              <span className="text-[9px] font-black px-1.5 py-0.2 bg-amber-300 text-slate-900 rounded border border-slate-900">
                {filters.minRating}+ ★
              </span>
            )}
            {openSections.rating ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </div>
        </button>

        {openSections.rating && (
          <div className="space-y-1 mt-1.5">
            {[
              { value: 0, label: 'Todas' },
              { value: 4.5, label: '4.5+ estrellas' },
              { value: 4.0, label: '4.0+ estrellas' },
              { value: 4.7, label: '4.7+ (Top)' },
            ].map((ratingOption) => {
              const isChecked = filters.minRating === ratingOption.value;
              return (
                <button
                  key={ratingOption.value}
                  id={`rating-filter-${ratingOption.value}`}
                  onClick={() => onUpdateFilters({ minRating: ratingOption.value })}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-xs font-bold transition-all border-2 cursor-pointer ${
                    isChecked
                      ? 'bg-amber-300 text-slate-900 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]'
                      : 'bg-white border-transparent hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className={`w-3 h-3 ${ratingOption.value === 0 ? 'text-slate-400' : 'text-amber-500 fill-amber-500'}`} />
                    <span>{ratingOption.label}</span>
                  </div>
                  {isChecked && <Check className="w-3 h-3 text-slate-900 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Disponibilidad */}
      <div className="pt-2 border-t-2 border-slate-200">
        <label
          htmlFor="in-stock-checkbox"
          className="flex items-center justify-between p-2 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-50 cursor-pointer transition-all select-none"
        >
          <div className="flex items-center gap-2">
            <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <p className="text-xs font-black text-slate-900">Solo en stock</p>
            </div>
          </div>
          <input
            id="in-stock-checkbox"
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onUpdateFilters({ inStockOnly: e.target.checked })}
            className="w-3.5 h-3.5 rounded border-2 border-slate-900 text-indigo-600 focus:ring-0 cursor-pointer accent-indigo-600"
          />
        </label>
      </div>

      {/* Mobile Drawer Action Buttons */}
      {isMobile && (
        <div className="pt-3 border-t-2 border-slate-900 flex items-center gap-2 mt-auto">
          <button
            id="mobile-clear-filters-btn"
            onClick={onResetFilters}
            className="flex-1 py-2 px-3 rounded-xl border-2 border-slate-900 text-slate-900 text-xs font-black hover:bg-slate-100 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-center cursor-pointer"
          >
            Limpiar
          </button>
          <button
            id="mobile-apply-filters-btn"
            onClick={onCloseMobile}
            className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all text-center cursor-pointer"
          >
            Ver Resultados
          </button>
        </div>
      )}

    </div>
  );
}
