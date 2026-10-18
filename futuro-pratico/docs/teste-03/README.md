# FUTURO PRÁTICO — Teste03 / Tesla Roadster

**Composição:** `FuturoPraticoRoadster` no projeto existente. **51,70s; 1551 frames; 1080×1920; 30fps.** Nenhuma dependência foi reinstalada. As três versões anteriores foram preservadas por hash.

## Entrega

- MP4: `/workspace/VIDEOIA/futuro-pratico/out/futuro-pratico-tesla-roadster.mp4`.
- Narração separada: `/workspace/VIDEOIA/futuro-pratico/public/teste-03/narracao.wav`.
- Mixagem: `/workspace/VIDEOIA/futuro-pratico/public/teste-03/mix-final.wav`.
- Roteiro e tempos: [ROTEIRO.md](ROTEIRO.md); fonte editável: `ROTEIRO.json`.
- Verificação jornalística e fontes: [FATOS-E-FONTES.md](FATOS-E-FONTES.md).
- Imagens, links, permissões e exclusões: [DIREITOS.md](DIREITOS.md).
- Testes do arquivo final: [TESTES.md](TESTES.md).

## Limite importante dos materiais

**Não foi obtida filmagem do evento de 2026 com direitos suficientemente claros para esta reutilização.** Conforme a alternativa autorizada no pedido, as manobras e os mecanismos foram representados por ilustrações identificadas na tela.

As duas fotos autênticas incluídas são do protótipo anterior, fotografado por Steve Jurvetson em 2019, sob CC BY 2.0. A edição informa que são imagens históricas, mantém o crédito e documenta os recortes. Não as apresenta como imagens do lançamento de 2026.

Materiais da AP, Tesla e revistas não foram presumidos como livres. Dois arquivos de 2026 encontrados no Wikimedia apresentavam sinais de licença problemática e foram excluídos. Veja a análise individual em DIREITOS.md.

## Animações criadas

- Cupê vetorial original com reflexos, vidros, rodas e perspectiva 2.5D. Não é uma réplica CAD nem uma imagem gerada apresentada como fotografia.
- Salto, giro e pouso ilustrativos com sombra ligada ao piso e trajetória sem escala. Sem altura ou tempo de voo inventados.
- Corte conceitual: reservatório, válvula, bocal, partículas de gás e setas opostas para mostrar ação e reação. Não há chama.
- Comparação entre pulso de salto e empuxo de sustentação, com peso e gás finito. Não estima autonomia real do Roadster.
- Aceleração representada em movimento, marcada como anúncio da Tesla para Thrust, sem cronômetro de teste.
- Fotografias reais com reenquadramentos e linha do tempo 2017 → evento 2026 → previsão 2028?, atribuída a Musk.
- Revelação da nota oficial da Rocket e parada diante da via, em lugar de uma conclusão institucional.
- Legendas sincronizadas com as marcações de fala, som procedural e breve redução da música na distinção entre anúncio e medição.

## Reabrir e repetir somente o necessário

```bash
cd /workspace/VIDEOIA/futuro-pratico
npm run dev -- --no-open --port=3000
REMOTION_COMPOSITION=FuturoPraticoRoadster npm run check:studio
npm run lint
```

Selecione `FuturoPraticoRoadster`; reutilize um Studio já ativo. A voz, as fotos e a mixagem são locais, portanto não exigem rede para a prévia ou render.

```bash
npm run render:roadster
npm run validate:roadster
```

O render recusa sobrescrever o próprio MP4 e confere as três versões anteriores. Para inspeção, prefira frames ou trechos localizados; não repita a exportação completa só para checar.

Se houver mudança de texto/tempos, `/workspace/.tools/futuro-tts/bin/python scripts/prepare_roadster.py` reutiliza os clipes de voz cujo texto permanece igual. O gerador verifica o intervalo 50–60s antes de aceitar o plano. Mantém o TLS/proxy confiável da solução anterior e não acelera a voz.

O elemento de legendas é reutilizado de `src/teste02/BasicCaptions.tsx`; fonte, marca, música-base, Chromium e ferramentas existentes também foram aproveitados. As cenas aprovadas dos vídeos anteriores não foram alteradas.

## Áudio e uso comercial

Música e efeitos são originais/procedurais, sem samples externos ou APIs pagas. Os sons não são gravações do carro ou do evento. A fonte Outfit mantém sua SIL OFL. As fotografias seguem CC BY 2.0, com atribuição e mudanças documentadas.

A narração usa pt-BR-AntonioNeural via edge-tts. A licença do cliente não concede automaticamente direitos comerciais sobre a voz/serviço da Microsoft. As condições aplicáveis devem ser conferidas antes de publicação comercial. Detalhes e links em DIREITOS.md.
