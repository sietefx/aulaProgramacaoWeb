import Foundation

// 1. É preciso organizar os dados de cada produto
struct Produto {
    let nome: String
    let precoAnterior: Double
    let precoAtual: Double
}

// 2. Função que implementa a lógica da programação
func analisarPreco(do produto: Produto) {
    // A IA corrigiu para implementar: evitar divisão por zero (segurança)
    guard produto.precoAnterior != 0 else {
        print("Não é possível calcular a variação para o produto \(produto.nome) pois o preço anterior é zero.")
              return
    }
    
    // Cálculo do fluxograma
    let variacao = ((produto.precoAtual - produto.precoAnterior) / produto.precoAnterior) * 100
    let variacaoFormatada = String(format: "%.2f", variacao)
    
    print("--- Análise do Produto: \(produto.nome) ---")
    print("Preço Anterior: R$ \(produto.precoAnterior)")
    print("Preço Atual: R$ \(produto.precoAtual)")
    
    // Decisões do fluxograma
    if variacao < 0 {
        print("O preço caiu.")
        print("Variação: \(variacaoFormatada)% (-)")
    } else if variacao > 0 {
        if variacao > 10 {
            print("O preço subiu muito.")
            print("Variação: \(variacaoFormatada)% (+)")
        } else {
            print("O preço está em alta")
            print("Variação: \(variacaoFormatada)% (+)")
        }
    } else {
        print("O preço está estável.")
        print("Variação: 0.00% (±)")
    }
}

// 3. Criar instâncias para teste
let arroz = Produto(nome: "Arroz", precoAnterior: 5.0, precoAtual: 4.9)
let feijao = Produto(nome: "Feijão", precoAnterior: 10.0, precoAtual: 11.0)
let macarrao = Produto(nome: "Macarrão", precoAnterior: 8.0, precoAtual: 8.0)
let oleo = Produto(nome: "Óleo", precoAnterior: 20.0, precoAtual: 41.0)

analisarPreco(do: arroz)
analisarPreco(do: feijao)
analisarPreco(do: macarrao)
analisarPreco(do: oleo)
