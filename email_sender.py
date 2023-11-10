import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

def send_email(conteudo, remetente, assunto, *args):
    corpo = conteudo
    email_msg = MIMEMultipart()
    email_msg["From"] = "bibliotecapoloitapevi@gmail.com"
    email_msg["To"] = remetente
    email_msg["Subject"] = assunto
    email_msg.attach(MIMEText(corpo, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(email_msg["From"], "eumbinyywrriqvnm")
        server.send_message(email_msg)