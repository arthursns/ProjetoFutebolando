import time 

from app import app, bd
from flask import render_template, redirect, url_for, request, send_from_directory, flash, jsonify
from forms import FormularioCadastro, FormularioLogin
from tools import get_forms_data
from models import Aluno
from email_sender import send_email

from base64 import b64encode

@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')

@app.route('/cadastre-se')
def cadastro():
    form = FormularioCadastro()
    return render_template("cadastro.html", form=form)


@app.route('/cadastro', methods=["POST"])
def cadastrar():
    form = FormularioCadastro(request.form)
    if not form.validate_on_submit():
        erros_envio = form.errors
        return jsonify({"message": erros_envio}), 200
    
    data_form = get_forms_data(form)
    aluno = Aluno.query.filter_by(cpf=data_form['cpf']).first()
    if aluno:
        return jsonify({"message": "Aluno já existente"}), 200
    else:
        nova_matricula = Aluno(**data_form)

        img = request.files['file']
        if img:
            if img.filename.split(".")[-1].lower() in ["png", "jpg", "jpeg"]:
                image_data = img.read()
                nova_matricula.image = image_data
            else:
                return jsonify({"message": "A imagem inserida é inválida"}), 200

        try:
            send_email("Olá seja bem vindo, ao projeto Futbolando :)", nova_matricula.email,"criação de conta realizada!")
        except:
            pass
  
        bd.session.add(nova_matricula)
        bd.session.commit()
    
        return jsonify({"message": "Cadastro Realizado"}), 200


@app.route('/imagens/<nome_arquivo>')
def imagem(nome_arquivo):
    return send_from_directory('imagens', nome_arquivo)


@app.route('/lista-alunos')
def lista_alunos():
    alunos = Aluno.query.order_by(Aluno.id)
    return render_template("alunos.html", alunos=alunos)

@app.route('/perfil/<int:id>')
def perfil_aluno(id):
    perfil = Aluno.query.filter_by(id=id).first()
    if perfil.image:
        imagem = b64encode(perfil.image).decode("utf-8")
        return render_template("perfil.html", image=imagem)
    return render_template("perfil.html")