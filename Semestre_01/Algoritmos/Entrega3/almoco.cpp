#include <stdio.h>
#include <string.h>

/*
 * PROGRAMA: CONTROLE DE CONSUMO DE ALMOÇOS
 * Autor: Gabriel Tesser Felix
 * Data: 29/09/2025
 *
 * Este programa calcula a média semanal de almoços servidos
 * em um restaurante.
 */

int main()
{
    int almocos[7];
    int totalSemana = 0;
    float mediaSemana;

    // Cabeçalho do programa
    printf("========================================\n");
    printf("  CONTROLE DE CONSUMO DE ALMOÇOS\n");
    printf("========================================\n\n");

    // Array de strings para os dias da semana
    const char *diasSemana[7] = {
        "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"};

    // Laço de repetição para entrada dos dados
    printf("Digite o número de almoços servidos em cada dia da semana:\n");
    printf("----------------------------------------\n");

    // Loop para entrada dos almoços diários
    for (int i = 0; i < 7; i++)
    {
        int entradaValida = 0;

        while (!entradaValida)
        {
            printf("%s: ", diasSemana[i]);

            // Tenta ler um número inteiro
            if (scanf("%d", &almocos[i]) == 1)
            {
                // Verifica se o número é não negativo
                if (almocos[i] < 0)
                {
                    printf("Número inválido. Por favor, insira um valor não negativo.\n");
                }
                else
                {
                    entradaValida = 1; // Entrada válida
                }
            }
            else
            {
                // Limpa o buffer de entrada em caso de caractere inválido
                printf("Entrada inválida. Por favor, insira um número inteiro.\n");
                while (getchar() != '\n')
                    ; // Limpa todo o buffer
            }
        }

        // Acumula o total da semana apenas uma vez
        totalSemana += almocos[i];
    }

    // Cálculo da média
    mediaSemana = totalSemana / 7.0;

    // Laço de repetição para exibir os resultados
    printf("\n----------------------------------------\n");
    printf("Relatório Semanal de Almoços\n");
    printf("----------------------------------------\n");

    // Exibição dos almoços diários
    printf("Consumo diário de almoços:\n");
    for (int i = 0; i < 7; i++)
    {
        printf("%s: %d almoços\n", diasSemana[i], almocos[i]);
    }

    // Exibição do total e da média
    printf("\nAnálise de consumo:\n");

    if (mediaSemana > 100)
    {
        printf("Alto consumo de almoços na semana!\n");
    }
    else if (mediaSemana >= 50 && mediaSemana <= 100)
    {
        printf("Consumo moderado de almoços na semana.\n");
    }
    else
    {
        printf("Baixo consumo de almoços na semana.\n");
    }

    // Qual o dia de maior e menor consumo
    int maiorConsumo = almocos[0];
    int menorConsumo = almocos[0];
    const char *diaMaiorConsumo = diasSemana[0];
    const char *diaMenorConsumo = diasSemana[0];

    // Loop para encontrar o dia de maior e menor consumo
    for (int i = 1; i < 7; i++)
    {
        if (almocos[i] > maiorConsumo)
        {
            maiorConsumo = almocos[i];
            diaMaiorConsumo = diasSemana[i];
        }
        if (almocos[i] < menorConsumo)
        {
            menorConsumo = almocos[i];
            diaMenorConsumo = diasSemana[i];
        }
    }

    // Exibição do dia de maior e menor consumo
    printf("\n----------------------------------------\n");
    printf("Análise de consumo:\n");
    printf("----------------------------------------\n");
    printf("Dia com maior consumo: %s (%d almoços)\n", diaMaiorConsumo, maiorConsumo);
    printf("Dia com menor consumo: %s (%d almoços)\n", diaMenorConsumo, menorConsumo);

    // Exibição do total e da média
    printf("\n----------------------------------------\n");
    printf("Total de almoços na semana: %d\n", totalSemana);
    printf("Média diária de almoços: %.2f\n", mediaSemana);
    printf("\n========================================\n");
    printf("       FIM DO PROGRAMA\n");
    printf("========================================\n");

    return 0;
}