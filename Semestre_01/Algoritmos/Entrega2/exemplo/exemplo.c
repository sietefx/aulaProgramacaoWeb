#include <stdio.h>

int main()
{
    int numero;
    float preco;
    char categoria;

    printf("Digite o número: \n");
    scanf("%d", &numero);

    printf("Digite o preço: \n");
    scanf("%f", &preco);

    printf("Digite a categoria (A, B, C): \n");
    scanf(" %c", &categoria);
    printf("Número: %d, Preço: %.2f, Categoria: %c\n", numero, preco, categoria);
    return 0;
}