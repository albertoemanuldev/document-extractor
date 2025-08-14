# gerador_de_dados.py

import pandas as pd
import numpy as np

# Para garantir a reprodutibilidade dos resultados
np.random.seed(42)

# Definindo o número de clientes na nossa base
num_clientes = 200

# Criando os dados
dados = {
    'idade': np.random.randint(18, 65, size=num_clientes),
    'tempo_cadastro_meses': np.random.randint(1, 48, size=num_clientes),
    'email_aberto': np.random.choice([0, 1], size=num_clientes, p=[0.3, 0.7]), # 70% de chance de abrir
}

# Criando o DataFrame
df = pd.DataFrame(dados)

# Criando as colunas dependentes de forma lógica
df['clicou_link'] = df['email_aberto'] * np.random.choice([0, 1], size=num_clientes, p=[0.5, 0.5])
df['comprou'] = df['clicou_link'] * np.random.choice([0, 1], size=num_clientes, p=[0.6, 0.4])

# Salvar o DataFrame em um arquivo CSV
nome_arquivo = 'clientes_campanha.csv'
df.to_csv(nome_arquivo, index=False) # index=False para não salvar o índice do pandas no arquivo

print(f"Dados gerados e salvos com sucesso no arquivo '{nome_arquivo}'!")