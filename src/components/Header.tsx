import { ShoppingBag, Sparkles, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  totalProducts: number;
  filteredCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

export function Header({
  cartCount,
  onOpenCart,
  onOpenMobileFilters,
  activeFilterCount
}: HeaderProps) {
  return (
    <header id="main-header" className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-900 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Bento Style */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  LUMEN
                </span>
                <span className="hidden sm:inline-block text-xs font-black px-2 py-0.5 rounded-lg bg-amber-300 text-slate-900 border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                  BENTO 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden md:block">
                Colección modular de productos premium
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile filter button */}
            <button
              id="mobile-filters-trigger-btn"
              onClick={onOpenMobileFilters}
              className="lg:hidden relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              aria-label="Abrir filtros"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden xs:inline">Filtros</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center border border-slate-900">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-drawer-trigger-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 text-xs font-black text-white bg-slate-900 hover:bg-indigo-600 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              aria-label="Ver carrito de compras"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bolsa</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[11px] font-black flex items-center justify-center border border-slate-900 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
