#include <stdio.h>
#include <string.h>

// Criação de sistema bancário simples com autenticação

int main()
{
    int opcao;
    float saldo = 0.0, valor;
    float extrato[100];
    int num_transacoes = 0;
    
    // Sistema de autenticação
    char senhaCorreta[] = "1234";
    char senhaDigitada[20];
    int tentativas = 0;
    int autenticado = 0;
    
    printf("=== Bem-vindo ao NetBank ===\n");
    
    // Loop de autenticação
    while (!autenticado && tentativas < 3)
    {
        printf("Digite sua senha: ");
        scanf("%s", senhaDigitada);
        
        if (strcmp(senhaDigitada, senhaCorreta) == 0)
        {
            autenticado = 1;
            printf("Acesso concedido!\n\n");
        }
        else
        {
            tentativas++;
            printf("Senha incorreta! Tentativas restantes: %d\n", 3 - tentativas);
        }
    }
    
    if (!autenticado)
    {
        printf("Acesso bloqueado. Tente novamente mais tarde.\n");
        return 1;
    }

    // Sistema bancário (após autenticação)
    do
    {
        printf("\n=== NetBank - Menu Principal ===\n");
        printf("1. Ver Saldo\n");
        printf("2. Extrato\n");
        printf("3. Depositar\n");
        printf("4. Sacar\n");
        printf("5. Sair\n");
        printf("Escolha uma opção: ");
        scanf("%d", &opcao);

        switch (opcao)
        {
        case 1:
            printf("Saldo atual: R$ %.2f\n", saldo);
            break;
        case 2:
            printf("=== Extrato ===\n");
            if (num_transacoes == 0) {
                printf("Nenhuma transação realizada.\n");
            } else {
                for (int i = 0; i < num_transacoes; i++)
                {
                    if (extrato[i] > 0) {
                        printf("Depósito: R$ +%.2f\n", extrato[i]);
                    } else {
                        printf("Saque: R$ %.2f\n", extrato[i]);
                    }
                }
            }
            printf("Saldo final: R$ %.2f\n", saldo);
            break;
        case 3:
            printf("Digite o valor para depositar: R$ ");
            scanf("%f", &valor);
            if (valor > 0)
            {
                saldo += valor;
                extrato[num_transacoes] = valor;
                num_transacoes++;
                printf("Depósito de R$ %.2f realizado com sucesso!\n", valor);
            }
            else
            {
                printf("Valor inválido para depósito.\n");
            }
            break;
        case 4:
            printf("Digite o valor para sacar: R$ ");
            scanf("%f", &valor);
            if (valor > 0 && valor <= saldo)
            {
                saldo -= valor;
                extrato[num_transacoes] = -valor;
                num_transacoes++;
                printf("Saque de R$ %.2f realizado com sucesso!\n", valor);
            }
            else if (valor > saldo)
            {
                printf("Saldo insuficiente para saque.\n");
            }
            else
            {
                printf("Valor inválido para saque.\n");
            }
            break;
        case 5:
            printf("Saindo do sistema bancário. Obrigado!\n");
            break;
        default:
            printf("Opção inválida. Tente novamente.\n");
        }
    } while (opcao != 5);

    return 0;
}