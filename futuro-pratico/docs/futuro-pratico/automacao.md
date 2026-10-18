# Automação real e seus limites

Execute os comandos em `futuro-pratico/`.

| Comando | O que executa |
| --- | --- |
| npm run fp:doctor | verifica ferramentas, dependências e recursos locais |
| npm run fp:assets:inspect -- A.zip B.zip | lista entradas/tamanhos/tipos e hashes sem extrair |
| npm run fp:assets:import -- A.zip B.zip | valida, extrai em staging, decodifica, deduplica e cataloga |
| npm run fp:assets:validate | confere arquivos, hashes e metadados canônicos |
| npm run fp:episode -- init ID | cria estrutura a partir de template, sem produzir conteúdo |
| npm run fp:episode -- validate ARQUIVO | schema, assets, fontes, áudio e timeline |
| npm run fp:episode -- status ARQUIVO | hashes e pendências para exportar |
| npm run fp:test | testes Node e Python, sem rede/serviços pagos |
| npm run lint | ESLint e TypeScript do projeto inteiro |
| npm run build | bundle Remotion; não exporta vídeo |
| npm run fp:preview | Studio; reutilize instância ativa quando possível |
| npm run fp:stills -- DESTINO-NOVO | cinco stills do catálogo; exige Chromium |
| npm run fp:export -- ARQUIVO PRESET NOVO.mp4 | gate e exportação futura explícita; não executada nesta tarefa |

Automatizável localmente: inventário, hashes, deduplicação, metadados, validações, timeline/montagem determinística, bundle, stills e relatórios. Scripts não assistem vídeos nem verificam fatos automaticamente.

Dependente de configuração: pesquisa, provedor TTS, geração de imagens, autenticação GitHub, Chromium/FFmpeg, fonte local e armazenamento. doctor não testa direitos nem credenciais remotas. O acervo e a fonte são locais, sem rede durante render; serviços de voz/pesquisa estão não configurados na nova base.

Dependente de autorização: serviços pagos, novas fontes/dados externos quando necessário, recursos remotos, exportação final e publicação conforme pedido. O pedido atual permite salvar/commit/push/PR em rascunho, mas não exportação, merge, release, agendamento, deploy ou publicação em redes. Não há automações recorrentes.

Dependente de julgamento humano: narrativa, clareza, expressão, fidelidade e continuidade, pronúncia, direitos, fontes e aprovação editorial. Tests/QA automáticos não provam esses aspectos. Sem áudio, QA de áudio fica pendente.

CI leve em pull_request/workflow_dispatch, read-only contents, npm ci, Python QA, testes, lint e bundle. Não usa pull_request_target, segredos privados, geração paga ou render completo. Um arquivo YAML não é serviço permanente; a execução remota depende de branch base, Actions habilitado, runner e rede. Ver relatório para o que foi efetivamente executado.

## Skills e descoberta no Codex

As cinco Skills estão em `.agents/skills/` na raiz Git, com YAML válido e referências relativas verificadas por `npm run fp:skills:validate`. Abra o Codex com diretório do repositório `/workspace/VIDEOIA` (ou o app dentro dele) e inicie/atualize uma sessão para recarregar Skills; invoque pelo nome quando disponíveis. Leia diretamente SKILL.md como fallback, sem alegar ativação automática.

A CLI instalada é 0.159.2. A consulta ativa via app-server/skills/list foi tentada, mas o servidor não inicializou por filesystem somente de leitura no estado global; um override local de sqlite não resolveu a inicialização. O catálogo executor da sessão retornou vazio. Portanto descoberta ativa não foi confirmada neste ambiente. Não foi solicitada escrita privilegiada só para esse teste; os arquivos estão no caminho padrão, validados e versionáveis. Nenhuma Skill é serviço, daemon ou agendamento.

Skills Remotion disponíveis nesta sessão foram consultadas (router e markup); não foram copiadas para o projeto nem reinstaladas. A nova base não pressupõe que o plugin esteja presente em outra máquina: use as instruções locais e a documentação oficial quando ausente.
