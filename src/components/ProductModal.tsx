import { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    if (!product.inStock) return;
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs transition-opacity">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quickview-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-white hover:bg-rose-500 hover:text-white text-slate-900 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer"
          aria-label="Cerrar vista rápida"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-slate-100 relative min-h-[260px] md:min-h-[400px] border-b-2 md:border-b-0 md:border-r-2 border-slate-900">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {product.discountPercentage && (
              <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-rose-500 text-white border border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                {product.discountPercentage}% OFF
              </span>
            )}
            <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-slate-900 text-white border border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
              {product.brand}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs font-black text-indigo-700 uppercase tracking-wider mb-2">
              <span className="bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">{product.category}</span>
              <div className="flex items-center gap-1 text-slate-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md font-black">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {product.name}
            </h2>

            {/* Price block */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through font-bold">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.inStock ? (
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                  En Stock
                </span>
              ) : (
                <span className="text-xs font-black text-rose-800 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded-md">
                  Agotado
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-medium">
              {product.description}
            </p>

            {/* Features list */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-1.5 mb-6">
                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                  Características destacadas:
                </h4>
                <ul className="text-xs text-slate-700 space-y-1 font-medium">
                  {product.features.map((feat, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-4 border-t-2 border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-slate-900 rounded-xl p-1 bg-slate-50 shadow-[2px_2px_0px_0px_#0f172a]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || !product.inStock}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-900 font-black hover:bg-slate-200 disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-black text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-900 font-black hover:bg-slate-200 disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                id="modal-add-to-cart-btn"
                disabled={!product.inStock}
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-xl font-black text-xs flex items-center justify-center gap-2 border-2 border-slate-900 transition-all cursor-pointer ${
                  !product.inStock
                    ? 'bg-slate-200 text-slate-400 border-slate-300 shadow-none cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-500 text-white shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'bg-indigo-600 text-white hover:bg-slate-900 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado al carrito!</span>
                  </>
                ) : !product.inStock ? (
                  <span>Producto Agotado</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Añadir ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-bold text-slate-700 text-center">
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <Truck className="w-3.5 h-3.5 text-slate-900" />
                <span>Envío express</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                <span>Garantía oficial</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <RotateCcw className="w-3.5 h-3.5 text-slate-900" />
                <span>Devolución 30d</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
