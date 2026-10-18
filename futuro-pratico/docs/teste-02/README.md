# FUTURO PRÁTICO — Teste 02

Nova composição **FuturoPraticoTeste02** no mesmo projeto Remotion. As cenas e o plano da versão anterior não foram alterados. `src/Root.tsx` apenas registra a composição adicional; as ferramentas e dependências existentes foram reaproveitadas.

## Arquivos

- Vídeo: `/workspace/VIDEOIA/futuro-pratico/out/futuro-pratico-teste-02.mp4`.
- Narração separada: `/workspace/VIDEOIA/futuro-pratico/public/teste-02/narracao.wav`.
- Mixagem final: `/workspace/VIDEOIA/futuro-pratico/public/teste-02/mix-final.wav`.
- Efeitos originais: `public/teste-02/efeitos-originais.wav`.
- Frases nativas e metadados: `public/teste-02/voz-01.mp3` a `voz-08.mp3`, e JSONs correspondentes.
- Legendas por palavra: `public/teste-02/captions.json`.
- Roteiro: [ROTEIRO.md](ROTEIRO.md), fonte editável em [ROTEIRO.json](ROTEIRO.json).
- Fontes e limites da pesquisa: [PESQUISA.md](PESQUISA.md).
- Testes: [TESTES.md](TESTES.md), preenchido após a exportação.

## O que mudou

Em vez de enumerar possibilidades de IA, a história acompanha um pedido do início ao fim. Um mundo visual contínuo conecta e-mail, dados estruturados, tarefa, rascunho, revisão e resultado. A câmera viaja entre os pontos desse mundo, com pausas para leitura. O mesmo pacote visual acompanha o pedido, evitando transições decorativas sem relação com a narrativa.

Os campos são destacados no e-mail e preenchidos na estrutura de dados; a tarefa é montada; o rascunho é escrito; uma ramificação interrompe o fluxo quando falta informação. A comparação final mostra intervenções manuais e execução encadeada, sem fabricar números de tempo. A pergunta final convida o público a indicar uma tarefa concreta.

Legenda grande com pontuação, marca e aviso de demonstração permanecem nas áreas seguras. Movimento de câmera usa aceleração e desaceleração suaves; profundidade vem de perspectiva, iluminação e camadas CSS/SVG. O vídeo não depende de WebGL, imagens remotas ou recursos gerados por APIs pagas.

## Reabrir e exportar

```bash
cd /workspace/VIDEOIA/futuro-pratico
npm run dev -- --no-open --port=3000
```

Selecione **FuturoPraticoTeste02** no Studio. Reutilize um processo já em execução.

```bash
npm run lint
REMOTION_COMPOSITION=FuturoPraticoTeste02 npm run check:studio
npm run render:teste02
npm run validate:teste02
```

O render recusa sobrescrever um Teste02 já existente e verifica os hashes dos dois MP4s anteriores, registrados em `previous-videos-sha256.json`. Não é necessário reinstalar dependências ou regenerar narração.

Para futuras alterações de roteiro:

```bash
/workspace/.tools/futuro-tts/bin/python scripts/prepare_teste02.py
```

O gerador reutiliza os clipes cuja voz e texto não mudaram, mede o final falado, remove somente silêncio excedente e estende cenas que precisem de tempo. Velocidade e pitch permanecem no padrão. `--captions-only` atualiza somente o plano/legendas; `--sound-only` reconstrói efeitos e mixagem a partir dos clipes existentes.

A fonte oficial de `BasicCaptions.tsx` foi copiada sem alteração de https://www.remotion.dev/elements/captions/basic-captions.md. O estilo é aplicado pelo contêiner do Teste02. A biblioteca de legendas já estava instalada no projeto.

## Áudio e direitos

A música reutiliza o material procedural original do projeto, criado sem samples externos. Efeitos adicionais também foram sintetizados localmente. O código permite reproduzir esses assets; não foram usados bancos musicais, músicas comerciais ou APIs pagas.

Outfit mantém a licença SIL OFL em `public/fonts/OFL.txt`.

A voz é **pt-BR-AntonioNeural**, via `edge-tts` 7.3.1. O cliente é não oficial e sua licença de código (LGPLv3, com um arquivo MIT) não concede automaticamente direitos comerciais sobre o serviço ou a voz da Microsoft. Antes do uso comercial da narração, verificar os termos aplicáveis: https://www.microsoft.com/servicesagreement e https://github.com/rany2/edge-tts. Esta produção não estabelece uma autorização comercial da Microsoft.

A comparação animada, os textos e as interfaces são ilustrações do projeto. Nenhum logotipo ou captura de uma ferramenta externa foi utilizado como demonstração real.
