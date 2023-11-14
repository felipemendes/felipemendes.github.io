---
title: "Compact Dictionary"
date: "2023-03-16T22:04:44-02:00"
description: ""
---

Em Swift, a eficiência no uso de memória é crucial para garantir o desempenho otimizado de aplicativos. Uma ferramenta valiosa nesse contexto é o **Compact Dictionary**, uma estrutura de dados que combina a eficiência de armazenamento de um dicionário com a economia de espaço de um array. Neste artigo, exploraremos o Compact Dictionary, suas características e como ele pode ser uma escolha eficaz em determinados cenários.

### **O que é um Compact Dictionary?**

O **Compact Dictionary**, introduzido no Swift 5, é uma versão otimizada de um dicionário que aproveita a otimização de espaço quando as chaves são do tipo `Enum` ou `RawRepresentable`. Ele substitui o antigo comportamento em que dicionários com chaves pequenas ou contíguas consumiam mais espaço do que o necessário.

### **Sintaxe do Compact Dictionary em Swift**

A sintaxe para criar um **Compact Dictionary** é semelhante à de um dicionário padrão:

```swift
enum Day: String {
    case sunday, monday, tuesday, wednesday, thursday, friday, saturday
}

let compactDict: [Day: String] = [
    .sunday: "Domingo",
    .monday: "Segunda-feira",
    .tuesday: "Terça-feira",
    .wednesday: "Quarta-feira",
    .thursday: "Quinta-feira",
    .friday: "Sexta-feira",
    .saturday: "Sábado"
]
```

### **Quando Usar um Compact Dictionary?**

1. **Chaves Enum ou RawRepresentable:** O **Compact Dictionary** brilha quando as chaves são do tipo `Enum` ou `RawRepresentable`, pois essas chaves têm uma representação mais compacta em termos de espaço de armazenamento.

2. **Economia de Espaço:** Se a economia de espaço é uma prioridade e você está trabalhando com um conjunto fixo de chaves, o **Compact Dictionary** oferece uma solução eficiente.

### **Benefícios do Compact Dictionary**

1. **Menor Uso de Memória:** Comparado a dicionários convencionais, o **Compact Dictionary** economiza espaço, especialmente quando usado com chaves que têm representações compactas.

2. **Mantém Semântica de Dicionário:** Apesar das otimizações de espaço, o **Compact Dictionary** mantém a semântica de dicionário, permitindo fácil iteração e acesso aos valores associados às chaves.

### **Limitações e Considerações**

1. **Restrições de Chave:** Funciona melhor com chaves do tipo `Enum` ou `RawRepresentable`. Chaves de outros tipos podem não aproveitar totalmente as otimizações de espaço.

2. **Uso Consciente:** Avalie cuidadosamente se o **Compact Dictionary** é a escolha certa para o seu caso de uso, considerando as características específicas do seu conjunto de dados.

### **Conclusão**

O **Compact Dictionary** em Swift é uma adição valiosa para otimização de memória em determinados cenários. Ao aproveitar as otimizações de espaço oferecidas, os desenvolvedores podem garantir que seus aplicativos sejam eficientes em termos de memória, mantendo ao mesmo tempo a semântica e funcionalidades essenciais de um dicionário. Considere incorporar o **Compact Dictionary** em situações específicas onde a economia de espaço é crítica, e desfrute dos benefícios de um código mais eficiente e otimizado em Swift.