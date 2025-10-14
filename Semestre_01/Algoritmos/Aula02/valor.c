#include <stdio.h>

int main() {

    int A;
    int B;

    printf("Digite o valor de A (1 = verdadeiro, 0 = falso)");
    scanf("%d", &A);

    printf("Digite o valor de B (1 = verdadeiro, 0 = falso)");
    scanf("%d", &B);

    if (A == B) {
        printf("Condição verdadeira\n");
    } else {
        printf("Condição falsa\n");
    }
    return 0;
}