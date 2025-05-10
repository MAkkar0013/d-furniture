from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from flask_cors import CORS
from flask_mail import Mail, Message
import os

app = Flask(__name__, static_folder='../client/build')

f_folder = os.path.join(os.getcwd(), "..","client")
b_folder = os.path.join(f_folder, "build")


app.config['SECRET_KEY'] = 'your-very-secure-secret-key-12345'
uri = os.getenv("DATABASE_URL")
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_DATABASE_URI'] = uri or 'sqlite:///elitefurniture.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True  # Только SSL для Gmail
app.config['MAIL_USE_TLS'] = False  # Отключаем TLS
app.config['MAIL_USERNAME'] = 'kaleyev.makar@gmail.com'
app.config['MAIL_PASSWORD'] = 'xwjm nhgk urio eqen'
app.config['MAIL_DEFAULT_SENDER'] = 'kaleyev.makar@gmail.com' # Для отладки

mail = Mail(app)

# Настройки CORS
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:3000",  # Укажите ваш фронтенд-адрес
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text)
    product = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class QuizSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    furniture_type = db.Column(db.String(100))
    style = db.Column(db.String(100))
    budget = db.Column(db.String(100))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

def token_optional(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        current_user = None
        
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            try:
                data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                current_user = User.query.get(data['id'])
            except:
                pass
        
        return f(current_user, *args, **kwargs)
    return decorated

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['id'])
            if not current_user:
                return jsonify({'error': 'User not found!'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token!'}), 401
        except Exception as e:
            return jsonify({'error': 'Token verification failed!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

@app.route('/', defaults={"filename": ""})
@app.route('/<path:filename>')
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(b_folder, filename)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data or 'name' not in data:
        return jsonify({'error': 'Missing required fields!'}), 400
    
    try:
        # Проверка и создание таблиц при необходимости
        with app.app_context():
            inspector = db.inspect(db.engine)
            if not inspector.has_table('user'):
                db.create_all()
        
        # Проверка существования пользователя
        existing_user = db.session.execute(
            db.select(User).where(User.email == data['email'])
        ).scalar_one_or_none()
        
        if existing_user:
            return jsonify({'error': 'Email already registered!'}), 409
        
        # Создание нового пользователя
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        new_user = User(
            email=data['email'],
            password=hashed_password,
            name=data['name'],
            phone=data.get('phone', '')
        )
        db.session.add(new_user)
        db.session.commit()
        
        # Генерация токена
        token = jwt.encode({
            'id': new_user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        
        return jsonify({
            'message': 'Registration successful!',
            'token': token,
            'user': {
                'id': new_user.id,
                'email': new_user.email,
                'name': new_user.name
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        app.logger.error(f'Registration error: {str(e)}')
        return jsonify({'error': 'Registration failed. Please try again.'}), 500
    
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email and password required!'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid credentials!'}), 401
    
    token = jwt.encode({
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config['SECRET_KEY'])
    
    return jsonify({
        'message': 'Login successful!',
        'token': token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'phone': user.phone
        }
    })

@app.route('/user', methods=['GET'])
@token_required
def get_user(current_user):
    return jsonify({
        'id': current_user.id,
        'email': current_user.email,
        'name': current_user.name,
        'phone': current_user.phone
    })

@app.route('/api/send-request', methods=['POST'])
@token_required  # Добавляем декоратор проверки токена
def send_request(current_user):
    try:
        data = request.get_json()
        
        # Добавляем информацию о пользователе в данные
        data['user_id'] = current_user.id
        data['username'] = current_user.name
        
        msg = Message(
            subject=f'Заявка на товар: {data["product"]}',
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[app.config['MAIL_DEFAULT_SENDER']]
        )
        
        msg.body = f"""
        Новая заявка от пользователя {current_user.name} ({current_user.email})
        
        Товар: {data['product']}
        Категория: {data['productCategory']}
        Цена: {data['productPrice']}
        
        Контактные данные:
        Телефон: {data['tel']}
        
        Дополнительное сообщение:
        {data['text-message']}
        """
        
        mail.send(msg)
        
        # Сохраняем заявку в БД
        new_request = Request(
            user_id=current_user.id,
            name=data['name'],
            phone=data['tel'],
            email=data['email'],
            message=data['text-message'],
            product=data['product']
        )
        db.session.add(new_request)
        db.session.commit()
        
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/requests', methods=['POST'])
@token_optional
def handle_request(current_user):
    data = request.get_json()
    
    if not data or 'name' not in data or 'phone' not in data or 'product' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        new_request = Request(
            user_id=current_user.id if current_user else None,
            name=data['name'],
            phone=data['phone'],
            email=data.get('email', ''),
            message=data.get('message', ''),
            product=data['product']
        )
        
        db.session.add(new_request)
        db.session.commit()
        
        # Здесь можно добавить отправку email через ваш SMTP
        # или подключить SendGrid/другой сервис
        
        return jsonify({'message': 'Request created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/quiz', methods=['POST'])
def handle_quiz():
    try:
        data = request.get_json()
        
        # Проверяем обязательные поля
        if not data or 'name' not in data or 'phone' not in data:
            return jsonify({'error': 'Missing required fields'}), 400

        # Формируем и отправляем письмо
        msg = Message(
            subject=f"Новая заявка на квиз от {data.get('name')}",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[app.config['MAIL_DEFAULT_SENDER']],
            body=f"""
            Данные квиза:
            Имя: {data.get('name')}
            Телефон: {data.get('phone')}
            Email: {data.get('email', 'не указан')}
            Тип мебели: {data.get('furnitureType', 'не указан')}
            Стиль: {data.get('style', 'не указан')}
            Бюджет: {data.get('budget', 'не указан')}
            """
        )
        mail.send(msg)

        return jsonify({'message': 'Quiz submitted successfully'}), 200

    except Exception as e:
        app.logger.error(f'Error submitting quiz: {str(e)}')
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')