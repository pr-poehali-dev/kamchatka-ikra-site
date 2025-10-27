import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import CartSheet from '@/components/CartSheet';
import OrderDialog from '@/components/OrderDialog';
import ContactDialog from '@/components/ContactDialog';
import { products } from '@/lib/products';
import { addToCart } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';

export default function Caviar() {
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight
    });
    
    window.dispatchEvent(new Event('cart-updated'));
    
    toast({
      title: 'Товар добавлен',
      description: `${product.name} добавлен в корзину`
    });
  };

  const categories = [
    { id: 'all', name: 'Всё' },
    { id: 'premium', name: 'Премиум' },
    { id: 'classic', name: 'Классика' },
    { id: 'gift', name: 'Подарочные' },
    { id: 'wholesale', name: 'Оптом' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Shell" className="text-white" size={20} />
            </div>
            <span className="font-heading font-bold text-lg">Камчатская икра</span>
          </a>
          
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/" className="hover:text-primary transition-colors">Главная</a>
            <a href="/caviar" className="text-primary font-medium">Икра</a>
          </nav>

          <div className="flex items-center gap-3">
            <ContactDialog />
            <CartSheet onCheckout={() => setOrderDialogOpen(true)} />
          </div>
        </div>
      </header>

      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-heading text-5xl font-bold mb-4 text-center animate-fade-in">
            Каталог икры
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-8 animate-fade-in">
            Свежая камчатская икра высшего качества
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow animate-fade-in">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.category === 'premium' && (
                    <Badge className="absolute top-4 right-4 bg-primary">
                      Премиум
                    </Badge>
                  )}
                  {product.category === 'gift' && (
                    <Badge className="absolute top-4 right-4 bg-amber-500">
                      Подарок
                    </Badge>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" className="text-primary flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                      <p className="text-sm text-muted-foreground">{product.weight}</p>
                    </div>
                    {product.inStock ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        В наличии
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-400">
                        Нет в наличии
                      </Badge>
                    )}
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? (
                      <>
                        <Icon name="ShoppingCart" className="mr-2" size={18} />
                        В корзину
                      </>
                    ) : (
                      'Нет в наличии'
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading text-3xl font-bold mb-6">
            Не нашли что искали?
          </h2>
          <p className="text-muted-foreground mb-8">
            Оставьте заявку и мы поможем подобрать идеальный вариант
          </p>
          <ContactDialog />
        </div>
      </section>

      <OrderDialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen} />
    </div>
  );
}
