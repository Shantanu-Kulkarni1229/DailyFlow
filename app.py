from flask import Flask, render_template, request, redirect, url_for, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# MongoDB configuration
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.getenv('DB_NAME', 'dailyflow')
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db['users']

@app.route('/')
def home():
    return redirect(url_for('signup'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Get form data
        first_name = request.form.get('first-name')
        last_name = request.form.get('last-name')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm-password')
        
        # Validate form data
        if not all([first_name, last_name, email, password, confirm_password]):
            return jsonify({'error': 'All fields are required'}), 400
        
        if password != confirm_password:
            return jsonify({'error': 'Passwords do not match'}), 400
        
        if len(password) < 8:
            return jsonify({'error': 'Password must be at least 8 characters'}), 400
        
        # Check if user already exists
        if users_collection.find_one({'email': email}):
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create new user
        hashed_password = generate_password_hash(password)
        user_data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': hashed_password,
            'created_at': datetime.datetime.utcnow()
        }
        
        # Insert user into MongoDB
        result = users_collection.insert_one(user_data)
        
        if result.inserted_id:
            return jsonify({'success': True, 'message': 'Registration successful'}), 201
        else:
            return jsonify({'error': 'Registration failed'}), 500
    
    # For GET request, serve the signup page
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)