> **Base de produção do canal:** [manual, catálogo, Skills e comandos](docs/futuro-pratico/README.md). Infraestrutura nova sem exportar episódio.

> **Teste03 — Tesla Roadster:** história de 51,70s, composição `FuturoPraticoRoadster`, com fatos atribuídos a AP/Tesla, fotos históricas CC BY 2.0 e ilustrações identificadas. [Roteiro, direitos e fontes](docs/teste-03/README.md).

> **Teste 02:** nova história audiovisual de 67,97s sobre automação de um pedido por e-mail. Composição `FuturoPraticoTeste02`, saída `out/futuro-pratico-teste-02.mp4`. [Roteiro, pesquisa e documentação](docs/teste-02/README.md). As versões anteriores foram preservadas.

> **Versão 2 narrada:** voz pt-BR-AntonioNeural em velocidade natural, 664 frames / 22,13s. Os assets de voz e mixagem estão em `public/narracao/`. `npm run render:v2` exporta `out/futuro-pratico-v2-narrado.mp4`, preservando o original. Leia [V2-NARRACAO.md](V2-NARRACAO.md) para tempos, caminhos e condições de uso comercial da voz.

# Futuro Prático

Especificações do MP4 original para Instagram, criado com Remotion: **1080 × 1920, 30 fps, 600 frames, 20 segundos**. Exportação MP4 com H.264, yuv420p, CRF 17 e áudio AAC estéreo. Sem APIs pagas.

## Executar

Requer Node.js 20.19+, 22.13+ ou 24+. Neste ambiente: Node.js 24 e Chromium em `/usr/bin/chromium`.

```bash
cd /workspace/VIDEOIA/futuro-pratico
npm ci
npm run dev -- --no-open --port=3000
```

No Studio, selecione **FuturoPratico**. As cinco cenas também podem ser abertas individualmente em **Cenas**. O Studio fica em `http://localhost:3000/FuturoPratico` na máquina que executa o projeto.

Para exportar:

```bash
npm run lint
npm run render
```

MP4 original preservado: `out/futuro-pratico-instagram.mp4`. A nova exportação será `out/futuro-pratico-v2-narrado.mp4`.

`remotion.config.ts` usa o Chromium instalado. Em outro sistema, defina `REMOTION_BROWSER_EXECUTABLE` com o caminho do seu Chrome/Chromium. O projeto não precisa acessar serviços externos durante a prévia ou exportação: a fonte e a trilha estão em `public/`.

Se o npm precisar do proxy do ambiente, use as variáveis já injetadas, sem copiar credenciais:

```bash
npm_config_https_proxy="$HTTPS_PROXY" npm_config_proxy="$HTTP_PROXY" npm ci
```

## Roteiro e edição

| Tempo | Cena | Componente |
| --- | --- | --- |
| 0–3s | VOCÊ AINDA NÃO USA IA? | `src/scenes/Opening.tsx` |
| 3–8s | 1. CRIAR SITES | `src/scenes/Websites.tsx` |
| 8–13s | 2. AUTOMATIZAR TAREFAS | `src/scenes/Automation.tsx` |
| 13–17s | 3. CRIAR CONTEÚDOS | `src/scenes/Content.tsx` |
| 17–20s | O FUTURO JÁ COMEÇOU. | `src/scenes/Closing.tsx` |

A timeline principal está em `src/Composition.tsx`; cores, fonte, logotipo e componentes compartilhados em `src/design.tsx`. Todas as animações dependem do frame atual, sem animações CSS baseadas no relógio. Perspectiva CSS e SVG criam profundidade sem depender de WebGL ou assets remotos.

Trilha instrumental original, gerada por `python3 scripts/make_audio.py`. Sem locução. Fonte Outfit sob SIL Open Font License, incluída em `public/fonts/OFL.txt`. As interfaces, ilustrações e o símbolo da marca foram desenhados para este projeto.

`npm run check:studio` verifica o Studio já em execução por Chromium e salva uma captura em `out/studio-review.png`. Os resultados e vídeos em `out/` são ignorados pelo Git; copie o MP4 antes de excluir ou recriar o ambiente.
