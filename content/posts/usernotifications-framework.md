---
title: "UserNotifications Framework"
date: "2020-04-21T10:35:14-02:00"
description: "Este framework é responsável por enviar notificações para o dispositivo do usuário a partir de um servidor ou gerá-las localmente a partir do..."
---

Este `framework` é responsável por enviar notificações para o dispositivo do usuário a partir de um servidor ou gerá-las localmente a partir do aplicativo. As notificações comunicam informações importantes aos usuários do aplicativo, independentemente do aplicativo estar em execução no primeiro ou segundo plano. Podem exibir um alerta, tocar um som ou marcar o ícone do aplicativo.

Para notificações locais, o aplicativo cria o conteúdo da notificação e especifica uma condição, como um horário, local ou data, que aciona a entrega da notificação. Para notificações remotas (também conhecidas como *push notifications*), é necessário utilizar um servidor para gerar as notificações, e o serviço de notificação por push da Apple (APNs) que lida com a entrega dessas notificações para os dispositivos.

Segundo a [documentação](https://developer.apple.com/documentation/usernotifications) da Apple, o `framework` *UserNotifications* faz todas as tentativas para entregar as notificações locais e remotas em tempo hábil, mas a entrega não é garantida. O uso do *PushKit* oferece um mecanismo de entrega mais oportuno para tipos específicos de notificações, como aquelas usadas para complicações de *VoIP* e *watchOS*.

Vale lembrar que o uso de notificações devem ser utilizadas com responsabilidade e seguindo as sugestões da Apple:
- Enviar notificações apenas quando forem relevantes
- Não enviar spam
- Não enviar notificações para aumentar o tráfego

### Configuração

Nesta postagem vou focar na criação de notificações locais, pois esta configuração é semelhante às notificações remotas, porém sem o trabalho necessário do servidor. Como em muitos serviços da Apple, onde a privacidade pode ser um problema, precisamos primeiro solicitar ao usuário a autorização para receber notificações.

Geralmente deseja-se solicitar autorização para notificações o mais cedo possível, caso contrário, as notificações recebidas antes da concessão do acesso não serão exibidas. A Apple sugere concluir isso ao iniciar o aplicativo através do método: `application:didFinishLaunchingWithOptions:`.

Na classe do `AppDelegate` é necessário importar o `framework` *UserNotifications*:

```swift
import UserNotifications
```

No cabeçalho da classe, crie uma nova propriedade e atribua uma instância da classe `UNUserNotificationCenter` à ela. Esta será responsável por gerenciar as notificações, ou seja, nossa central de notificações.

```swift
let notificationCenter = UNUserNotificationCenter.current()
```

No método `didFinishLaunchingWithOptions` declare as opções disponíveis para as notificações. No total são quatro propriedades disponíveis: `badge`, `sound`, `alert` e `carPlay`.

```swift
let options: UNAuthorizationOptions = [.alert, .sound, .badge]
```

Decidido sobre a lista de parâmetros de notificação, podemos solicitar permissão ao usuário para enviar notificações ao aplicativo.

```swift
notificationCenter.requestAuthorization(options: options) { didAllow, error in
    if !didAllow {
        print("User has declined notifications")
    }
}
```

Caso o usuário não autorize ou altere esta preferência nas configurações do aplicativo, é possível rastrear esta modifição através da propriedade `getNotificationSettings`. Essa chamada contém um *completion block* que invoca  `UNNotificationSettings` e pode ser usada para verificar o status da autorização ou de certos parâmetros de notificação.

```swift
notificationCenter.getNotificationSettings { settings in
  if settings.authorizationStatus != .authorized {
	print("Notifications not allowed")
  }
} 
```

Feito esse processo, é necessário definir o `delegate` da central de notificação para o `AppDelegate`.

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    ...
    notificationCenter.delegate = self
    ...
}
```

Os métodos obrigatórios são:

```swift
extension AppDelegate: UNUserNotificationCenterDelegate {
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
        completionHandler()
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.alert, .sound, .badge])
    }
}
```

#### Estrutura de notificação

O conteúdo da notificação deve ser configurado por meio de uma instância do `UNMutableNotificationContent`, que contém as seguintes propriedades:

1. *title*: cabeçalho da notificação. Do tipo *String*.
2. *subtitle*: subtítulo da notificação. Do tipo *String*.
3. *body*: Corpo com o texto principal da notificação. Do tipo *String*.
4. *badge*: Número a ser exibido no ícone do aplicativo por notificação. Do tipo *NSNumber*.
5. *sound*: Som emitido pela notificação. Do tipo *UNNotificationSound*. Para usar o som padrão, use *UNNotificationSound.default()*.
6. *launchImageName*: Nome do arquivo de imagem do ícone. Utilize `nil` para usar a imagem padrão do aplicativo. Do tipo *String*.
7. *userInfo*: Dicionário usado para armazenar informações do usuário que podem ser enviadas para uma notificação.
8. *attachments*: Utilizado para ativar áudio, imagem ou vídeo.

#### Agendar notificação

Como dito, notificações podem ser agendadas por horário, local ou data. Nesse exemplo, vamos criar agendamentos por horário por ser o tipo comumente utilizado.

No disparo por horário deve ser definido o tempo em segundos:

```swift
let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 10, repeats: false)
```

Em seguida, é necessário adicionar a requisição à central de notificações. Toda notificação deve possuir um identificador único. Caso o mesmo identificar seja solicitado novamente, este será sobreposto ao existente. Assim o método `add()` consegue controlar o agendamento de cada notificação.

```swift
let identifier = "UserNotificationIdentifier"
let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)

