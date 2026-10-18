# Configuração e exportação futura

Configuração central em config/futuro-pratico: production.json, presets.json, assets.json, episode.schema.json. Tokens em src/futuro-pratico/theme. Não alterar os presets históricos, preservados como texto original em references/futuro-pratico/documentos/base/presets.json.txt.

| Preset | Resolução | FPS | CRF | AAC |
| --- | --- | --- | --- | --- |
| vertical-reference | 1080×1920 | 30 | 22 | 96kbps |
| vertical-compact (padrão) | 720×1280 | 24 | 28 | 96kbps |
| horizontal-compact | 1280×720 | 24 | 28 | 96kbps |
| horizontal-ultralight-original | 854×480 | 24 | 30 | 64kbps |

CRF de referência 22 é decisão de implementação, revisável. Não foi criado ultraleve vertical e 854×480 nunca é tratado como vertical. Horizontal requer direção de composição, não é fallback automático. Remotion H.264/AAC, opções compatíveis com 4.0.536; o exportador não foi exercitado até um render final, pois proibido nesta tarefa.

CRF não garante tamanho. WebP reduz assets, não determina MP4. Para teto decimal MB e duração t: vídeo kbps = floor(MB×8000×0,94/t − áudio kbps). A margem de 6% reserva contêiner/variações; é estimativa, exige medida posterior. Orçamento abaixo de 100kbps bloqueia por provável conflito de leitura. Após exportação autorizada, ffprobe mede codec, resolução, fps, duração, áudio e tamanho; desvio falha e salva relatório. Nenhuma recompressão automática (limite 0). Conflitos de teto/leitura voltam à revisão humana.

Não há novas chaves obrigatórias para uso local. TTS/pesquisa/geração/armazenamento externo precisam de adaptação e autorização próprias; nunca registrar segredos no Git. O adaptador antigo de narração permanece intacto, mas não é ativado pela nova base. Áudio humano local não requer serviço.

Git: não guardar ZIPs, .fp-staging, .fp-local, node_modules, bundle, renders ou credenciais. Limite de política para novo arquivo individual: 10MB; considerar LFS para novo binário acima disso após decisão explícita, sem migração de histórico. Acervo atual cabe no Git comum (maior imagem ~4,86MB). Exports futuros precisam de destino/retenção autorizados em artifacts/releases/armazenamento; padrão local out/episodes. Licenças dos anexos não foram verificadas independentemente.

Reprodução: Node compatível com engines; npm ci com lockfile. Python QA usa requirements-qa.txt (Pillow/jsonschema/PyYAML já existentes aqui); instalar essas versões apenas se ausentes em novo ambiente. Chromium via REMOTION_BROWSER_EXECUTABLE ou /usr/bin/chromium, FFmpeg/ffprobe no PATH. Skills locais são instruções, não instaladores ou serviços.
