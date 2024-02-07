---
title: "FastAPI com Docker em uma Instância AWS EC2"
date: "2024-02-04T15:58:13-02:00"
description: ""
---

A implantação de um projeto Python com FastAPI em uma instância AWS EC2 fornece um ambiente robusto e escalável para aplicações web. Este tutorial irá orientá-lo na configuração de uma instância EC2 para um projeto FastAPI rodando com Docker, incluindo gerenciamento de banco de dados com PostgreSQL e pgAdmin, e protegendo sua aplicação com Nginx e HTTPS.

**Pré-requisitos:**

- Uma conta AWS
- Entendimento básico de Docker, FastAPI e comandos Linux
- Docker e Docker Compose instalados na sua máquina local
- Opcional: Clonar o repositório [FastAPI-Template](https://github.com/felipemendes/fastapi-template) para utilizar como modelo da estrutura e configuração para esse tutorial.

**Passo 1: Criar uma Instância AWS EC2**

1. Faça login no [Painel AWS EC2](https://console.aws.amazon.com/ec2/).
2. Clique em **Launch Instance** para criar uma nova instância EC2.
3. Escolha uma Amazon Machine Image (AMI), como Ubuntu Server.
4. Selecione um tipo de instância (por exemplo, `t2.micro` para o nível gratuito).
5. Configure os detalhes da instância conforme necessário.
6. Adicione armazenamento se o padrão não for suficiente.
7. Configure o grupo de segurança para adicionar regras de entrada para as portas (demarcado como **Inbound Rules**) `8090`, `8080` e `5050` para permitir tráfego.
8. Crie e baixe um novo par de chaves ou escolha um existente. Lembre-se de onde você salvou, pois precisará disso para se conectar via SSH à sua instância.
9. Revise e inicie a instância.

**Passo 2: Conectar-se à Sua Instância EC2 via SSH**

Use o terminal ou prompt de comando para se conectar à sua instância:

```bash
ssh -i /caminho/para/sua-chave.pem ubuntu@{ip_publico}
```

Substitua `{ip_publico}` pelo endereço IP público da sua instância.

**Passo 3: Instalar Dependências**

Atualize as listas de pacotes e instale `pipenv`:

```bash
sudo apt update
sudo apt install pipenv
```

**Passo 4: Configurar Docker**

Certifique-se de que o Docker está instalado na sua instância EC2. Se não, instale o Docker:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Adicione seu usuário ao grupo Docker para gerenciar o Docker como um usuário não root:

```bash
sudo usermod -aG docker ${USER}
```

Instale o Docker Compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**Passo 5: Implantar Seu Aplicativo FastAPI**

Clone seu projeto FastAPI (ou o repositório de template) para a instância EC2 ou transfira seus arquivos de projeto usando SCP ou SFTP.

Navegue até o diretório do seu projeto e execute seu aplicativo com o Docker Compose:

```bash
docker-compose up --build -d
```

Este comando constrói a imagem Docker para o seu aplicativo FastAPI e inicia os contêineres conforme definido no seu arquivo `docker-compose.yml`.

**Passo 6 Opcional: Configurar Nginx como um Proxy Reverso**

Instale o Nginx:

```bash
sudo apt update
sudo apt install nginx
```

Configure o Nginx para encaminhar solicitações para o seu aplicativo FastAPI. Crie um novo arquivo de configuração em `/etc/nginx/sites-available/` e vincule-o a `sites-enabled/`.

**Passo 7 Opcional: Proteger Seu Aplicativo com HTTPS**

Instale o Certbot e o plugin Nginx para obter um certificado SSL gratuito da Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seudominio.com
```

Siga as instruções do Certbot para configurar o HTTPS para o seu domínio.

**Passo 8: Acessar Seu Aplicativo FastAPI**

Seu aplicativo FastAPI agora deve ser acessível em `http://{ip_publico}:8090/docs` para a UI do Swagger, com `https://seudominio.com` servindo seu aplicativo de forma segura através do HTTPS (caso Nginx estiver configurado).

**Conclusão:**

Você configurou com sucesso uma instância AWS EC2 para hospedar seu projeto FastAPI com Docker, completo com um banco de dados *PostgreSQL*, *pgAdmin* para gerenciamento de banco de dados e *Nginx* para acesso seguro via HTTPS. Esta configuração fornece uma base sólida para a implantação de robustas aplicações web em Python.

Para instruções detalhadas e solução de problemas, consulte a documentação oficial da [AWS](https://aws.amazon.com/pt/documentation/ec2/), [FastAPI](https://fastapi.tiangolo.com/pt/) e [Docker](https://docs.docker.com/).