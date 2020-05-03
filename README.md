
# Oracle-node-angular 
Solicitação de autorização de procedimentos médicos

# Requisitos Técnicos da Plataforma

* Docker > = 19.03.8
* docker-compose > =1.25.5

# Estrutura do Sistema

* Banco de dados MongoBD 
* BackEnd Node.js com express.js
* FrontEnd Angular

# Para executar 

* Na Pasta mongo_db executar docker-compose up (-d), para subir o banco de dados (junto esta o mongo-express, opcional que  auxilia na visualização dos dados no banco)
* Na Pasta codigo-angular executar docker-compose up (-d), para subir o frontEnd
* Na Pasta nodeJS executar docker-compose up (-d), para subir o backEnd
* Acessar http://localhost

# Pastas 

* codigo_node : contém o codigo Node
* codigo-angular : contém o codigo Angular e os arquivos docker
* colecao_postman: contém um export das requisições para testar o backend
* mongo_db: contém o arquivos docker e alguns de configuração do bd
* nodeJs: contém o arquivo docker

# Observação 

* Para  o banco de dados Mongo é preciso criar uma base de dados e add o usuario nela (exemplo, comandos abaixo) 
    * docker-compose exec mongo mongo
    * use admin
    * db.auth("admin","admin")
    * db.updateUser("admin",
        {
        roles: [ "userAdminAnyDatabase",
                "dbAdminAnyDatabase",
                "readWriteAnyDatabase"]
        }
        )
    * use db_node_mongo
    * db.createUser(
        {
        user: "admin",
        pwd: "admin",
        roles: [ {role:"userAdmin", db:"db_node_mongo"},
                {role: "dbAdmin", db:"db_node_mongo"},
                {role: "readWrite", db:"db_node_mongo"}]
        }
        )

* É possivel interagir com backend pela postman usando a colecao_postman
* Documentação API https://documenter.getpostman.com/view/7035311/SzmZdLp2?version=latest

# Desafio

Você é o desenvolvedor responsável por um sistema de controle de autorizações de procedimentos médicos para um plano de saúde.
Os critérios para permitir a execução de um procedimento são idade e sexo, de acordo com a tabela a seguir:

PROCEDIMENTO   IDADE	SEXO	PERMITIDO
1234              10		M		SIM
4567			      20		M		SIM
6789			      10		F		NÃO
6789			      10		M		SIM
1234			      20		M		SIM
4567			      30		F		SIM

Procedimentos não listados na tabela devem ser negados

Objetivo: 
- Possibilitar a verificação de autorização de procedimento médico e registros das solicitações de autorização


Requisitos obrigatórios:
- Criar tela de consulta, inclusão, exclusão e edição de autorizações.
- Criar tela de verificação se procedimento está autorizado. Exibir mensagem de autorização ou em caso negativo informar motivo.
- Criar a estrutura de banco de dados proposta para o problema.
- Usar git para armazenar o fonte (usar um git publico e enviar a URL)
- Use estilos conforme site da Qualirede (www.qualirede.com.br) e conforme julgar necessário
- Considere usabilidade como um fator importante para a entrega
- Entregar a documentação necessária para compilar/publicar (colocar no readme do repositório)
- Utilizar angular no front-end, demais tecnologias conforme achar necessário.

Requisitos desejáveis:
- Contruir testes unitários
- Utilizar docker na solução
- Considerar tratamento de exceções

# Sobre a Solução aplicada

* Na branch principal(master) o banco usado é o mongodb (não relacional)

* Na branch principal(bd-relacional-mysql) o banco usado é o mysql (relacional), porém não finalizado a adequação do backend (somente o cadastro de usuario funcional)

* Na Pasta Mysql(branch bd-relacional-mysql) executar docker-compose up (-d), para subir o banco de dados (junto esta o phpmyadmin porta (8087), opcional que  auxilia na visualização dos dados no banco)

* A imagem base_de_dados_relacional.png (branch bd-relacional-mysql) esta retratada o esquema da base de dados relacional

* O arquivo mysql_node_angular (branch bd-relacional-mysql) é o dump da base de dados vazia, com somente a estrutura


