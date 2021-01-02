---
title: "Pipeline de desenvolvimento no Xcode"
date: "2020-12-31"
description: "Muito se discute sobre metogologia ágil e como podemos entregar aplicações com mais qualidade. No desenvolvimento de software encontramos diversas maneiras para atingir esse objetivo."
---

## Introdução

Muito se discute sobre metogologia ágil e como podemos entregar aplicações com mais qualidade. No desenvolvimento de software encontramos diversas maneiras para atingir esse objetivo. A implementação de uma `pipeline` é uma forma muito comum encontrada na maior partes das equipes.

`Pipeline` é uma sequência de etapas que precisam ser executadas para colocar uma aplicação em produção. Essas etapas podem: fazer o `build` do código; executar testes automatizados; implantar ambientes de testes e produção; entre outras.

O principal objetivo de uma `pipeline` em desenvolvimento é automatizar o processo de entrega de software, colocando-os em produção de forma rápida e contínua. E sem perder a qualidade da entrega.

O conceito de `pipeline` envolve alguns termos, cada vez mais comuns no desenvolvimento de aplicações, como `Continuos Integration (CI)` e `Continuous Delivery (CD)`:

- `CI`, ou intregração contínua, é o processo de automatização de `builds` e testes de código que acontece quando um desenvolvedor faz alguma alteração no repositório.
- `CD`, ou entrega contínua, consiste em entregar novos recursos aos usuários de forma mais rápida e eficiente possível. O objetivo principal da entrega contínua é permitir um fluxo constante de atualizações disponibilizadas em produção.

Todo esse processo é de responsabilidade da `pipeline` e está diretamente ligado aos conceitos de metodologia ágil que visam sempre fazer entregas constantes que geram maior valor percebido pelo cliente. Isso facilita o processo de desenvolvimento que deverá lidar com entregas menores e não com atualizações gigantescas, como era feito antigamente no desenvolvimento de software.

# Pipeline em iOS

Atualmente, há diversas plataformas que proporcionam esse serviço às equipes. O `Bitrise` é uma opção muito comum no desenvolvimento `mobile`, pois tem foco em aplicações iOS, Android, Xamarin, React Native, Ionic, entre outros.

A plataforma tem muito engajamento pela comunidade de desenvolvedores, o que possibilita um crescimento exponencial com ajuda de `add-ons` e integrações criados pelos próprios usuários. Além disso, a documentação oficial é muito rica em detalhes e a interface é simples e intuitiva.

<div><img style="width:100%;" src="../assets/pipeline-ios/bitrise.svg"/></div>

# Workflows

Um `workflow` no `Bitrise` é um conjunto de passos, ou `steps` que são executados sequencialmente ao iniciar um `build`. `Workflows` podem ser criados de duas maneiras:

1. Alterando diretamente o arquivo `bitrise.yml` do repositório;
2. Usando o editor visual disponível em `bitrise.io`. Ao editar pela `dashboard`, o arquivo `YAML` de configurações refletirá as mudanças aplicadas.

Os `workflows` possibilitam uma infinidade de execuções e podem ser criados quantos forem necessários. Um `workflow` pode trabalhar individualmente, em conjunto com outros fluxos ou através de gatilhos pré-estabelecidos.

# Configurando um projeto

Antes de iniciar a configuração de um projeto iOS é necessário adicionar um novo `app` à conta do `Bitrise` e conectar ao repositório. É possível vincular automaticamente às contas do `GitHub`, `GitLab` e `BitBucket`. Ou manualmente com a `URL` de um respositório `Git`.

