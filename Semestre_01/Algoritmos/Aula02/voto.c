#include <stdio.h>

int main() {
    int idade;

    printf("Digite sua idade: ");
    scanf("%d", &idade);

    if (idade >= 18 && idade <= 65) {
        printf("O voto é obrigatório.\n");
    } else if (idade <= 16) {
        printf("Ainda não pode votar.\n");
    } else {
        printf("O voto é opcional.\n");
    }
    return 0;
}