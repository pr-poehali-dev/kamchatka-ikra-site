import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import CartSheet from '@/components/CartSheet';
import OrderDialog from '@/components/OrderDialog';
import ContactDialog from '@/components/ContactDialog';
import DeliveryDialog from '@/components/DeliveryDialog';
import DeliveryDialogMobile from '@/components/DeliveryDialogMobile';
import OrderFormDialog from '@/components/OrderFormDialog';
import { useToast } from '@/hooks/use-toast';
import { getRecommendations } from '@/lib/quiz-recommendations';

interface QuizAnswer {
  question: number;
  answer: string;
}

interface QuizOption {
  value: string;
  label: string;
  icon?: string;
}

const quizQuestions = [
  {
    question: 'Какую икру вы ищете?',
    options: [
      { value: 'kamchatka', label: 'Камчатская премиум', icon: 'Star' },
      { value: 'gift', label: 'В подарок', icon: 'Gift' },
      { value: 'personal', label: 'Для себя', icon: 'User' }
    ]
  },
  {
    question: 'По какому случаю планируется покупка?',
    options: [
      { value: 'holiday', label: 'Праздник', icon: 'PartyPopper' },
      { value: 'everyday', label: 'Для повседневного стола', icon: 'Home' },
      { value: 'business', label: 'Деловое мероприятие', icon: 'Briefcase' },
      { value: 'special', label: 'Особый случай', icon: 'Heart' }
    ]
  },
  {
    question: 'Какой у вас бюджет на кг?',
    options: [
      { value: 'budget', label: 'До 4 000 ₽', icon: 'Wallet' },
      { value: 'medium', label: '4 000 – 5 000 ₽', icon: 'CreditCard' },
      { value: 'premium', label: 'От 5 000 ₽', icon: 'Diamond' },
      { value: 'unlimited', label: 'Без ограничений', icon: 'Sparkles' }
    ]
  },
  {
    question: 'Какие вкусы вам нравятся?',
    options: [
      { value: 'delicate', label: 'Нежные', icon: 'Flower2' },
      { value: 'classic', label: 'Классические', icon: 'CheckCircle' },
      { value: 'rich', label: 'Насыщенные', icon: 'Flame' },
      { value: 'unique', label: 'Уникальные', icon: 'Gem' }
    ]
  },
  {
    question: 'Размер икринок?',
    options: [
      { value: 'small', label: 'Мелкие', icon: 'Circle' },
      { value: 'medium', label: 'Средние', icon: 'Circle' },
      { value: 'large', label: 'Крупные', icon: 'Circle' },
      { value: 'any', label: 'Не важно', icon: 'Minus' }
    ]
  },
  {
    question: 'Сколько планируете купить?',
    options: [
      { value: '1kg', label: '1 кг', icon: 'Package' },
      { value: '3kg', label: '3 кг', icon: 'Package' },
      { value: '5kg', label: '5 кг', icon: 'Package' },
      { value: '13kg', label: '13 кг и более', icon: 'Boxes' }
    ]
  },
  {
    question: 'Ваш опыт с морепродуктами?',
    options: [
      { value: 'beginner', label: 'Новичок', icon: 'AlertCircle' },
      { value: 'occasional', label: 'Иногда покупаю', icon: 'ThumbsUp' },
      { value: 'regular', label: 'Регулярно покупаю', icon: 'TrendingUp' },
      { value: 'expert', label: 'Эксперт', icon: 'Award' }
    ]
  }
];



