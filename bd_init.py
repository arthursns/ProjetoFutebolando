import mysql.connector
conn = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password=''
            )

cursor = conn.cursor()

cursor.execute("DROP DATABASE IF EXISTS `Futebolando`;")

cursor.execute("CREATE DATABASE `Futebolando`;")

cursor.execute("USE `Futebolando`;")

table_alunos = '''CREATE TABLE aluno (
    `id` INT(10) AUTO_INCREMENT,
    `nome` VARCHAR(120) NOT NULL,
    `nome_responsavel` VARCHAR(120) NOT NULL,
    `cpf` VARCHAR(20) NOT NULL,
    `observacoes` TEXT,
    `cep` VARCHAR(20) NOT NULL,
    `image` LONGBLOB,
    `telefone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `password` VARCHAR(120) NOT NULL,
    `bairro` VARCHAR(120) NOT NULL,
    `rua` VARCHAR(120) NOT NULL,
    `complemento` VARCHAR(100),
    `numero_endereco` VARCHAR(10) NOT NULL,
    `data_nascimento` DATE,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
'''

cursor.execute(table_alunos)



conn.commit()
cursor.close()
conn.close()