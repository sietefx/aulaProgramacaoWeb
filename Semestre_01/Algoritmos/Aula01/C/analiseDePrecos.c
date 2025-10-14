#include <stdio.h>

typedef struct {
    char* nome;
    double precoAnterior;
    double precoAtual;
} Produto;

void analisarPreco(Produto produto) {

    if (produto.precoAnterior == 0) {
        printf("Não é possível calcular a variacao do produto %s pois não há preço anterior.\n", produto.nome);
        return;
    }

    double variacao = ((produto.precoAtual - produto.precoAnterior) / produto.precoAnterior) * 100;

    // Impressão de dados
    printf("--- Análise do Produto: %s ---\n", produto.nome);
    printf("Preço Anterior: R$ %.2f\n", produto.precoAnterior);
    printf("Preço Atual: R$ %.2f\n", produto.precoAtual);

    // Decisões CORRIGIDAS
    if (variacao < 0) {
        printf("Status: O preço caiu.\n");
        printf("Variação: %.2f%%\n", variacao);
    } else if (variacao > 0) {
        if (variacao > 10) {
            printf("Status: O preço subiu muito.\n");
            printf("Variação: %.2f%%\n", variacao);
        } else {
            printf("Status: O preço está em alta.\n");
            printf("Variação: %.2f%%\n", variacao);
        }
    } else {  // variacao == 0
        printf("Status: O preço está estável.\n");
        printf("Variação: 0.00%%\n");
    }
    
    printf("-------------------------------\n\n");
}

int main() {
    Produto produtos[] = {
        {"Arroz", 20.0, 18.0},
        {"Feijão", 15.0, 16.5},
        {"Macarrão", 10.0, 11.5},
        {"Óleo de Soja", 8.0, 9.0},
        {"Açúcar", 5.0, 5.5},
        {"Café", 12.0, 13.5},
        {"Leite", 4.0, 4.2},
        {"Pão", 3.0, 3.3},
        {"Carne", 30.0, 33.0},
        {"Frango", 25.0, 27.5}
    };

    int numProdutos = sizeof(produtos) / sizeof(produtos[0]);

    for (int i = 0; i < numProdutos; i++) {
        analisarPreco(produtos[i]);
    }

    return 0;
}