notificationCenter.add(request) { (error) in
	if let error = error {
		print("Error \(error.localizedDescription)")
	}
}
```

##### Exemplo de agendamento

Para facilitar a criação do conteúdo das notificações pode-se utilizar uma `struct` para receber estas informações. Conforme modelo:

```swift
struct UserNotificationContent {
    let identifier: String
    let title: String
    let body: String
    let timeInterval: TimeInterval
}
```

O método de agendamento das notificações ficaria dessa maneira no `AppDelegate`:

```swift
extension AppDelegate {
    func scheduleUserNotification(for userNotificationContent: UserNotificationContent) {        
        let content = UNMutableNotificationContent()
        content.title = userNotificationContent.title
        content.body = userNotificationContent.body
        content.sound = UNNotificationSound.default

        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: userNotificationContent.timeInterval, repeats: false)

        let request = UNNotificationRequest(identifier: userNotificationContent.identifier, content: content, trigger: trigger)

        notificationCenter.add(request) { error in
            if error != nil {
                print("error \(String(describing: error))")
            }
        }
    }
}
```

A função de agendamento pode ser utilizada como preferir. Exemplo dentro de uma `@IBAction`:

```swift
class ViewController: UIViewController {

    var appDelegate = UIApplication.shared.delegate as? AppDelegate

    let notifications = [UserNotificationContent(identifier: "first-notification",
                                                title: "Primeira notificação",
                                                body: "Notificação exibida após 30 segundos",
                                                timeInterval: 30),
                        UserNotificationContent(identifier: "second-notification",
                                                title: "Segunda notificação",
                                                body: "Notificação exibida após 1 minuto",
                                                timeInterval: 60)]

    @IBAction func scheduleNotificationsButtonTapped(_ sender: UIButton) {
        notifications.forEach { notification in
            appDelegate?.scheduleShoppingNotification(for: notification)
        }
    }
}
```

#### Cancelar agendamento da notificação

Da mesma forma que é possível agendar uma notificação, também podemos cancelar ou remover um agendamento da central de notificações.

Este processo pode ser feito através do identificador. É possível remover notificações pendentes e notificações que já foram entregues e ainda estão na central de notificações do iOS:

```swift
notificationCenter.removePendingNotificationRequests(withIdentifiers: ["identifier"])
notificationCenter.removeDeliveredNotifications(withIdentifiers: ["identifier"])
```

Seguindo o exemplo do agendamento, o cancelamento ficaria dessa forma:

```swift
extension AppDelegate {
    func unscheduleUserNotification(for identifiers: [String]) {
        notificationCenter.removePendingNotificationRequests(withIdentifiers: identifiers)
        notificationCenter.removeDeliveredNotifications(withIdentifiers: identifiers)
    }
}
```

##### Exemplo de cancelamento

```swift
class ViewController: UIViewController {

    @IBAction func unscheduleNotificationsButtonTapped(_ sender: UIButton) {
        let identifiers = notifications.map { $0.identifier }
        appDelegate?.unscheduleShoppingNotification(for: identifiers)
    }
}
```
