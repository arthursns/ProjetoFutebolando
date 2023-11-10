from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_pyfile('config.py')

bd = SQLAlchemy(app)

csrf = CSRFProtect(app)

login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(id):
    return Aluno.query.get(int(id))


from auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

from protected import protected as protected_blueprint
app.register_blueprint(protected_blueprint)

from views import *

if __name__ == '__main__':
    app.run(debug=True)
    