import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send quiz results and order requests to Telegram
    Args: event with httpMethod, body containing message data
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Telegram credentials not configured'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    message_type = body_data.get('type', 'order')
    
    if message_type == 'quiz':
        answers = body_data.get('answers', [])
        message = "🎯 Новая заявка с квиза!\n\n"
        
        questions_map = {
            0: "Какую икру ищет",
            1: "Повод покупки",
            2: "Бюджет на кг",
            3: "Вкусовые предпочтения",
            4: "Размер икринок",
            5: "Объем покупки",
            6: "Опыт с морепродуктами"
        }
        
        for ans in answers:
            q_num = ans.get('question', 0)
            q_text = questions_map.get(q_num, f"Вопрос {q_num + 1}")
            message += f"• {q_text}: {ans.get('answer', 'не указано')}\n"
        
        if body_data.get('recommendation'):
            message += f"\n✅ Рекомендация: {body_data['recommendation']}"
        
        if body_data.get('contact'):
            message += f"\n📞 Контакт: {body_data['contact']}"
    
    elif message_type == 'order':
        message = "🛒 Новый заказ!\n\n"
        
        if body_data.get('products'):
            message += "Товары:\n"
            for prod in body_data['products']:
                message += f"• {prod.get('name', 'Товар')} - {prod.get('quantity', 1)} шт. ({prod.get('price', 0)} ₽)\n"
        
        if body_data.get('total'):
            message += f"\n💰 Итого: {body_data['total']} ₽"
        
        if body_data.get('contact'):
            message += f"\n📞 Контакт: {body_data['contact']}"
        
        if body_data.get('delivery'):
            message += f"\n🚚 Доставка: {body_data['delivery']}"
    
    elif message_type == 'contact':
        message = "📩 Новая заявка на обратную связь!\n\n"
        
        if body_data.get('name'):
            message += f"Имя: {body_data['name']}\n"
        if body_data.get('phone'):
            message += f"Телефон: {body_data['phone']}\n"
        if body_data.get('email'):
            message += f"Email: {body_data['email']}\n"
        if body_data.get('comment'):
            message += f"Комментарий: {body_data['comment']}\n"
    
    else:
        message = body_data.get('message', 'Новое сообщение')
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }
    
    data = urllib.parse.urlencode(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            if result.get('ok'):
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'message': 'Sent to Telegram'})
                }
            else:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Telegram API error', 'details': result})
                }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
