# treinamento_modelo.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib # Biblioteca para salvar e carregar modelos do scikit-learn

# 1. Carregar os dados
try:
    df = pd.read_csv('clientes_campanha.csv')
except FileNotFoundError:
    print("Arquivo 'clientes_campanha.csv' não encontrado.")
    print("Execute primeiro o script 'gerador_de_dados.py'.")
    exit()

print("Dados carregados com sucesso.")

# 2. Separação das variáveis
X = df[['idade', 'tempo_cadastro_meses', 'email_aberto', 'clicou_link']]
y = df['comprou']

# 3. Divisão em treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2, 
    random_state=42, 
    stratify=y
)

# 4. Criação e Treinamento do Modelo
modelo = DecisionTreeClassifier(random_state=42)
modelo.fit(X_train, y_train)
print("Modelo treinado com sucesso.")

# 5. Avaliação do Modelo
y_pred = modelo.predict(X_test)
acuracia = accuracy_score(y_test, y_pred)

print("-" * 30)
print("Avaliação do Modelo nos Dados de Teste:")
print(f"Acurácia: {acuracia:.2f}")
print("\nRelatório de Classificação:")
print(classification_report(y_test, y_pred))
print("-" * 30)

# 6. Salvar o modelo treinado
nome_modelo_salvo = 'modelo_decisao.joblib'
joblib.dump(modelo, nome_modelo_salvo)

print(f"Modelo treinado e salvo com sucesso como '{nome_modelo_salvo}'!")