Todos os detalhes e procedimentos de implantação podem ser encontrados [nesse link](https://devcenter.bitrise.io/getting-started/getting-started-with-ios-apps/).

# Personalizando as configurações

Ao iniciar um novo `app` é gerado alguns `workflows` com `steps` de modelo para o tipo de projeto escolhido. No caso do `iOS`, há `steps` de instalação de `Pods` e configuração de `certificados/provisioning profiles`.

## YAML

O arquivo `YAML` possui todos os procedimentos que o `workflow` irá executar. Para facilitar a identificação do que será executado e modificações futuras, podemos criar o arquivo `bitrise.yml` na raiz do repositório. Para isso é necessário informar na `dashboard` buscar pelo arquivo salvo. Detalhes dessa configuração [aqui](https://devcenter.bitrise.io/builds/bitrise-yml-online/).

### Exemplo de configuração para iOS:

```yml
format_version: '8'
default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git
project_type: ios

app:
  envs:
  - BITRISE_PROJECT_PATH: ChuckFacts.xcworkspace
  - BITRISE_SCHEME: ChuckFacts
  - BITRISE_EXPORT_METHOD: development
  - BITRISE_IOS_DEVICE: iPhone 12

trigger_map:
- push_branch: "*"
  workflow: ci
- pull_request_source_branch: "*"
  workflow: ci

workflows:
  ci:
    title: Runs iOS pipeline
    description: Runs default's pipeline for iOS environment
    steps:
    - activate-ssh-key:
        run_if: '{{getenv "SSH_RSA_PRIVATE_KEY" | ne ""}}'
    - git-clone: {}
    - cache-pull: {}
    - script:
        title: Install dependencies
        inputs:
        - content: pod install
    - xcode-test:
        inputs:
        - project_path: "$BITRISE_PROJECT_PATH"
        - simulator_platform: iOS Simulator
        - simulator_device: "$BITRISE_IOS_DEVICE"
        - scheme: "$BITRISE_SCHEME"
    - deploy-to-bitrise-io: {}
    - cache-push:
        inputs:
        - cache_paths: "./Pods -> ./Podfile.lock"
```

No código acima, temos o cabeçalho de identificação do `Bitrise`, as variáveis de ambiente, gatilhos de execução e os fluxos de execução.

## Variáveis de ambiente

As variáveis de ambiente possibilitam a modificação rápida direto pela `dashboard`. No exemplo, temos variáveis para o nome da `workspace` do projeto no `Xcode`, nome da `Scheme`, dispositivo para testes e método de exportação do `build`. Quando alterado as variáveis, as modificações são refletidas no arquivo `YAML`,

## Triggers

Os `triggers` permitem executar `workflows` com base em algum evento, por exemplo, para `push` e `pull requests` do repositório. É possível configurar eventos para cada `branch` ou mesmo ter um comportamento para qualquer atividade.

## Workflows

Cada `workflow` pode ter um comportamento para cada situação ou necessidade. No nosso exemplo, o `workflow` `CI` possui os seguintes procedimentos:

- Ativar chave SSH;
- Clonar o repositório `Git`;
- Buscar por cache;
- Instalar os `pods`;
- Testar o projeto;
- `Deploy` após `build`;
- Salvar cache.

### Deploy

O `step` de `deploy` permite salvar relatório do `build` executado, como resultado de testes e `linters`. Para etapas de geração de `IPAs`, é possível ainda criar uma URL para instalação pública. Dessa forma, a equipe interna pode facilmente testar o aplicativo em desenvolvimento.

Para permitir a exportação da `IPA` é necessário salvar os `certificados/provisioning profiles` manualmente na `dashboard`. Mais informações [aqui](https://devcenter.bitrise.io/deploy/ios-deploy/deploying-an-ios-app-to-bitrise-io/).

# Bitrise CLI

Outra vantagem em utilizar o arquivo `bitrise.yml` é a possibilidade de executá-lo localmente com ajuda do [CLI](https://devcenter.bitrise.io/bitrise-cli/index/). Todos os passos para instalação pode ser encontrado [aqui](https://devcenter.bitrise.io/bitrise-cli/installation/).

Podemos executar um fluxo com o comando:
```
bitrise run WORKFLOW-ID
```

<div><img style="width:100%;" src="../assets/pipeline-ios/bitrise-cli.svg"/></div>