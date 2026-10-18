# Testes técnicos — Teste02

**Resultado: aprovado nos checks executados.** Uma única exportação completa, seguida de validação do arquivo final.

- Resolução: 1080×1920; 30fps; 2039 frames; H.264, yuv420p, BT.709.
- Duração do vídeo: 67.966667s; contêiner: 67.968000s (padding AAC).
- Áudio: AAC estéreo, 48kHz; narração masculina pt-BR-AntonioNeural, velocidade padrão, sem time-stretch.
- Loudness do MP4: -16.51 LUFS; true peak:-4.67 dBTP; sem clipping detectado.
- Correlação do áudio codificado com a mixagem: 0.99996.
- Decodificação integral com FFmpeg e `-xerror`: passou.
- Detector de quadros pretos inesperados: nenhum evento (limiar próximo a preto integral,99,9% da imagem).
- Hashes dos dois MP4s anteriores: inalterados.
- TypeScript e ESLint: passaram antes do render.
- Studio: composição carregada, metadados corretos, sem erros JavaScript.
- Amostras: 18 frames de revisão antes do render; nove frames extraídos do arquivo final para inspeção visual.
- Narração/legendas: todos os clipes e timestamps cabem nos respectivos capítulos; pontuação preservada.
- Mixagem anterior à codificação: −16,51 LUFS,−4,65 dBTP; margem estimada voz versus música/efeitos durante a fala de 29,87dB.

| Capítulo | Intervalo medido | Verificação |
| --- | --- | --- |
| hook | 0.00–3.00s | voz nativa + legendas dentro da cena |
| problem | 3.00–11.40s | voz nativa + legendas dentro da cena |
| solution | 11.40–19.57s | voz nativa + legendas dentro da cena |
| extract | 19.57–26.57s | voz nativa + legendas dentro da cena |
| execute | 26.57–36.57s | voz nativa + legendas dentro da cena |
| review | 36.57–47.70s | voz nativa + legendas dentro da cena |
| result | 47.70–57.70s | voz nativa + legendas dentro da cena |
| close | 57.70–67.97s | voz nativa + legendas dentro da cena |

## Evidências

- `out/teste02-validation.json`:metadados e resultados estruturados.
- `out/teste02-validation.log`:decodificação, detecção de preto e medição de áudio.
- `out/teste-02-cenas.jpg`:amostras dos oito capítulos e da exceção.
- `out/teste02-studio-review.png`:Studio com a composição.
- `docs/teste-02/previous-videos-sha256.json`:hashes de preservação.

A detecção automática não substitui avaliação humana de clareza, estética e naturalidade da voz. Os eventos visuais e as legendas foram checados contra os timestamps do TTS; não se trata de uma medição de atenção ou retenção de público. Não foram realizadas publicações nem testes A/B. Pesquisa, direitos e limitações estão em PESQUISA.md e README.md.

Repetir a validação, sem renderizar novamente: `python3 scripts/validate_teste02.py`.

Revisão das amostras extraídas do MP4 concluída: as oito etapas, a exceção, a pergunta final e a identificação de demonstração estão presentes. As margens e a separação entre títulos, interface e legendas foram conferidas nessas amostras.

SHA256 do arquivo validado: `ce3569f42b4da0a0f80728e1bc4911aaec3abc8f98e81486031c4d0955a7f88c`.
