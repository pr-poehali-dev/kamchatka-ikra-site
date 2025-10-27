import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function DeliveryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:text-primary transition-colors">
          Доставка
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl mb-4">Доставка по России</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Truck" className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Доставка по всей России</h3>
              <p className="text-muted-foreground">
                Осуществляем доставку свежей икры во все регионы России. Специальная упаковка 
                с охлаждающими элементами сохраняет продукт в идеальном состоянии.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Package" className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Специальная упаковка</h3>
              <p className="text-muted-foreground">
                Каждая партия упаковывается в термо-контейнеры с гель-аккумуляторами холода. 
                Гарантируем сохранность продукта на протяжении всей доставки.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Сроки доставки</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Москва и МО — 1-2 дня</li>
                <li>• Санкт-Петербург — 2-3 дня</li>
                <li>• Крупные города — 3-5 дней</li>
                <li>• Другие регионы — 5-7 дней</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="CreditCard" className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Стоимость</h3>
              <p className="text-muted-foreground">
                Стоимость доставки рассчитывается индивидуально в зависимости от региона и объема заказа.
                При заказе от 13 кг — доставка по России бесплатно!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Shield" className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">
                Если продукт был поврежден при транспортировке или не соответствует заявленному качеству — 
                вернем деньги или заменим товар.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="AlertCircle" className="text-amber-600 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">Важно знать</h4>
                <p className="text-sm text-amber-800">
                  Икра отправляется только в будние дни, чтобы избежать задержек на складах 
                  транспортных компаний в выходные. Рекомендуем планировать получение заказа заранее.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-center text-muted-foreground mb-4">
              Остались вопросы? Свяжитесь с нами!
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <a href="tel:+79051785769">
                  <Icon name="Phone" className="mr-2" size={18} />
                  Позвонить
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://wa.me/79051785769" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" className="mr-2" size={18} />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://t.me/79051785769" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" className="mr-2" size={18} />
                  Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
