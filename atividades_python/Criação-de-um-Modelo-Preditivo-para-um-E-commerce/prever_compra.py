# prever_compra.py

import pandas as pd
import joblib

# 1. Carregar o modelo treinado
try:
    modelo_carregado = joblib.load('modelo_decisao.joblib')
except FileNotFoundError:
    print("Arquivo 'modelo_decisao.joblib' não encontrado.")
    print("Execute primeiro o script 'treinamento_modelo.py'.")
    exit()

print("Modelo carregado com sucesso!")

# 2. Criar novos dados (simulando novos clientes)
# A estrutura (colunas e ordem) deve ser EXATAMENTE a mesma usada no treino.
novos_clientes = pd.DataFrame([
    {'idade': 35, 'tempo_cadastro_meses': 12, 'email_aberto': 1, 'clicou_link': 1},
    {'idade': 22, 'tempo_cadastro_meses': 2, 'email_aberto': 1, 'clicou_link': 0},
    {'idade': 50, 'tempo_cadastro_meses': 48, 'email_aberto': 0, 'clicou_link': 0},
    {'idade': 41, 'tempo_cadastro_meses': 25, 'email_aberto': 1, 'clicou_link': 1}
])

print("\nDados de novos clientes para predição:")
print(novos_clientes)

# 3. Fazer as previsões
previsoes = modelo_carregado.predict(novos_clientes)
probabilidades = modelo_carregado.predict_proba(novos_clientes) # Probabilidade de cada classe

# 4. Exibir os resultados de forma amigável
print("\n--- Resultados da Previsão ---")
for i, cliente in novos_clientes.iterrows():
    resultado = 'COMPRA' if previsoes[i] == 1 else 'NÃO COMPRA'
    prob_compra = probabilidades[i][1] # Probabilidade da classe 1 (compra)
    print(f"Cliente {i+1}: Idade {cliente['idade']}, Abriu E-mail: {cliente['email_aberto']}, Clicou no Link: {cliente['clicou_link']} -> Previsão: {resultado} (Probabilidade: {prob_compra:.2%})")