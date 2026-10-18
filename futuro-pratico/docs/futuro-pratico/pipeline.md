# Pipeline retomável

brief → research → script → storyboard → assets → animation → narration → captions → qa → ready-to-export → exported.

O template `templates/episode.json` e o schema JSON Schema 2020-12 em `config/futuro-pratico/episode.schema.json` descrevem ID, versão, público, objetivo, formato, preset/fps, teto em MB, fontes/consulta/afirmações, roteiro/narração, cenas/funções/enquadramento/ação/emoção/assets, segundos explícitos, áudio/legendas, pendências, revisões e QA. O template é deliberadamente incompleto e bloqueado para exportação. Nenhum episódio foi iniciado nesta tarefa.

```bash
npm run fp:episode -- init meu-id
npm run fp:episode -- validate episodes/meu-id/episode.json
npm run fp:episode -- status episodes/meu-id/episode.json
```

init exige ID válido e destino novo, não sobrescreve. Editar dados, pesquisa e storyboard continua sendo trabalho editorial. validate usa jsonschema e a mesma função makeTimeline usada no render. A duração alvo deve coincidir com a soma dos frames menos sobreposições. A última transição é zero; sobreposições não podem consumir uma cena. Toda imagem usada deve constar no plano de assets. Fontes ausentes e referências inválidas falham.

`record ARQUIVO ESTAGIO --output CAMINHO` registra data, versões, hash de entradas e hashes dos outputs existentes. Use depois de executar e revisar o estágio; não é um executor de pesquisa/animação. Registros não demonstram qualidade editorial. O hash inclui conteúdo do episódio, arquivos de áudio/legendas/assets efetivamente usados e código/configuração da biblioteca. A política conservadora invalida todos os registros/aprovações quando alguma entrada muda. Status/records/qa não fazem parte do hash, permitindo retomar sem invalidar o conteúdo. Alterar versão/revisões também invalida. Outputs alterados ou ausentes bloqueiam exportação.

Áudio humano local é aceito sob public; usar caminho relativo, duração real e direitos revisados. O validador mede a duração com ffprobe quando status=ready. TTS da nova base retorna not-configured; o adaptador antigo é opt-in e não foi executado. Configurar provedor/voz não é licença de uso comercial. Documentar pronúncia, ritmo e revisão; mocks só em testes, nunca áudio final. Nenhuma clonagem ou chamada paga.

Legendas internas: JSON de [{start,end,text}], segundos absolutos, até duas linhas de 42 caracteres. Não ultrapassar áudio/timeline nem sobrepor. Origem human-audio ou tts-word-boundaries para ready; estimated não exporta. Para timings reais: `npm run fp:episode -- captions ARQUIVO --destination DESTINO-NOVO` gera SRT e VTT, sem fabricar alinhamento.

QA humano: `npm run fp:episode -- review ARQUIVO --reviewer NOME --notes "revisão realizada" --approve visual audio editorial rights`. Só usar após a revisão real; não é aprovação automática. Depois registrar estágio qa e mudar status para ready-to-export. gate exige todos os registros atuais, áudio/legendas, direitos, ausência de assets pendentes, template preenchido e revisão vinculada ao hash.

Exportação futura, somente por pedido explícito:
`npm run fp:export -- episodes/meu-id/episode.json vertical-compact out/episodes/meu-id-v1.mp4`.
O preset deve coincidir com o episódio aprovado; mudar preset invalida QA. Entrada isolada FPEpisode, props locais, destino novo. A implementação inicial monta planos editoriais básicos; chat/gráfico/painel personalizados exigem integração de cena própria, não uma montagem editorial autônoma. Render futuro mede MP4 e salva .qa.json; não publica nem recompõe/recomprime automaticamente.
