import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { getCart, updateQuantity, removeFromCart, clearCart, CartState } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';

interface CartSheetProps {
  onCheckout?: () => void;
}

export default function CartSheet({ onCheckout }: CartSheetProps) {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0 });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();
    
    const handleStorageChange = () => loadCart();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleStorageChange);
    };
  }, []);

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
    loadCart();
    window.dispatchEvent(new Event('cart-updated'));
    toast({
      title: 'Товар удалён',
      description: 'Товар удалён из корзины'
    });
  };

  const handleClearCart = () => {
    clearCart();
    loadCart();
    window.dispatchEvent(new Event('cart-updated'));
    toast({
      title: 'Корзина очищена',
      description: 'Все товары удалены из корзины'
    });
  };

  const handleCheckout = () => {
    setOpen(false);
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Icon name="ShoppingCart" size={20} />
          {cart.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl">Корзина</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-120px)]">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-2">Корзина пуста</p>
              <p className="text-sm text-muted-foreground">Добавьте товары из каталога</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.weight}</p>
                          <p className="text-primary font-bold">{item.price.toLocaleString()} ₽</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Icon name="Trash2" size={18} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                        <span className="ml-auto font-bold">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-2xl font-bold text-primary">
                    {cart.total.toLocaleString()} ₽
                  </span>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Оформить заказ
                    <Icon name="ArrowRight" className="ml-2" size={18} />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={handleClearCart}
                  >
                    Очистить корзину
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
