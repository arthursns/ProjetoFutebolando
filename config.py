import os

SQLALCHEMY_DATABASE_URI = \
    '{sgbd}://{user}:{password}@{server}:{port}/{database}'.format(
        sgbd = 'mysql',
        user='root',
        password='',
        server='127.0.0.1',
        port= 3306, # 5432
        database='Futebolando'
    )

SECRET_KEY = 'FutebolandoItapevi'
# RECAPTCHA_PRIVATE_KEY = '6Ld0loonAAAAABPSHzKbFJLdRf9Y_ihVw9tPAMXq'
# RECAPTCHA_PUBLIC_KEY = '6Ld0loonAAAAAA3uvfvfC2XMmCRmfBcJklUbwY3t'
DIR_PATH = os.path.dirname(os.path.abspath(__file__)) + "/imagens"