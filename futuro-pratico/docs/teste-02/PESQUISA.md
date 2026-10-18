# Pesquisa editorial — FUTURO PRÁTICO / Teste 02

Consulta: **16 de outubro de 2026**. Pesquisa qualitativa; não é levantamento estatístico de mercado. Não foram utilizados números de visualizações, renda ou horas economizadas.

## Fontes consultadas e evidências

1. **Zapier — The 10 best AI email assistants in 2026**, atualização indicada na página em **30/07/2026**. https://zapier.com/blog/ai-email-assistant/
   - Página acessada (HTTP200); título, data e seções conferidos no HTML. Discute processamento de e-mail, enriquecimento de dados, respostas e escrita. É conteúdo editorial de um fornecedor, portanto há interesse comercial.
   - Formato concorrente observado: lista de aplicativos, comparação por caso de uso, demonstração de funcionalidades em seções. Oportunidade: substituir o catálogo de ferramentas pela história de um único pedido atravessando um fluxo.
2. **n8n — Integrate AI**, documentação oficial atual. https://github.com/n8n-io/n8n-docs/blob/main/docs/build/integrate-ai/README.md
   - Documenta combinação de modelos, ferramentas, lógica e avaliações em workflows. Sustenta a distinção entre chatbot isolado e automação encadeada.
3. **n8n — Gmail Draft Operations**, documentação oficial. https://github.com/n8n-io/n8n-docs/blob/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations.md
   - Confirma a operação de criar rascunhos; a demonstração mostra um rascunho, não um envio realizado.
4. **n8n — Human-in-the-loop for AI tool calls**, documentação oficial atual. https://github.com/n8n-io/n8n-docs/blob/main/docs/build/integrate-ai/ai-examples/human-in-the-loop-for-tools.md
   - Confirma possibilidade de pausar e aguardar aprovação antes de ferramentas selecionadas. Esse comportamento exige configuração; não é uma proteção automática de toda IA.
5. **Pergunta pública / pedido de funcionalidade**, GitHub n8n, **30/09/2026**: “Dynamic Multi-Action AI Tool Nodes (Unified Tool Definition for AI Agents)”. https://github.com/n8n-io/n8n/issues/39932
   - O autor relata a complexidade de ligar várias operações de serviços, incluindo pesquisar, ler, redigir e enviar e-mails. Evidência real de uma dificuldade de implementação; um relato individual não representa todo o público.
6. **n8n releases**, versões publicadas em **16/10/2026**, datas verificadas no HTML. https://github.com/n8n-io/n8n/releases
   - Confirma atividade recente da ferramenta. Não usamos frequência de releases como prova de popularidade ou de retorno financeiro.

Cópias dos documentos consultados estão em `research/teste-02/`. As tentativas iniciais de URLs antigas retornaram404 e não sustentam nenhuma afirmação. As referências acima usam os caminhos atuais, recuperados da árvore pública do repositório.

## Plataformas sociais: acesso e limites

- YouTube: busca `n8n AI email automation` bloqueada pelo proxy (CONNECT403). Não foram assistidos vídeos nem coletadas métricas. Não inventamos análise de concorrentes no YouTube.
- TikTok: busca pública de `ai automation` retornou HTTP200, porém apenas a estrutura genérica/configuração da página, sem uma amostra verificável de posts da busca. Não foi possível medir formato, interesse ou engajamento de vídeos individuais.
- Instagram: página pública da tag `aiautomation` retornou HTTP200 e metadados da tag, mas sem uma amostra confiável de Reels individuais. Não utilizamos o contador agregado exibido no título como pesquisa de audiência.
- Não foram solicitados login, dados privados ou APIs pagas.

## Decisão editorial

**Manter o tema preferencial**, com recorte concreto: “Do pedido por e-mail ao rascunho revisado: o que a IA pode automatizar”. A documentação e a discussão pública sustentam a utilidade e as dificuldades de implementação. Não há evidência suficiente para declarar esse tema o mais popular nas redes ou superior a todos os demais.

Público inferido: profissionais autônomos e pequenos negócios que repetem triagem, cadastro e respostas. Essa é uma hipótese editorial baseada no caso de uso, não uma pesquisa demográfica.

Potencial de monetização (hipótese, sem promessa): futuros conteúdos sobre diagnóstico de processos, configuração e manutenção de automações; serviços de implantação e materiais educativos. O vídeo entrega um método e pergunta qual tarefa o público automatizaria, para colher demanda real. Nenhuma renda é prometida.

## Regras factuais do roteiro

- O fluxo e os dados mostrados são **ilustrativos**, identificados na tela. Não são gravação de n8n, Zapier, Gmail ou um produto real.
- Não afirmar “horas viram segundos” sem benchmark. Comparar **intervenções manuais**, sem porcentagens ou cronômetro que simule medição real.
- A IA pode extrair informações e redigir; resultados dependem de integração, regras, permissões, modelo e qualidade dos dados.
- Aprovação humana é uma etapa explicitamente configurada do exemplo.
- Dados ausentes seguem para revisão. A animação mostra o caminho dessa exceção.
- Medir o processo real incluindo revisão e correções; nenhuma economia de tempo específica é apresentada como comprovada.
