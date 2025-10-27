import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { getCart, clearCart } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderDialog({ open, onOpenChange }: OrderDialogProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    const cart = getCart();
    const orderData = {
      type: 'order',
      products: cart.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity,
        weight: item.weight
      })),
      total: cart.total,
      contact: `${name}, ${phone}`,
      delivery: address || 'Самовывоз',
      comment: comment
    };

    try {
      const response = await fetch('https://functions.poehali.dev/fedd2fae-906d-4123-9212-69745eb0a734', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        toast({
          title: 'Заказ оформлен!',
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        
        clearCart();
        window.dispatchEvent(new Event('cart-updated'));
        
        setName('');
        setPhone('');
        setAddress('');
        setComment('');
        onOpenChange(false);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: 'Ошибка отправки',
        description: 'Попробуйте позвонить по телефону +7 (905) 178-57-69',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const cart = getCart();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Оформление заказа</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Итого к оплате:</p>
            <p className="text-2xl font-bold text-primary">{cart.total.toLocaleString()} ₽</p>
          </div>

          <div>
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Иванов"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Адрес доставки</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Город, улица, дом, квартира"
              rows={2}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Оставьте пустым для самовывоза
            </p>
          </div>

          <div>
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Пожелания по заказу"
              rows={2}
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex gap-2">
              <Icon name="Info" className="text-amber-600 flex-shrink-0" size={20} />
              <p className="text-sm text-amber-900">
                После оформления с вами свяжется менеджер для подтверждения заказа
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                Отправка...
              </>
            ) : (
              <>
                Оформить заказ
                <Icon name="Check" className="ml-2" size={18} />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
