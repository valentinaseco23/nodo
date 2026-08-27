import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l-2 border-slate-900 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b-2 border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <ShoppingBag className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">Tu Carrito</h2>
                <p className="text-xs text-slate-500 font-medium">{items.length} productos seleccionados</p>
              </div>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 text-slate-900 hover:bg-rose-500 hover:text-white rounded-xl border-2 border-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-amber-300 border-2 border-slate-900 flex items-center justify-center mx-auto mb-3 text-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="text-base font-black text-slate-900">El carrito está vacío</p>
                <p className="text-xs text-slate-600 mt-1 mb-6 font-medium">Explora el catálogo y añade los artículos que te gusten.</p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-black rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  id={`cart-item-${product.id}`}
                  className="flex gap-4 p-3 bg-white rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-900"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-black text-indigo-700 uppercase bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 line-clamp-1 mt-1">
                          {product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-slate-900">
                        ${(product.price * quantity).toFixed(2)}
                      </span>

                      <div className="flex items-center border-2 border-slate-900 rounded-lg bg-white shadow-[1px_1px_0px_0px_#0f172a]">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 text-slate-900 hover:bg-slate-100 rounded-l transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-black text-slate-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 text-slate-900 hover:bg-slate-100 rounded-r transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals */}
          {items.length > 0 && (
            <div className="p-6 border-t-2 border-slate-900 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-700 font-bold">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-black text-slate-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">Gratis</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t-2 border-slate-300">
                  <span>Total estimado</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClearCart}
                  className="px-3 py-2.5 rounded-xl border-2 border-slate-900 text-slate-900 text-xs font-black hover:bg-white transition-colors cursor-pointer"
                >
                  Vaciar
                </button>
                <button
                  onClick={() => alert(`¡Gracias por tu compra simulada de $${total.toFixed(2)}!`)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Proceder al pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
