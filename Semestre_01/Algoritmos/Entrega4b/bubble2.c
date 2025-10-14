#include <stdio.h>

// Definir array com 10 produtos

float preco[10] = {10.00, 11.00, 3.00, 2.99, 3.99, 4.98, 5.97, 4.44, 9.99, 15.99};
char *produtos[10] = {
    "Arroz",
    "Manteiga",
    "Sal",
    "Sabão",
    "Pimenta",
    "Batata",
    "Tomate",
    "Beterraba",
    "Quinoa",
    "Queijo"
};

// Imprimir os preços dos produtos
void imprimirPrecos(float arr[], int n)
{
    printf("Preços dos produtos\n");
    printf("-------------------\n");

    for (int i = 0; i < n; i++)
    {
        printf("%-10s: R$ %.2f\n", produtos[i], arr[i]);
    }
    printf("\n");
}

// Função para ordenar os preços em ordem crescente usando Bubble Sort
void bubbleSortCrescente(float arr[], int n)
{
    for (int i = 0; i < n -1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j+1])
            {
                // Troca arr[j] e arr[j+1]
                float temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                // Acompanha os nomes dos produtos para manter a correspondência
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
            if (arr[j] < arr[j+1])
            {
                float temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

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

    for (int i = 0; i < n; i++)
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

    for (int i = 0; i < n; i++)
    {
        if (arr[i] < min)
        {
            min = arr[i];
            indice = i;
        }
    }
    printf("Produto mais barato: %s - R$ %.2f\n", produtos[indice], min);
}

// Função que executa o programa
int main()
{
    int n = sizeof(preco) / sizeof(preco[0]);

    printf("=================================\n");
    printf("    SISTEMA DE PREÇOS - MERCADO\n");
    printf("=================================\n\n");

    // Preços originais
    printf("Preços originais:\n");
    imprimirPrecos(preco, n);

    // Ordena em ordem crescente
    bubbleSortCrescente(preco, n);
    printf("Preços em ordem crescente:\n");
    imprimirPrecos(preco, n);

    // Ordena em ordem decrescente
    bubbleSortDecrescente(preco, n);
    printf("Preços em ordem decrescente:\n");
    imprimirPrecos(preco, n);

    // Estatísticas
    printf("Estatísticas:\n");
    printf("-------------\n");
    printf("Preço médio: R$ %.2f\n", calcularMedia(preco, n));
    encontrarMaisCaro(preco, n);
    encontrarMaisBarato(preco, n);

    printf("=================================\n");
    printf("    Fim do Sistema de Preços\n");
    printf("=================================\n\n");

    return 0;

}