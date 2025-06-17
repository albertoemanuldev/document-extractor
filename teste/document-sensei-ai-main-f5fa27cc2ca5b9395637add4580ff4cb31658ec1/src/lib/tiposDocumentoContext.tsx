import React, { createContext, useContext, useState, useEffect } from "react";

export interface TipoDocumento {
  id: number;
  nome: string;
  descricao: string;
  prompt?: string;
  camposSaida?: string;
}

const promptFichaFuncional = `Extraia exatamente os seguintes dados, caso existam, da ficha funcional do profissional da saúde apresentada neste documento PDF:

- Nome completo
- Data de nascimento
- Portaria de nomeação
- Data de ingresso/data de posse
- Especialidade
- Períodos de férias
- Licenças/licenças prêmio/afastamentos
- Progressões
- Número de matrícula
- Averbações
- PDV (Plano de Demissão Voluntária)
- Regime de ingresso (estatutário ou celetista)
- Dados de cessão (se foi cedido para outro órgão, quais órgãos, datas e documentos relacionados)
- Órgão de origem
- Dados de exoneração (motivo, datas e documentos)
- Quaisquer outros dados funcionais presentes na ficha

Exemplo de saída esperada:
Nome completo: Luiz Fernando Silva de Barros
Data de nascimento: 19.02.54
Portaria de nomeação: Não especificada no documento.
Data de ingresso/data de posse: 12.02.1985
Especialidade: Não especificada no documento.
Períodos de férias: Não especificados no documento.
Licenças/licenças prêmio/afastamentos: Não especificados no documento.
Progressões: Não especificadas no documento.
Número de matrícula: 43.232
Averbações: Não especificadas no documento.
PDV (Plano de Demissão Voluntária): Não mencionado no documento.
Regime de ingresso (estatutário ou celetista): Estatutário (conforme a transferência para o regime jurídico do Estatuto dos Funcionários Públicos Civis do Estado de Alagoas).
Dados de cessão: Não mencionados no documento.
Órgão de origem: Secretaria de Saúde e Serviço Social do Estado de Alagoas.
Dados de exoneração: Não mencionados no documento.
Quaisquer outros dados funcionais presentes na ficha: O documento menciona que Luiz Fernando Silva de Barros é médico, código NS-421-B, e que ele é casado. Também contém informações sobre sua filiação e dados de identificação, como CPF e número da carteira de identidade.`;

const tiposMock: TipoDocumento[] = [
  {
    id: 1,
    nome: "Nota Fiscal",
    descricao: "Extração de dados como CNPJ, valor total, itens e datas de notas fiscais de serviço ou produto.",
  },
  {
    id: 2,
    nome: "Contrato Social",
    descricao: "Análise de cláusulas, identificação de sócios, capital social e objeto do contrato.",
  },
  {
    id: 3,
    nome: "CNH",
    descricao: "Validação de informações de Carteira Nacional de Habilitação, como nome, CPF e categoria.",
  },
  {
    id: 4,
    nome: "Ficha Funcional/Descritiva",
    descricao: "Extração automática de dados funcionais e descritivos do profissional da saúde a partir da ficha funcional.",
    prompt: promptFichaFuncional,
  },
];

interface TiposDocumentoContextProps {
  tipos: TipoDocumento[];
  setTipos: React.Dispatch<React.SetStateAction<TipoDocumento[]>>;
}

const TiposDocumentoContext = createContext<TiposDocumentoContextProps | undefined>(undefined);

export const TiposDocumentoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tipos, setTipos] = useState<TipoDocumento[]>(() => {
    const local = localStorage.getItem("tiposDocumento");
    return local ? JSON.parse(local) : tiposMock;
  });

  useEffect(() => {
    localStorage.setItem("tiposDocumento", JSON.stringify(tipos));
  }, [tipos]);

  return (
    <TiposDocumentoContext.Provider value={{ tipos, setTipos }}>
      {children}
    </TiposDocumentoContext.Provider>
  );
};

export function useTiposDocumento() {
  const context = useContext(TiposDocumentoContext);
  if (!context) {
    throw new Error("useTiposDocumento deve ser usado dentro de TiposDocumentoProvider");
  }
  return context;
} 