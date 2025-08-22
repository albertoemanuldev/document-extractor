
def obter_preferencias_usuario():
  
    while True:
        clima = input("Você prefere clima quente ou frio? ").lower().strip()
        if clima in ["quente", "frio"]:
            break
        print("Opção inválida. Por favor, digite 'quente' ou 'frio'.")


    while True:
        ambiente = input("Prefere lugares com natureza ou paisagens urbanas? (digite 'natureza' ou 'urbano') ").lower().strip()
        if ambiente in ["natureza", "urbano"]:
            break
        print("Opção inválida. Por favor, digite 'natureza' ou 'urbano'.")

 
    while True:
        orcamento = input("Qual é o seu orçamento disponível? (baixo, medio, alto) ").lower().strip()
        if orcamento in ["baixo", "medio", "alto"]:
            break
        print("Opção inválida. Por favor, digite 'baixo', 'medio' ou 'alto'.")

    return {"clima": clima, "ambiente": ambiente, "orcamento": orcamento}

def encontrar_destino_compativel(preferencias, lista_destinos):
    for destino in lista_destinos:
        if (destino["clima"] == preferencias["clima"] and
            destino["ambiente"] == preferencias["ambiente"] and
            destino["orcamento"] == preferencias["orcamento"]):
            return destino
    
    return None