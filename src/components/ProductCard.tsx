import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';

export interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isFavorite = false,
  onToggleFavorite,
  viewMode = 'grid'
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  if (viewMode === 'list') {
    return (
      <div
        id={`product-card-list-${product.id}`}
        onClick={() => onQuickView(product)}
        className="group bg-white rounded-2xl border-2 border-slate-900 overflow-hidden shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#0f172a] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col sm:flex-row items-center p-4 gap-5 cursor-pointer"
      >
        {/* Thumbnail Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-900">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discountPercentage && (
              <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-rose-500 text-white border border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]">
                -{product.discountPercentage}%
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-indigo-600 text-white border border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]">
                NUEVO
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-slate-900 text-xs font-black bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-slate-500 text-[10px]">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">
              {product.name}
            </h3>

            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 mt-4 pt-3 border-t-2 border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-bold">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFavoriteClick}
                className={`p-2 rounded-xl border-2 border-slate-900 transition-all ${
                  isFavorite 
                    ? 'bg-rose-500 text-white shadow-[2px_2px_0px_0px_#0f172a]' 
                    : 'bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-500 shadow-[2px_2px_0px_0px_#0f172a]'
                }`}
                aria-label="Guardar en favoritos"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                disabled={!product.inStock}
                onClick={handleAdd}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 border-2 border-slate-900 transition-all shadow-[2px_2px_0px_0px_#0f172a] ${
                  !product.inStock
                    ? 'bg-slate-100 text-slate-400 border-slate-300 shadow-none cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-500 text-white shadow-[1px_1px_0px_0px_#0f172a]'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Añadido!</span>
                  </>
                ) : !product.inStock ? (
                  <span>Agotado</span>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl border-2 border-slate-900 overflow-hidden shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#0f172a] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden border-b-2 border-slate-900">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercentage && (
            <span className="px-2 py-0.5 text-[10px] font-black rounded-lg bg-rose-500 text-white border border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 text-[10px] font-black rounded-lg bg-amber-300 text-slate-900 border border-slate-900 shadow-[1.5px_1.5px_0px_0px_#0f172a]">
              NUEVO
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-xl border-2 border-slate-900 flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-[2px_2px_0px_0px_#0f172a]'
              : 'bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-500 shadow-[2px_2px_0px_0px_#0f172a]'
          }`}
          aria-label="Favorito"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hidden sm:block">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 px-3 bg-white hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-black rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Vista Rápida
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md uppercase tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-900 font-black text-xs bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-[11px]">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-black text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors mt-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t-2 border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through font-bold">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {!product.inStock && (
              <span className="text-[10px] font-black text-rose-600 block">
                Agotado
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAdd}
            className={`p-2.5 rounded-xl border-2 transition-all duration-150 flex items-center justify-center cursor-pointer ${
              !product.inStock
                ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-500 text-white border-slate-900 shadow-[1px_1px_0px_0px_#0f172a]'
                : 'bg-indigo-600 text-white border-slate-900 hover:bg-slate-900 shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
            }`}
            aria-label="Añadir al carrito"
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
