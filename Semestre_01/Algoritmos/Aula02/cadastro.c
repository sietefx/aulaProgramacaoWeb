#include <stdio.h>

int main() {
    char nome[50];
    int idade;

    printf("+++ Cadastro de Usuário +++\n");
    printf("Digite seu nome: ");
    fgets(nome, sizeof(nome), stdin);

    printf("Digite sua idade: ");
    scanf("%d", &idade);

    if (idade < 18) {
        printf("Você é menor de idade. Não poderá se cadastrar.\n");
    } else {
        printf("Cadastro realizado com sucesso!\n");
        printf("Nome: %s", nome);
        printf("Idade: %d\n", idade);
    }

    return 0;
}
