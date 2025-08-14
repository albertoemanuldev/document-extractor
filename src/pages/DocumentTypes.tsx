import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../components/ui/dialog";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import { useTiposDocumento } from "../lib/tiposDocumentoContext";

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

const tiposMock = [
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

const DocumentTypes: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingTipo, setEditingTipo] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { tipos, setTipos } = useTiposDocumento();
  const form = useForm({
    defaultValues: {
      nome: "",
      descricao: "",
      prompt: "",
      camposSaida: "",
    },
  });

  function onSubmit(data: any) {
    if (editingTipo) {
      // Editar tipo existente
      const tiposAtualizados = tipos.map(t =>
        t.id === editingTipo.id ? { ...t, ...data } : t
      );
      setTipos(tiposAtualizados);
      setEditingTipo(null);
    } else {
      // Adicionar novo tipo
      const novoTipo = {
        id: tipos.length > 0 ? Math.max(...tipos.map(t => t.id)) + 1 : 1,
        nome: data.nome,
        descricao: data.descricao,
        prompt: data.prompt,
        camposSaida: data.camposSaida,
      };
      setTipos([...tipos, novoTipo]);
    }
    setOpenForm(false);
    form.reset();
  }

  function handleEdit(tipo: any) {
    setEditingTipo(tipo);
    form.reset({
      nome: tipo.nome,
      descricao: tipo.descricao,
      prompt: tipo.prompt,
      camposSaida: tipo.camposSaida,
    });
    setOpenForm(true);
  }

  function handleDelete(id: number) {
    setTipos(tipos.filter((tipo) => tipo.id !== id));
    setDeleteId(null);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")}> <ArrowLeft className="w-4 h-4 mr-1" /> Voltar</Button>
          <h1 className="text-3xl font-bold">Tipos de Documentos</h1>
        </div>
        <Dialog open={openForm} onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEditingTipo(null);
            form.reset();
          }
          setOpenForm(isOpen);
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              form.reset(); // Limpa o formulário para um novo cadastro
              setEditingTipo(null);
              setOpenForm(true);
            }}>+ Adicionar Novo Tipo</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{editingTipo ? "Editar Tipo de Documento" : "Cadastrar Novo Tipo de Documento"}</DialogTitle>
              <DialogDescription>
                {editingTipo ? "Atualize os campos abaixo para editar o tipo de documento." : "Preencha os campos abaixo para adicionar um novo tipo de documento."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField name="nome" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Ficha Funcional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="descricao" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva o objetivo deste tipo de documento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="prompt" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt Padrão</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Prompt para extração de dados deste documento" rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="camposSaida" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campos de Saída Esperados</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: nome, data de nascimento, matrícula..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setOpenForm(false)}>Cancelar</Button>
                  <Button type="submit">Salvar</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-muted-foreground mb-8">
        Selecione, adicione ou edite os tipos de documentos que a IA irá analisar.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tipos.map((tipo) => (
          <Card key={tipo.id}>
            <CardHeader>
              <CardTitle>{tipo.nome}</CardTitle>
              <CardDescription>{tipo.descricao}</CardDescription>
            </CardHeader>
            <CardFooter className="justify-between gap-2">
              <div className="flex gap-2">
                {tipo.prompt && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" size="sm">Preview</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Prompt de Extração - {tipo.nome}</DialogTitle>
                        <DialogDescription>
                          Este é o prompt utilizado para extração automática dos dados deste tipo de documento.
                        </DialogDescription>
                      </DialogHeader>
                      <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto whitespace-pre-wrap font-mono text-gray-800 max-h-96">
                        {tipo.prompt}
                      </pre>
                    </DialogContent>
                  </Dialog>
                )}
                <Button variant="link" size="sm" onClick={() => handleEdit(tipo)}>Editar</Button>
              </div>
              <Button variant="destructive" size="icon" title="Excluir" onClick={() => setDeleteId(tipo.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
            {deleteId === tipo.id && (
              <Dialog open={true} onOpenChange={() => setDeleteId(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Excluir tipo de documento</DialogTitle>
                    <DialogDescription>Tem certeza que deseja excluir "{tipo.nome}"? Esta ação não pode ser desfeita.</DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setDeleteId(null)}>Cancelar</Button>
                    <Button variant="destructive" onClick={() => handleDelete(tipo.id)}>Excluir</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentTypes; 