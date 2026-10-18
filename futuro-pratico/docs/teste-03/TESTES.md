# Testes técnicos — Teste03 — Roadster

**Resultado: aprovado nos checks executados.** Uma única exportação completa, seguida de validação do arquivo final.

- Resolução: 1080×1920; 30fps; 1551 frames; H.264, yuv420p, BT.709.
- Duração do vídeo: 51.700000s; contêiner: 51.712000s (padding AAC).
- Áudio: AAC estéreo, 48kHz; narração masculina pt-BR-AntonioNeural, velocidade padrão, sem time-stretch.
- Loudness do MP4: -16.60 LUFS; true peak:-4.85 dBTP; sem clipping detectado.
- Correlação do áudio codificado com a mixagem: 0.99997.
- Decodificação integral com FFmpeg e `-xerror`: passou.
- Detector de quadros pretos inesperados: nenhum evento (limiar próximo a preto integral,99,9% da imagem).
- Hashes dos três MP4s anteriores: inalterados.
- TypeScript e ESLint: passaram antes do render.
- Studio: composição carregada, metadados corretos, sem erros JavaScript.
- Amostras:14 frames de revisão e preview curto antes do render; oito frames extraídos do arquivo final.
- Narração/legendas: todos os clipes e timestamps cabem nos respectivos capítulos; pontuação preservada.
- Fotos históricas:duas imagens de Steve Jurvetson, CC BY2.0, com crédito e data visíveis; demais cenas são ilustrações originais.

| Capítulo | Intervalo medido | Verificação |
| --- | --- | --- |
| hook | 0.00–5.00s | voz nativa + legendas dentro da cena |
| event | 5.00–10.33s | voz nativa + legendas dentro da cena |
| mechanism | 10.33–20.57s | voz nativa + legendas dentro da cena |
| limit | 20.57–28.57s | voz nativa + legendas dentro da cena |
| claim | 28.57–35.70s | voz nativa + legendas dentro da cena |
| history | 35.70–43.70s | voz nativa + legendas dentro da cena |
| fineprint | 43.70–51.70s | voz nativa + legendas dentro da cena |

## Evidências

- `out/roadster-validation.json`:metadados e resultados estruturados.
- `out/roadster-validation.log`:decodificação, detecção de preto e medição de áudio.
- `out/roadster-cenas.jpg`:amostras dos sete capítulos e da fotografia histórica.
- `out/roadster-studio-review.png`:Studio com a composição.
- `docs/teste-03/previous-videos-sha256.json`:hashes de preservação.

A detecção automática não substitui avaliação humana de clareza, estética e naturalidade da voz. Os eventos visuais e as legendas foram checados contra os timestamps do TTS; não se trata de uma medição de atenção ou retenção de público. Não foram realizadas publicações nem testes A/B. Fatos, limites e direitos estão em FATOS-E-FONTES.md, DIREITOS.md e README.md.

Repetir a validação, sem renderizar novamente: `python3 scripts/validate_roadster.py`.

Revisão visual final: oito amostras do MP4 inspecionadas; títulos, esquemas, legendas e créditos históricos legíveis, sem sobreposições problemáticas nas amostras.
