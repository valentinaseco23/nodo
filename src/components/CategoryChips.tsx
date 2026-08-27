import { Category } from '../types';
import { CATEGORIES } from '../data/products';
import { 
  Sparkles, 
  Laptop, 
  Shirt, 
  Home, 
  Glasses, 
  Trophy 
} from 'lucide-react';

interface CategoryChipsProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  categoryCounts: Record<Category, number>;
}

export function CategoryChips({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}: CategoryChipsProps) {
  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'Todos':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Tecnología':
        return <Laptop className="w-3.5 h-3.5" />;
      case 'Ropa':
        return <Shirt className="w-3.5 h-3.5" />;
      case 'Hogar':
        return <Home className="w-3.5 h-3.5" />;
      case 'Accesorios':
        return <Glasses className="w-3.5 h-3.5" />;
      case 'Deportes':
        return <Trophy className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div id="category-chips-bar" className="w-full overflow-x-auto scrollbar-none pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-max">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              id={`category-chip-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer select-none border-2 border-slate-900 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-[3px_3px_0px_0px_#0f172a] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white text-slate-800 hover:bg-slate-100 shadow-[2px_2px_0px_0px_#0f172a] hover:shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#0f172a]'
              }`}
            >
              <span className={`transition-colors ${isActive ? 'text-amber-300' : 'text-slate-500 group-hover:text-indigo-600'}`}>
                {getCategoryIcon(cat)}
              </span>
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-black border transition-colors ${
                  isActive
                    ? 'bg-indigo-800 text-white border-indigo-900'
                    : 'bg-slate-100 text-slate-700 border-slate-300 group-hover:bg-slate-200'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
