#include <stdio.h>

int main() {

    int numeroSecreto = 7;
    int chute;

    printf("+++ Jogo do número secreto +++\n");
    printf("Qual o número secreto? ");

    do {
        scanf("%d", &chute);

        if (chute < numeroSecreto) {
            printf("O número secreto é maior! Tente novamente: ");
        } else if (chute > numeroSecreto) {
            printf("O número secreto é menor! Tente novamente: ");
        } else {
            printf("Parabéns! Você acertou o número secreto!\n");
        }
    } while (chute != numeroSecreto);
    return 0;
}