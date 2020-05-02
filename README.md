
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

PROCEDIMENTO	IDADE	SEXO	PERMITIDO
1234			10		M		SIM
4567			20		M		SIM
6789			10		F		NÃO
6789			10		M		SIM
1234			20		M		SIM
4567			30		F		SIM

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

* Endereço : o banco NoSQL permite que salve todos os dados como um objeto, para falicitar podemons só pedir o CEP para o Usuario e assim consultar um serviço para buscar o restante do enderço por um serviço como  o ViaCEP (viacep.com.br/ws/01001000/json/). Caso o banco fosse SQL teriamos que ter toda infrastrutura de CEP (Tabela) tem Logradoro (Tabela) tem uma cidade (Tabela) que tem um estado (Tabela) que tem um pais (Tabela) e suas chaves estrangeiras

* Telefone : Igualmente salvo como um array de String associado a um usuario, possui tambem uma validação de tamanho no backend (10 ~11 com 2 para o DD e 8 ou 9 digitos )

* CPF; validação no backend, ao criar o usuario ele testa para ver se o cpf é valido. Foi configurado tambem como unique no banco

