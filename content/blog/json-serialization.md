---
title: "JSON Serialization"
date: 2020-06-16T19:21:02-02:00
draft: false
---

Durante o desenvolvimento de aplicativos é muito comum realizar uma comunicação com informações externas via rede. Para estabelecer esta comunicação é necessário formatar os dados tanto para enviá-los quanto para recebê-los. Em `Swift` esse processo é conhecido como **Encodable** e **Decodable**.

Segundo a documentação:

- Encodable: Um tipo que pode se **codificar para** uma representação externa.

- Decodable: Um tipo que pode **decodificar a partir** de uma representação externa.

Uma maneira de utilizar ambos protocolos em uma mesma entidade é utilizar o `alias` **Codable**. Portanto, esse tipo permite codificar e decodificar um formato diferente.

Ao informar que uma entidade conforma com estes protocolos é necessário que todas as suas propriedades também conformem com o protocolo indicado. Muitos tipos comuns do [Swift Standard Library](https://developer.apple.com/documentation/swift/swift_standard_library) e [Foundation](https://developer.apple.com/documentation/foundation) são `codable` por padrão. Quando houver um tipo customizado, é necessário que este também se conforme com o protocolo.

No exemplo a seguir podemos verificar o erro emitido pelo Xcode quando tentamos conformar o tipo `Student` com `Codable`. Como o tipo `School` não tem essa especificação, `Student` não está em total conformidade. Os demais tipo, `Int` e `String`, não geram erros pois são importados do framework `Foundation`:

![Disconformed Protocol](../assets/json-serialization/disconformed-protocol.png)

## Encoding

Como vimos, o protocolo **Encodable** permite o tipo para ser enviado à uma camada externa do aplicativo. É possível codificar nossos tipos para diversos formatos, como `JSON`, `XML` e `Plist`.

Para preparar nosso tipo com o formato `JSON` podemos utilizar `JSONEncoder` da seguinte maneira:

```swift
struct Student: Codable {
    var id: Int
    var name: String
    var school: School
}

struct School: Codable {
    var id: Int
    var name: String
}

let school = School(id: 1, name: "Swift School")
let student = Student(id: 1, name: "Steve Jobs", school: school)

let encoder = JSONEncoder()
let data = try encoder.encode(student)
```

É possível visualizar como está a representação `JSON` ao converter para `String`:

```swift
print(String(data: data, encoding: .utf8)!)
```

```json
{
	"id": 1,
	"name": "Steve Jobs",
	"school": {
		"id": 1,
		"name": "Swift School"
	}
}
```

Como podemos ver, os dados são aninhados conforme estrutura declarada nas `structs`.

## Decoding

Para realizar o processo inverso, ou seja, para decodificar instâncias de um tipo de dados a partir de objeto `JSON`, podemos utilizar o `JSONDecoder`.

Nesse processo precisamos especificar o tipo para a conversão e a origem dos dados. No exemplo abaixo foi utilizado um `JSON` `hardcoded` mas a origem pode ser de qualquer lugar.

```swift
let json = """
{
    "id": 2,
    "name": "Tim Cook",
    "school": {
        "id": 1,
        "name": "Swift School"
    }
}
""".data(using: .utf8)!

let decoder = JSONDecoder()
let studentFromJson = try decoder.decode(Student.self, from: json)
```

Ao manipularmos o objeto que recebeu a decodificação podemos perceber que este possui todas as propriedades das `structs`.

```swift
print("Objeto estudante: \(studentFromJson)")
print("Nome estudante: \(studentFromJson.name)")
print("Escola do estudante: \(studentFromJson.school.name)")
```

