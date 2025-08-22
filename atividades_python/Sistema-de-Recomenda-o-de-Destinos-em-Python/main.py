# main.py
# Este é o arquivo principal que executa o sistema de recomendação.

# Importa os dados e as funções dos outros arquivos
from dados import destinos
from sistema import obter_preferencias_usuario, encontrar_destino_compativel

def iniciar_sistema():
    """
    Função principal que organiza a execução do sistema.
    """
    print("--- Sistema de Recomendação de Viagens ---")
    print("Olá! Vamos encontrar o destino perfeito para você.")
    
    # 1. Leitura de preferências usando a função importada
    preferencias_usuario = obter_preferencias_usuario()
    
    print("\nBuscando um destino com base nas suas preferências...")
    
    # 2. Avaliação de opções usando a função e os dados importados
    destino_sugerido = encontrar_destino_compativel(preferencias_usuario, destinos)
    
    # 3. Retorno de sugestão
    if destino_sugerido:
        print("\nDestino recomendado encontrado!")
        print(f"Nome: {destino_sugerido['nome']}")
        print(f"Justificativa: {destino_sugerido['justificativa']}")
    else:
        print("\nDesculpe, não encontramos um destino que corresponda perfeitamente às suas preferências.")
        print("Tente uma combinação diferente!")


if __name__ == "__main__":
    iniciar_sistema()