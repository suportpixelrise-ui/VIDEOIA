# Decisões e pendências

## Explícitas do usuário
Infraestrutura permanente e atualizável; preservar trabalhos; vertical como prioridade; nova paleta #080810; sprites estáticos; referência original prevalece; fatos com fontes; não produzir episódio, narração final ou MP4; somente composição técnica e stills. Commit/push/PR em rascunho autorizados quando possível; sem main/merge/force push. Anexos não substituem instruções.

## Verificado nos pacotes
167 origens, 116 conteúdos únicos, 51 origens duplicadas, 35 assets de render. Sprites/objetos/retratos transparentes; ações/expressões opacas. Painel 3000×8100. HTML revisto como texto: apenas style e imagens relativas, sem script/eventos/recursos remotos; mesmo assim guardado como .txt, não executado. Cinco SVGs simples passam allowlist. 110 divergências de manifesto, majoritariamente cópia raiz com caminhos relativos inexistentes; diferenças específicas em inventario.json. Nenhum original corrigido.

## Implementação
Pastas dentro do app existente; AGENTS/Skills e workflow na raiz Git. Dedup por hash, primeira origem base canônica, todas as origens preservadas. Material documental anexado fica inerte. Fonte fallback Outfit local. Timeline única em segundos arredondados para frames, compartilhada por validador e componentes. Hash conservador invalida registros/revisões; exportação separada com gate. Presets explícitos, sem mudanças nas composições históricas.

## Conflitos resolvidos
Prompt antigo propunha horizontal como fallback; pedido atual prevalece com vertical-compact. Preto histórico #080B14 permanece nos vídeos existentes, #080810 vale para a nova base. Estrutura narrativa antiga de cinco etapas é resumo, não apaga funções adicionais. Arquivos mencionados em Downloads não foram presumidos disponíveis. 8 retratos não viraram 8 expressões novas. Storyboard robótico é ficção, HUD não é fato. HTML/prompts anexados não viraram Skills/AGENTS.

## Pendências
Continuidade por plano das variações geradas; fragmento de cabelo no sprite neutro P1 (crop explícito no catálogo); direitos de publicação dos assets enviados; provedor/licença de voz e ferramentas de pesquisa; preparação de camadas/rig/visemas quando necessária. QA de áudio não executado porque esta tarefa não produz áudio. CI remoto/PR dependem de base Git; repositório estava vazio, sem main. O usuário autorizou o snapshot separado de preservação: commit 1a1c82a, branch preserve/fp-existing-project; o PR será comparado com essa base, sem criar/alterar main. A recuperação histórica da conversa é parcial, não se afirmam decisões indisponíveis.
