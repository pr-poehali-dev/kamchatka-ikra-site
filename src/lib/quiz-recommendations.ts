import { products, Product } from './products';

interface QuizAnswer {
  question: number;
  answer: string;
}

export function getRecommendations(answers: QuizAnswer[]): Product[] {
  const answerMap = new Map(answers.map(a => [a.question, a.answer]));
  
  const type = answerMap.get(0);
  const occasion = answerMap.get(1);
  const budget = answerMap.get(2);
  const taste = answerMap.get(3);
  const size = answerMap.get(4);
  const quantity = answerMap.get(5);
  const experience = answerMap.get(6);
  
  const recommendations: Product[] = [];
  
  if (type === 'gift') {
    recommendations.push(
      products.find(p => p.id === 'gift-set-luxury')!,
      products.find(p => p.id === 'beluga-imperial')!,
      products.find(p => p.id === 'gift-set-premium')!
    );
  }
  
  else if (budget === 'unlimited' || (experience === 'expert' && budget === 'premium')) {
    recommendations.push(
      products.find(p => p.id === 'beluga-imperial')!,
      products.find(p => p.id === 'chawych-royal')!,
      products.find(p => p.id === 'osetr-classic')!
    );
  }
  
  else if (size === 'large') {
    recommendations.push(
      products.find(p => p.id === 'keta-premium')!,
      products.find(p => p.id === 'chawych-royal')!,
      products.find(p => p.id === 'beluga-imperial')!
    );
  }
  
  else if (size === 'small') {
    recommendations.push(
      products.find(p => p.id === 'nerka-elite')!,
      products.find(p => p.id === 'sevruga-select')!,
      products.find(p => p.id === 'gorbuscha-classic')!
    );
  }
  
  else if (taste === 'unique') {
    recommendations.push(
      products.find(p => p.id === 'nerka-elite')!,
      products.find(p => p.id === 'kijuch-gold')!,
      products.find(p => p.id === 'osetr-classic')!
    );
  }
  
  else if (taste === 'rich') {
    recommendations.push(
      products.find(p => p.id === 'keta-premium')!,
      products.find(p => p.id === 'osetr-classic')!,
      products.find(p => p.id === 'chawych-royal')!
    );
  }
  
  else if (taste === 'delicate') {
    recommendations.push(
      products.find(p => p.id === 'beluga-imperial')!,
      products.find(p => p.id === 'kijuch-gold')!,
      products.find(p => p.id === 'gorbuscha-classic')!
    );
  }
  
  else if (budget === 'budget') {
    recommendations.push(
      products.find(p => p.id === 'gorbuscha-classic')!,
      products.find(p => p.id === 'kijuch-gold')!,
      products.find(p => p.id === 'keta-premium')!
    );
  }
  
  else if (budget === 'premium') {
    recommendations.push(
      products.find(p => p.id === 'chawych-royal')!,
      products.find(p => p.id === 'nerka-elite')!,
      products.find(p => p.id === 'osetr-classic')!
    );
  }
  
  else if (quantity === '13kg') {
    recommendations.push(
      products.find(p => p.id === 'wholesale-13kg')!,
      products.find(p => p.id === 'keta-premium')!,
      products.find(p => p.id === 'gorbuscha-classic')!
    );
  }
  
  else if (occasion === 'business') {
    recommendations.push(
      products.find(p => p.id === 'beluga-imperial')!,
      products.find(p => p.id === 'gift-set-luxury')!,
      products.find(p => p.id === 'osetr-classic')!
    );
  }
  
  else {
    recommendations.push(
      products.find(p => p.id === 'keta-premium')!,
      products.find(p => p.id === 'gorbuscha-classic')!,
      products.find(p => p.id === 'gift-set-premium')!
    );
  }
  
  return recommendations.filter(Boolean);
}
