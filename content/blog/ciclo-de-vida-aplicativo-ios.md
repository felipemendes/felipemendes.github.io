---
title: "O ciclo de vida do aplicativo iOS"
date: "2020-05-07T19:50:30-02:00"
description: ""
---

O **ciclo de vida** da aplicação é muito importante para todos os desenvolvedores iOS que desejam tornar a experiência do usuário enriquecida, imersiva e suave. O gerenciamento desse ciclo de vida é responsável por lidar com ações do sistema quando o aplicativo estiver em primeiro ou em segundo plano e também eventos relacionados ao sistema.

Há diversos estados que são executados com o uso da aplicação e à medida que o estado muda, deve-se ajustar seu comportamento. O aplicativo que estiver em primeiro plano tem a prioridade sobre os recursos do sistema. E os aplicativos que estão em segundo plano devem fazer o mínimo possível de execuções e, de preferência, nada, porque estão fora da tela.

A cada alteração de estado, o *UIKit* é responsável por invocar o método apropriado. Até a versão 12 do iOS utilizamos eventos do ciclo de vida com base em aplicativos (*App-Based*) através do **UIApplicationDelegate**. No iOS 13 em diante foi introduzido eventos com base em cenas (*Scene-Based*) com **UISceneDelegate**

## Ciclo de vida com base em aplicativos

Esse ciclo é utilizado no iOS 12 e versões anteriores, e em aplicativos que não suportam cenas. Aqui o *AppDelegate* gerencia todas as telas do aplicativo.

Ao iniciar um aplicativo, o sistema o coloca no estado **inativo** ou em **segundo plano**, dependendo se a interface está prestes a aparecer na tela. Ao iniciar em primeiro plano, o sistema faz a transição do aplicativo para o estado ativo automaticamente. Depois disso, o estado varia entre ativo e em segundo plano até o aplicativo ser fechado.

A imagem abaixo representa as transições com *AppDelegate*:

![App-Based](../assets/ciclo-de-vida-aplicativo/app-based.png)

### Métodos com base em aplicativos

Essas são os métodos executados em cada transição com base em aplicativos:

- Os métodos responsáveis para o início do aplicativo são:
    - application(_:willFinishLaunchingWithOptions:)
    - application(_:didFinishLaunchingWithOptions:)

- Ao entrar em primeiro plano esses métodos são executados:
    - applicationWillEnterForeground(_:)
    - applicationDidBecomeActive(_:)

- Em segundo plano os métodos:
    - applicationWillResignActive(_:)
    - applicationDidEnterBackground(_:)

- Método de finalização:
    - applicationWillTerminate(_:)

## Ciclo de vida com base em cenas

Para os aplicativos que suportam cenas há um novo ciclo de vida. Isso é resultado do novo suporte de *multi-window* que chegou com o iPadOS. Uma cena no iOS representa uma instância da interface do usuário do aplicativo em execução.

Enquanto o **AppDelegate** é responsável pelo ciclo de vida do aplicativo, o **SceneDelegate** é responsável pelo que é mostrado na tela; as cenas ou janelas. Dessa forma, cada cena tem seu próprio ciclo de vida, cada uma pode estar em um estado de execução diferente.

A imagem a seguir mostra as transições de estado para cenas:

![Scene-Based](../assets/ciclo-de-vida-aplicativo/scene-based.png)

### Métodos com base em cenas

Essas são os métodos executados em cada transição com base em cenas:

- Ao entrar em primeiro plano é executado:
    - sceneWillEnterForeground(_:)
    - sceneDidBecomeActive(_:)

- Em segundo plano os métodos:
    - sceneWillResignActive(_:)
    - sceneDidEnterBackground(_:)

- Ao adicionar uma nova cena:
    - scene(_:willConnectTo:options:)

- Remove a cena do aplicativo:
    - sceneDidDisconnect(_:)

## Responder a outros eventos significativos

Além dos eventos de ciclo de vida, os aplicativos também devem estar preparados para lidar com outras situações. 

- Avisos de memória:
    - applicationDidReceiveMemoryWarning(_:)
    - didReceiveMemoryWarning()
    - didReceiveMemoryWarningNotification

- Dados protegidos ficam disponíveis / indisponíveis:
    - applicationProtectedDataDidBecomeAvailable(_:)
    - applicationProtectedDataWillBecomeUnavailable(_:)

- Tarefas do Handoff:
    - application(_:didUpdate:)

- Mudanças de horários:
    - applicationSignificantTimeChange(_:)

- Abrir algum um recurso:
    - application(_:open:options:)