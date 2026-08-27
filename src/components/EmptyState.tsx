import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onResetFilters: () => void;
  searchQuery?: string;
  hasActiveFilters: boolean;
}

export function EmptyState({
  onResetFilters,
  searchQuery,
  hasActiveFilters
}: EmptyStateProps) {
  return (
    <div
      id="catalog-empty-state"
      className="bg-white rounded-3xl border-2 border-slate-900 p-8 sm:p-12 text-center max-w-lg mx-auto my-6 shadow-[6px_6px_0px_0px_#0f172a]"
    >
      <div className="w-16 h-16 rounded-2xl bg-amber-300 text-slate-900 flex items-center justify-center mx-auto mb-4 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-black text-slate-900 mb-2">
        {searchQuery ? `Sin resultados para "${searchQuery}"` : 'Sin productos coincidentes'}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mb-6 leading-relaxed font-medium">
        {hasActiveFilters 
          ? 'Intenta relajar los filtros aplicados, ajustar el rango de precio o buscar un término más general.'
          : 'No hay productos disponibles en esta categoría en este momento.'}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          id="empty-state-reset-btn"
          onClick={onResetFilters}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Limpiar todos los filtros
        </button>
      </div>
    </div>
  );
}
