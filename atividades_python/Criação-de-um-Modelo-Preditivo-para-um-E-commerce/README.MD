# Projeto: Previsão de Compra em Campanhas de E-mail

Este projeto simula um fluxo completo de ciência de dados para prever se um cliente irá realizar uma compra após receber uma campanha de e-mail. O pipeline inclui geração de dados sintéticos, treinamento de modelo de árvore de decisão e predição para novos clientes.

## Curso: Fundamentos de Python para IA - SENAI
Projeto didático para prática de machine learning e manipulação de dados em Python. 

## Estrutura dos Arquivos

- **gerador_de_dados.py**  
  Gera um arquivo CSV (`clientes_campanha.csv`) com dados fictícios de clientes e suas interações com campanhas de e-mail.

- **treinamento_modelo.py**  
  Lê o arquivo CSV, treina um modelo de árvore de decisão para prever compras e salva o modelo treinado (`modelo_decisao.joblib`).

- **prever_compra.py**  
  Carrega o modelo treinado e faz previsões de compra para novos clientes simulados.

- **requirements.txt**  
  Lista as dependências necessárias para rodar o projeto.

## Como Executar

1. **Instale as dependências:**
   ```sh
   pip install -r requirements.txt

2. **Gere os dados sintéticos:**
    ```sh
    python gerador_de_dados.py

3. **Treine o modelo:**
    ```sh
    python treinamento_modelo.py

4. **Faça previsões para novos clientes:**
    ```sh
    python prever_compra.py

    
# Fluxo do Projeto
## Geração de Dados:
Cria um conjunto de dados fictício com informações como idade, tempo de cadastro, se abriu o e-mail, se clicou no link e se comprou.

## Treinamento:
Utiliza uma árvore de decisão para aprender padrões que levam à compra, avaliando o desempenho do modelo.

## Predição:
Aplica o modelo treinado para prever a probabilidade de compra de novos clientes.

Dependências
pandas
numpy
scikit-learn
joblib