export default function Index() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, { question: currentStep, answer }];
    setAnswers(newAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const recommended = getRecommendations(newAnswers);
      setRecommendations(recommended);
      setShowResults(true);
      sendQuizToTelegram(newAnswers);
    }
  };

  const sendQuizToTelegram = async (quizAnswers: QuizAnswer[]) => {
    try {
      await fetch('https://functions.poehali.dev/fedd2fae-906d-4123-9212-69745eb0a734', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quiz',
          answers: quizAnswers,
          recommendation: 'Автоматически подобрано'
        })
      });
    } catch (error) {
      console.error('Failed to send quiz results', error);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
  };

  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Shell" className="text-white" size={20} />
            </div>
            <span className="font-heading font-bold text-lg hidden sm:inline">Камчатская икра премиум-класса</span>
            <span className="font-heading font-bold text-base sm:hidden">Камчатская икра</span>
          </div>
          
          <nav className="hidden md:flex gap-6 text-sm items-center">
            <a href="/" className="hover:text-primary transition-colors">Главная</a>
            <a href="/caviar" className="hover:text-primary transition-colors">Икра</a>
            <DeliveryDialog />
            <a href="#quiz" className="hover:text-primary transition-colors">Подбор товара</a>
          </nav>

          <nav className="md:hidden flex gap-4 text-sm items-center">
            <a href="/" className="hover:text-primary transition-colors">Главная</a>
            <a href="/caviar" className="hover:text-primary transition-colors">Икра</a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:text-primary transition-colors"
            >
              <Icon name="Menu" size={20} />
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+79051785769" className="text-sm font-medium">+7 (905) 178-57-69</a>
            <ContactDialog />
            <CartSheet onCheckout={() => setOrderDialogOpen(true)} />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <DeliveryDialogMobile />
              <a
                href="tel:+79051785769"
                className="block py-2 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon name="Phone" size={18} />
                +7 (905) 178-57-69
              </a>
              <div className="flex gap-2 pt-2">
                <ContactDialog />
                <CartSheet onCheckout={() => setOrderDialogOpen(true)} />
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Персональный подбор икры
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Ответьте на 7 простых вопросов и получите идеальную рекомендацию
          </p>
          <Button 
            onClick={scrollToQuiz}
            size="lg" 
            className="text-lg px-8 py-6 hover:scale-105 transition-transform animate-fade-in"
          >
            Пройти подбор
            <Icon name="ArrowDown" className="ml-2" size={20} />
          </Button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-6">
                О компании
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Мы — прямые поставщики свежей камчатской икры премиум-класса. 
                Работаем напрямую с рыбозаводами на Камчатке, что позволяет гарантировать 
                абсолютную свежесть и качество продукции.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Наша икра никогда не замораживается — только охлаждение при транспортировке. 
                Сезон вылова длится всего 2 месяца в году, поэтому каждая банка — это эксклюзив.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Check" className="text-primary" size={20} />
                  <span className="font-medium">Прямые поставки с Камчатки</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Check" className="text-primary" size={20} />
                  <span className="font-medium">Никогда не замораживаем</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Check" className="text-primary" size={20} />
                  <span className="font-medium">Доставка по всей России</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Check" className="text-primary" size={20} />
                  <span className="font-medium">Гарантия качества</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/3cf5f1db-0a37-4dc7-9e45-684c93b8085d.jpg"
                alt="Икра"
                className="rounded-lg shadow-lg h-64 object-cover"
              />
              <img 
                src="https://cdn.poehali.dev/projects/c5a0e973-2c22-4703-9858-8c5d2cf6fb75/files/35ed52f9-6d71-4d5a-b665-2f9752703e04.jpg"
                alt="Икра"
                className="rounded-lg shadow-lg h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="quiz" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          {!showResults ? (
            <Card className="p-8 shadow-xl animate-fade-in">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Вопрос {currentStep + 1} из {quizQuestions.length}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 animate-slide-in">
                {quizQuestions[currentStep].question}
              </h2>

              <div className="grid gap-4">
                {quizQuestions[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all text-left flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon name={option.icon || 'Circle'} className="text-primary" size={24} />
                    </div>
                    <span className="font-medium text-lg">{option.label}</span>
                  </button>
                ))}
              </div>
            </Card>
          ) : (
            <div className="animate-fade-in">
              <Card className="p-8 shadow-xl mb-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle2" className="text-primary" size={32} />
                  </div>
                  <h2 className="font-heading text-3xl font-bold mb-2">
                    Ваш персональный подбор готов!
                  </h2>
                  <p className="text-muted-foreground">
                    На основе ваших ответов мы подобрали идеальные варианты
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {recommendations.map((rec, idx) => (
                    <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={rec.image} 
                        alt={rec.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-lg mb-2">{rec.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                        <p className="text-primary font-bold text-xl mb-4">{rec.price.toLocaleString()} ₽</p>
                        <Button className="w-full" size="sm" asChild>
                          <a href="/caviar">
                            Посмотреть в каталоге
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4 justify-center mt-8">
                  <Button onClick={resetQuiz} variant="outline" size="lg">
                    Пройти заново
                  </Button>
                  <Button size="lg" asChild>
                    <a href="/caviar">
                      Перейти в каталог
                      <Icon name="ShoppingCart" className="ml-2" size={18} />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: 'Snowflake', title: 'Никогда не мороженая', desc: 'Только свежая икра напрямую с промысла' },
              { icon: 'Truck', title: 'Свежая каждые 2 дня', desc: 'Регулярные поставки с Камчатки' },
              { icon: 'Package', title: 'Минимальная партия 13 кг', desc: 'Оптовые цены для всех' },
              { icon: 'Calendar', title: 'Сезон 2 месяца в году', desc: 'Ограниченное время для заказов' }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} className="text-primary" size={28} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Отзывы клиентов
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Анна Петрова', text: 'Невероятно свежая икра! Заказываю уже третий раз. Качество на высоте!', rating: 5 },
              { name: 'Дмитрий Соколов', text: 'Отличный сервис и быстрая доставка. Икра действительно премиум-класса.', rating: 5 },
              { name: 'Елена Волкова', text: 'Купила на праздник – все гости были в восторге! Рекомендую!', rating: 5 }
            ].map((review, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.text}"</p>
                <p className="font-semibold">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Готовы сделать заказ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Оставьте заявку, выберите интересующие товары, и наш менеджер свяжется с вами для уточнения деталей
          </p>
          <OrderFormDialog />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Камчатская икра премиум-класса</h3>
              <p className="text-gray-400 text-sm">Свежие морепродукты с Камчатки с доставкой по всей России</p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Контакты</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+79051785769" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Icon name="Phone" size={16} />
                  +7 (905) 178-57-69
                </a>
                <a href="https://t.me/79051785769" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Icon name="Send" size={16} />
                  Telegram
                </a>
                <a href="https://wa.me/79051785769" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Icon name="MessageCircle" size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Информация</h3>
              <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Камчатская икра премиум-класса. Все права защищены.</p>
            <p className="mt-2">Используя этот сайт, вы соглашаетесь с обработкой персональных данных</p>
          </div>
        </div>
      </footer>

      <OrderDialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen} />
    </div>
  );
}