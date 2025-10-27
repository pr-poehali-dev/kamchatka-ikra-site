import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { products } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';

export default function OrderFormDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

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

    if (selectedProducts.length === 0) {
      toast({
        title: 'Ошибка',
        description: 'Выберите хотя бы один товар',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    const selectedItems = products.filter(p => selectedProducts.includes(p.id));
    const orderData = {
      type: 'contact',
      name,
      phone,
      comment: `Интересующие товары:\n${selectedItems.map(p => `• ${p.name} (${p.price.toLocaleString()} ₽)`).join('\n')}`
    };

    try {
      const response = await fetch('https://functions.poehali.dev/fedd2fae-906d-4123-9212-69745eb0a734', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        
        setName('');
        setPhone('');
        setSelectedProducts([]);
        setOpen(false);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg px-8 py-6">
          <Icon name="Send" className="mr-2" size={20} />
          Оставить заявку
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Оставить заявку</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="order-name">Имя *</Label>
              <Input
                id="order-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                required
              />
            </div>

            <div>
              <Label htmlFor="order-phone">Телефон *</Label>
              <Input
                id="order-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Выберите интересующие товары *</Label>
            <div className="max-h-96 overflow-y-auto border rounded-lg p-4 space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex items-start gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                  <Checkbox
                    id={`product-${product.id}`}
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => handleProductToggle(product.id)}
                  />
                  <label
                    htmlFor={`product-${product.id}`}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.weight}</p>
                        <p className="text-primary font-bold">{product.price.toLocaleString()} ₽</p>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Выбрано товаров: {selectedProducts.length}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex gap-2">
              <Icon name="Info" className="text-amber-600 flex-shrink-0" size={20} />
              <p className="text-sm text-amber-900">
                Наш менеджер свяжется с вами для уточнения деталей заказа и расчёта стоимости доставки
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
                Отправить заявку
                <Icon name="Check" className="ml-2" size={18} />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
