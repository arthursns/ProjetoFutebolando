from functools import wraps
from flask import session, url_for, redirect, flash
import re

def get_forms_data(form):
    return {
        'nome': remover_simbolos(form.nome.data, 0),
        'nome_responsavel': remover_simbolos(form.nome_responsavel.data, 0),
        'cpf': remover_simbolos(form.cpf.data, 1),
        'telefone': remover_simbolos(form.telefone.data, 1),
        'email': form.email.data,
        'observacoes': form.observacoes.data,
        'cep': remover_simbolos(form.cep.data, 1),
        'bairro': form.bairro.data,
        'rua': form.rua.data,
        'numero_endereco': form.numero_endereco.data,
        'data_nascimento': form.data_nascimento.data,
    }

def remover_simbolos(string: str, restrito: int) -> str:
    if restrito == 1:
        return re.sub(r'[^0-9]', '', string)
    if restrito == 0:
        return re.sub(r'[^a-zA-ZÀ-ÿ ]', '', string)
    


def login_admin_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if "admin_log" not in session or session["admin_log"] is None:
            proxima = url_for(function.__name__, id=kwargs.get("id"))
            flash("Faça login como administrador para acessar esta página", "danger")
            return redirect(url_for("login_adm", proxima=proxima))
        return function(*args, **kwargs)

    return wrapper