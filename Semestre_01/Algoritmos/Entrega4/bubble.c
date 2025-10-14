#include <stdio.h>

// Array com os preços de 10 produtos diferentes do supermercado
float precos[10] = {5.99, 3.49, 12.75, 7.30, 2.99, 15.00, 8.25, 4.50, 9.99, 6.80};
char *produtos[10] = {
    "Arroz", "Feijão", "Óleo", "Açúcar", "Café",
    "Leite", "Pão", "Manteiga", "Queijo", "Presunto"
};

// Imprimir os preços dos produtos com seus nomes
void imprimirPrecos(float arr[], int n)
{
    printf("Preços dos produtos:\n");
    printf("--------------------\n");
    for (int i = 0; i < n; i++)
    {
        printf("%-10s: R$ %.2f\n", produtos[i], arr[i]);
    }
    printf("\n");
}

// Função para ordenar os preços em ordem crescente usando Bubble Sort
void bubbleSortCrescente(float arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                // Troca arr[j] e arr[j+1]
                float temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                
                // Troca também os nomes dos produtos para manter a correspondência
                char *tempNome = produtos[j];
                produtos[j] = produtos[j + 1];
                produtos[j + 1] = tempNome;
            }
        }
    }
}

// Função para ordenar os preços em ordem decrescente usando Bubble Sort
void bubbleSortDecrescente(float arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] < arr[j + 1])
            {
                // Troca arr[j] e arr[j+1]
                float temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                
                // Troca também os nomes dos produtos
                char *tempNome = produtos[j];
                produtos[j] = produtos[j + 1];
                produtos[j + 1] = tempNome;
            }
        }
    }
}

// Função para calcular o preço médio
float calcularMedia(float arr[], int n)
{
    float soma = 0;
    for (int i = 0; i < n; i++)
    {
        soma += arr[i];
    }
    return soma / n;
}

// Função para encontrar o produto mais caro
void encontrarMaisCaro(float arr[], int n)
{
    float max = arr[0];
    int indice = 0;
    
    for (int i = 1; i < n; i++)
    {
        if (arr[i] > max)
        {
            max = arr[i];
            indice = i;
        }
    }
    printf("Produto mais caro: %s - R$ %.2f\n", produtos[indice], max);
}

// Função para encontrar o produto mais barato
void encontrarMaisBarato(float arr[], int n)
{
    float min = arr[0];
    int indice = 0;
    
    for (int i = 1; i < n; i++)
    {
        if (arr[i] < min)
        {
            min = arr[i];
            indice = i;
        }
    }
    printf("Produto mais barato: %s - R$ %.2f\n", produtos[indice], min);
}

int main()
{
    int n = sizeof(precos) / sizeof(precos[0]);
    
    printf("=================================\n");
    printf("    SISTEMA DE PREÇOS - MERCADO\n");
    printf("=================================\n\n");
    
    // Preços originais
    printf("PREÇOS ORIGINAIS:\n");
    imprimirPrecos(precos, n);
    
    // Ordena em ordem crescente
    bubbleSortCrescente(precos, n);
    printf("PREÇOS EM ORDEM CRESCENTE:\n");
    imprimirPrecos(precos, n);
    
    // Ordena em ordem decrescente
    bubbleSortDecrescente(precos, n);
    printf("PREÇOS EM ORDEM DECRESCENTE:\n");
    imprimirPrecos(precos, n);
    
    // Estatísticas
    printf("ESTATÍSTICAS:\n");
    printf("-------------\n");
    printf("Preço médio: R$ %.2f\n", calcularMedia(precos, n));
    encontrarMaisCaro(precos, n);
    encontrarMaisBarato(precos, n);

    printf("=================================\n");
    printf("    Fim do Sistema de Preços\n");
    printf("=================================\n\n");
    
    return 0;
}