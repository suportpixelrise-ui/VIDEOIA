# Relatório de QA da infraestrutura

Resultados finais são complementados ao executar os checks. Esta tarefa não avalia um episódio nem gera áudio/MP4. Aprovação técnica não implica aprovação narrativa, de continuidade ou de direitos.

## Executado e aprovado nesta sessão

- Diagnóstico real: Node/npm, Chromium, FFmpeg/ffprobe, dependências e Python QA existentes. Nenhuma reinstalação ou atualização de dependência de aplicação; package-lock.json inalterado.
- Importação real dos dois ZIPs e reimportação completa: 167 origens, 116 conteúdos únicos, 35 assets públicos. Catálogo/arquivos/hashes/metadados validados novamente. Staging e arquivos divergentes não foram sobrescritos.
- 24 testes passaram: 4 Node + 20 Python. Cobrem travessia/absolutos/Windows, links, colisões por caixa/duplicação/prefixo, limites, SVG ativo, idempotência, deduplicação e distinção de conteúdo, catálogo, schemas, assets/fontes ausentes, timeline/overlap, legendas, inicialização sem sobrescrita, invalidação por texto/áudio, exportação SRT/VTT, Skills e bloqueio antes de chamar renderizador.
- Fixture positiva do gate usou bytes sintéticos e ffprobe mockado exclusivamente no teste, nunca apresentados como áudio final. O teste de SRT/VTT usa timings fictícios declarados na própria fixture. Não há narração/episódio real novo.
- ESLint + TypeScript do projeto completo passaram; bundle Remotion completo passou. Nenhum teste foi desabilitado.
- Studio carregou FPCatalogoTecnico, 1080×1920/24fps/15s, sem erros JavaScript detectados. Screenshot local: out/fp-qa/studio.png.
- Cinco stills finais gerados em out/fp-qa/final, um por layout; revisados visualmente. [Contato visual](catalogo.jpg). Transparência, proporção, crop, hierarquia de texto, margens editoriais, personagens e recursos conferidos nessas amostras. Ajustado rótulo de safe areas para não colidir com kicker.
- Revisadas ficha original, sprites neutros, atlas de ações/expressões e os 12 blocos. Há fragmento de outra célula em P1 neutro; o catálogo duo usa crop explícito e preserva original. Variações geradas exigem revisão em cada plano futuro.
- 149 arquivos prévios comparados ao snapshot: 145 inalterados e quatro integrações aditivas (README, .gitignore, package.json, Root.tsx). Os quatro MP4s completos e preview antigo preservados por SHA-256. Evidência: preservacao.json.
- Varredura por padrões comuns de credenciais/chaves privadas sem achados; staging/ZIPs/renders/build/cache fora do Git. Não constitui prova matemática de ausência de segredos. Links da documentação nova e referências das Skills resolvem.

## Limites e verificações não executadas

- Não foi exportado vídeo; o caminho real de render/ffprobe pós-exportação futura não foi exercitado de ponta a ponta. O gate bloqueado e o caso positivo sintético foram testados.
- Áudio final e sua pronúncia/ritmo/loudness/sincronismo não se aplicam à infraestrutura e permanecem pendentes por episódio. Não há QA de áudio aprovado para produção.
- Os testes não provam qualidade narrativa, verdade dos fatos, continuidade em todos os planos ou direitos dos anexos.
- Skills: YAML/referências passaram; descoberta ativa no serviço Codex não foi confirmada por falha de inicialização em filesystem somente de leitura. Consultar automacao.md.
- Workflow CI preparado; execução remota registrada após criação do PR, se disponível. Testes locais executados não são apresentados como resultado do GitHub Actions.
- Publicação de ambiente e restauração em nova tarefa não foram testadas. Nenhum merge, deploy, agendamento, release ou publicação em rede social.

## Repetir

No app: `npm run fp:doctor`, `npm run fp:skills:validate`, `npm run fp:assets:validate`, `npm run fp:test`, `npm run lint`, `npm run build`. Para imagens, `npm run fp:stills -- out/fp-qa/DESTINO-NOVO`. Para Studio já ativo: `npm run fp:check:studio` (porta 3000). Não repetir exportação de vídeos históricos como teste de infraestrutura.
