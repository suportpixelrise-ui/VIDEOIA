# FUTURO PRÁTICO — versão 2

## Estado atual

Narração **pt-BR-AntonioNeural** gerada em velocidade natural e armazenada no projeto. A versão 2 mantém as cinco cenas, gancho imediato, textos secundários maiores, mais contraste, margens ampliadas e pergunta final.

Duração medida: **664 frames / 22,13 segundos**, em 1080x1920 a 30fps. A mixagem preserva a trilha original e reduz a música automaticamente durante a voz. O certificado confiável do proxy foi adicionado ao contexto TLS do Edge TTS; a verificação de certificados continua ativa. Nenhuma dependência React, TypeScript ou Remotion foi reinstalada.

O vídeo original permanece em `out/futuro-pratico-instagram.mp4`:

```
SHA256 16a213a64308d6e25109fff74ebd1c6aa6180646d43e0877db76a377952a03f7
```

Backup do código anterior: `/workspace/.backups/futuro-pratico-before-v2.tar.gz`.

## Reutilizar a narração e exportar

A configuração de rede foi salva pelo usuário e o serviço Edge TTS respondeu à geração. Não é preciso regenerar a voz ou reinstalar dependências para renderizar este vídeo. Para mudanças futuras no roteiro, use a instalação Python já preparada:

```bash
cd /workspace/VIDEOIA/futuro-pratico
/workspace/.tools/futuro-tts/bin/python scripts/generate_narration.py
```

O script usa `pt-BR-AntonioNeural`, pitch e velocidade padrão, seis frases com pausas intencionais. Mede cada arquivo com ffprobe e estende somente as cenas que precisarem de tempo. Atualiza `src/narration-plan.json`, reutiliza frases já geradas e não altera o MP4 ou a música original.

Arquivos gerados:

- `public/narracao/frase-01.mp3` a `frase-06.mp3`: gravações separadas.
- `public/narracao/frase-01.json` a `frase-06.json`: texto, voz e marcações por palavra.
- `public/narracao/futuro-pratico-narracao.wav`: narração completa separada, incluindo pausas.
- `public/narracao/futuro-pratico-mix-v2.wav`: voz principal e trilha original com redução automática durante a fala, ataque de 25ms e retorno de 350ms.
- `out/futuro-pratico-v2-narrado.mp4`: vídeo final H.264/AAC (verificação após render registrada ao final).

Conferir a narração e a mixagem ouvindo os WAVs. Depois, verificar o Studio já em execução e os tempos de cada cena:

```bash
npm run lint
npm run check:studio
```

Exportar após eventuais ajustes:

```bash
npm run render:v2
ffprobe -v error -show_streams -show_format out/futuro-pratico-v2-narrado.mp4
ffmpeg -v error -xerror -i out/futuro-pratico-v2-narrado.mp4 -f null -
sha256sum out/futuro-pratico-instagram.mp4
```

O render é bloqueado enquanto a narração estiver pendente. A saída sempre usa o nome novo, H.264, AAC, 1080x1920, 30fps, BT.709. O script verifica também que o hash do original não mudou. Confirmar que a fala acompanha cada assunto e que o arquivo não contém quadros pretos inesperados.

## Uso comercial e alternativa gratuita

`edge-tts` é um cliente **não oficial** do serviço online de leitura do Microsoft Edge, sem chave de API. O código do cliente usa LGPLv3 (um arquivo usa MIT); isso **não concede automaticamente licença comercial sobre o serviço ou sobre as vozes da Microsoft**. Antes de publicar comercialmente, verificar os termos atuais aplicáveis ao serviço e aos arquivos de voz. Não foi estabelecida aqui uma autorização comercial para a voz AntonioNeural.

Fontes:

- Cliente e funcionamento: https://github.com/rany2/edge-tts
- Licença do cliente: https://github.com/rany2/edge-tts/blob/master/LICENSE
- Termos Microsoft: https://www.microsoft.com/servicesagreement

Alternativa gratuita para produções futuras: **Piper**, execução local, com modelo masculino pt-BR e licença verificada no respectivo MODEL_CARD. O motor atual é GPLv3; modelos e dados de voz têm termos próprios. Piper não foi necessário para esta versão. Não presumir que qualquer voz gratuita permita todos os usos comerciais.

- Motor: https://github.com/OHF-Voice/piper1-gpl
- Modelos: https://huggingface.co/rhasspy/piper-voices

A música existente foi sintetizada localmente pelo próprio projeto, sem samples ou serviços externos, e foi preservada. Outfit mantém sua licença SIL OFL em `public/fonts/OFL.txt`.

## Sincronização verificada

| Cena | Início–fim da cena | Narração |
| --- | --- | --- |
| 1 | 0,00–4,13s | Você ainda não usa inteligência artificial? |
| 2 | 4,13–8,33s | Com ela, você pode criar sites, |
| 3 | 8,33–11,93s | automatizar tarefas |
| 4 | 11,93–15,73s | e produzir conteúdos incríveis. |
| 5 | 15,73–22,13s | O futuro já começou. E você, vai ficar de fora? |

Todas as seis frases cabem nas respectivas cenas, sem sobreposição nem ajuste de velocidade. A pergunta final aparece no frame 565 (18,83s). A prévia do Studio carrega a mixagem real sem erros JavaScript; TypeScript e lint passaram. A mixagem medida tem loudness integrado de -17,92 LUFS e true peak de -4,92 dBTP antes da codificação AAC, com folga para evitar distorção.

## Exportação final concluída

Arquivo: `/workspace/VIDEOIA/futuro-pratico/out/futuro-pratico-v2-narrado.mp4` — 6.095.254 bytes. Uma única exportação final realizada. FFprobe confirmou H.264, yuv420p, BT.709, 1080x1920, 30fps, 664 frames e áudio AAC estéreo 48kHz. Vídeo: 22,133333s; contêiner: 22,144s por padding do AAC.

Decodificação completa sem erros; nenhum quadro preto inesperado detectado; as cinco cenas foram inspecionadas em imagens extraídas do MP4 final. A correlação do áudio AAC decodificado com a mixagem de referência foi 0,99995. O hash do MP4 original foi conferido novamente e permaneceu idêntico. Relatório: `out/v2-validation.json`. Visão das cenas: `out/futuro-pratico-v2-cenas.jpg`.

Narração separada: `/workspace/VIDEOIA/futuro-pratico/public/narracao/futuro-pratico-narracao.wav`.
