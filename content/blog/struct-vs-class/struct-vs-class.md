---
title: "Struct vs Class"
date: 2019-02-25T11:51:02-02:00
draft: false
---

Swift fornece vários recursos que tornam as Structs melhores que as Classes em diversas situações, no entanto muitos desenvolvedores têm dificuldades em entender ou em escolher a melhor opção entre ambos. A principal característica de Strutcs é a imutabilidade, e na dúvida a melhor opção é começar com uma Struct e se durante o desenvolvimento surgir a necessidade de criar cópias independentes ou utilizar os dados em múltiplas `threads` basta alterar a declaração para Class.

### Comparando Struct e Class

Struct e Class no Swift têm muitas coisas em comum. Ambos possuem:

- Propriedades que armazenam valores
- Métodos com funcionalidades
- Subíndices para fornecer acesso aos seus valores usando a sintaxe subscrita
- Inicializadores (init) para configurar seu estado inicial
- Possibilidade de ser estendido para expandir sua funcionalidade além de uma implementação padrão
- Conformidade com protocolos para fornecer funcionalidade padrão de um certo tipo

Porém as Classes têm recursos adicionais que as Structs não têm, como:

- Herança para obter características de outra classe
- Conversão de tipos para verificar e interpretar o tipo de uma instância de classe no tempo de execução
- Desinicializadores (deinit) para desalocar instâncias quando não mais são utilizadas
- Contagem de referência que permite mais de uma referência a uma instância de classe

Outra diferença importante entre ambos é o tipo de cada. **Structs são Value Types e Classes são Reference Types**.

### O que são Value Types e Reference Types?

Tipos em Swift são categorizados em duas situções: primeiro **value types** onde cada instância armazena uma **cópia única** dos dados. Além de `struct` , `enums`, `tuplas` e `primitivos` são value types. E segundo **reference types** onde as instâncias compartilham a **única cópia** dos dados, normalmente definido por uma `class`.

A característica básica de um **value type** é que o processo de **cópia** cria uma instância independente com sua própria cópia exclusiva de seus dados.

#### Exemplo de value type

```swift
struct Data { 
    var data: Int = 10
}

var primary = Data()
var secondary = primary // primary é copiado para secondary
primary.data = 20 // altera valor do primary, não do secondary

println(primary.data) // retorna "20"
println(secondary.data) // retorna "10"
```

Já o processo de **cópia** em **reference type** cria uma instância compartilhada. Depois de uma cópia, duas variáveis referem-se a uma única instância dos dados, com isso, modificar os dados na segunda variável também afeta o original.

#### Exemplo de reference type

```swift
class Data {
    var data: Int = 10
}

var primary = Data()
var secondary = primary // primary é copiado para secondary
primary.data = 20 // altera a instância referenciada por primary (e secondary)

println(primary.data)	// retorna "20"
println(secondary.data)	// retorna "20"
```

### Motivos para utilizar Value Types

1. Eficiência
A alocação de memória em `Reference Types` é mais custoso comparado com `Value Types`. Além disso, a fim de liberar a memória alocada, o sistema operacional precisa manter o controle da contagem de referência e, quando a contagem é zero, a memória é liberada. Essa sobrecarga não acontece com `Value Types` que levam à criação e à cópia eficiente da instância.

2. Código previsível
Com `Reference Type` não temos certeza em relação ao conteúdo da instância criado, visto que qualquer parte do código pode ser modificada usando qualquer outra referência. Como as instâncias de `Value Types` são copiadas na atribuição não precisamos nos preocupar se o comportamento de outras partes do código irão afetar demais instâncias.

3. Segurança nas Threads
Instâncias de `Value Types` são mais seguras em ambientes de multi-thread pois não precisamos nos preocupar se o estado de uma instância está sendo utilizado em outras threads.

4. Evita Memory Leak
Swift utilizado o [ARC](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html) para deslocar instância de `Reference Types`, apesar de eficiente ainda pode causar erros durante a execução. Porém este problema não ocorre em `Value Types` pois não há referências como `Reference Types`.