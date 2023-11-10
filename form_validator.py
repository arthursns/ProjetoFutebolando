import re, requests
from typing import Any
from datetime import datetime
from wtforms import ValidationError
import math

class FormTexto:
  def __init__(self, msg: str) -> None:
    self.text = None
    self.msg = msg

  def __call__(self, form, field):
    self.text = field.data
    if re.search(r'[^A-Za-zÀ-ÿ\s]', self.text):
      raise ValidationError(f"{self.msg}")
    

class Cpf:
  def __init__(self, msg: str) -> None:
    self.cpf = None
    self.msg = msg

  def __call__ (self, form, field):
    self.cpf = field.data
    if not re.match(r'\d{3}\.?\d{3}\.?\d{3}-?\d{2}', self.cpf):
      raise ValidationError(f"{self.msg}")
    self.cpf = self.cpf.replace("-", "").replace(".", "")
    if self.__tamanho_valido() and self.__valida_digitos():
      return
    raise ValidationError(f"{self.msg}")
  
  def __tamanho_valido(self) -> bool:
    if len(self.cpf) != 11 or len(set(self.cpf)) == 1:
      return False
    return True

  def __valida_digitos(self) -> bool:
    numeros =  list(range(11, 1, -1))
    soma = sum(int(self.cpf[i]) * numeros[i+1] for i in range(9))
    primeiro_digito = soma * 10 % 11
    if primeiro_digito == 10 or primeiro_digito == 11:
      primeiro_digito = 0
    soma = sum(int(self.cpf[i]) * numeros[i] for i in range(10))
    segundo_digito = soma * 10 % 11
    if segundo_digito == 10 or segundo_digito == 11:
      segundo_digito = 0
    
    return primeiro_digito == int(self.cpf[-2]) and segundo_digito == int(self.cpf[-1])
  

class Cep:
  def __init__(self, msg: str) -> None:
    self.cep = None
    self.url = None
    self.msg = msg

  def __call__(self, form, field):
    self.cep = field.data
    if not re.match("^\d{5}-?\d{3}$", self.cep):
      raise ValidationError(self.msg)
    self.cep = self.cep.replace("-", "")
    self.url = f"https://viacep.com.br/ws/{self.cep}/json/"
    self.valida_cep()

  def valida_cep(self):
    try:
      req = requests.get(self.url)
      if req.status_code == 200 and not req.json().get("erro"):
        return True
      raise ValidationError(self.msg)
    except:
      raise ValidationError(self.msg)
  
class DataNascimento():
  def __init__(self, minimo :int, maximo: int) -> None:
    self.minimo = minimo
    self.maximo = maximo
   
  def __call__(self, form, field):
    idade = self.calcular_idade(field.data)
    if idade < self.minimo:
      raise ValidationError(f"É preciso ter no minímo {self.minimo} anos!")
    elif idade >  self.maximo:
      raise ValidationError(f"É preciso ter no maximo {self.maximo} anos!")
  
  def calcular_idade(self, data_nascimento):
    hoje = datetime.today().date()
    idade = (hoje - data_nascimento)
    return round(idade.days / 365.25)
