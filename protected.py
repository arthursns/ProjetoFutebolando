from flask import Blueprint
from flask_login import login_required
from app import bd

protected = Blueprint('protected', __name__)

@protected.route('/paginasemlogin')
@login_required
def index():
    return 'Sem login'