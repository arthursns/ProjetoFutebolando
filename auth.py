from flask import Blueprint, render_template, redirect, url_for, request
from forms import FormularioLogin, FormularioCadastroUser
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user
from models import Aluno
from app import bd

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['GET'])
def signup():
    cadUser = FormularioCadastroUser()
    return render_template("cadastro-usuario.html", cadUser=cadUser)

@auth.route('/signup', methods=['POST'])
def signup_post():
    cadUser = FormularioCadastroUser(request.form)
    cpf = cadUser.cpf.data
    email = cadUser.email.data
    password = cadUser.password.data
    nome = cadUser.nome.data

    user = Aluno.query.filter_by(email=email).first()

    if user:
        return redirect(url_for('auth.signup'))

    new_user = Aluno(email=email, cpf = cpf, nome=nome, password=generate_password_hash(password, method='pbkdf2'))

    bd.session.add(new_user)
    bd.session.commit()

    return redirect(url_for('auth.login'))

@auth.route('/logout')
def logout():
    return 'Logout'

@auth.route('/login', methods=['GET'])
def login():
    login = FormularioLogin()
    return render_template("login.html", login=login)

@auth.route('/login', methods=['POST'])
def login_post():
    login = FormularioLogin(request.form)
    email = login.email.data
    password = login.password.data

    user = Aluno.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        #flash('Senha ou email incorreta')
        return redirect(url_for('auth.login'))

    login_user(user)
    return redirect(url_for('protected.index'))