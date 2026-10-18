# Manual visual consultável

As referências estão fora de public: `references/futuro-pratico/`. Consulte `personagens/ficha_personagens.webp` para continuidade, `blocos/01.webp` a `12.webp` para o manual completo, `expressoes/atlas.webp`, `acoes/atlas.webp` e `storyboard/atlas.webp`. O painel `guias/Biblia-Visual-3000px.jpg` mede 3000×8100. Prévias e a imagem PNG adicional do ZIP estão catalogadas com hashes. Prompts, manifestos e HTML originais são preservados como `.txt` em documentos; não são instruções ativas.

| Seção | Uso prático |
| --- | --- |
| Ficha/personagens | conferência de identidade e figurino |
| Expressões e ações | repertório desejado; imagens opacas, sem rig |
| Storyboard | ficção de robô, ritmo e causalidade; não é notícia |
| Blocos e guias | enquadramentos, câmera, composição, interfaces e transições |
| Exemplos horizontal/vertical | orientação visual, não recorte obrigatório |

Acervo de render: 8 sprites de corpo inteiro (2 personagens × 4 poses), 8 retratos derivados, 6 cenários, 8 objetos, 5 SVGs. Todos os sprites/objetos/retratos têm transparência medida. Sprites: 384×512; retratos: 269×220. Não permitem closes arbitrários. Novas ações/expressões: 20 de cada, fundo claro, aproximadamente 274–275px por célula. Atlas são referências, não sequências de animação.

Ocorrência visual: personagem_1_neutro tem fragmento de cabelo de outra célula na borda inferior. O original não foi alterado; o exemplo duo usa cropBottom=4%, registrado na composição. Revisar pés/recorte ao mudar escala. Variações de rosto, cabelo e proporções entre imagens geradas permanecem pendentes de revisão por plano; disponibilidade não significa continuidade aprovada.

Cenários recorrentes: escritório/home office, quarto/rotina, laboratório/pesquisa, estúdio tecnológico/análise, garagem e cidade futurista. São placas únicas: apenas pan/zoom moderados. Parallax forte exige camadas preparadas, ausentes aqui.

Interfaces de chat, painel, gráfico e card são editáveis em React. Dados de exemplo estão identificados, sem valor probatório. HUDs e diagramas não comprovam fatos nem são animações prontas.

Prioridade vertical 1080×1920; entrega compacta 720×1280/24fps. Margens editoriais de referência: esquerda 72, direita 180, topo 180, base 280px, escaladas proporcionalmente por `safeArea()`, com overrides possíveis. Não são garantias oficiais das plataformas. Conferir rosto/mãos, título, legenda, personagem, objeto e interface no Studio com DebugSafeArea.

Catálogo técnico: cinco planos de três segundos demonstram solo, duo, interface dominante, objeto e virada. O conteúdo é técnico/fictício, sem áudio. Composição de referência vertical; o layout mantém proporções, inclusive em outros formatos, mas horizontal exige direção própria.

Câmera: geral, médio, close limitado pela resolução, detalhe, over shoulder, objeto, interface, reação, diálogo e descoberta. Movimento desejado: aproximação, afastamento, pan, acompanhamento, entrada em interface e mudança de atenção. Esta biblioteca implementa pan/zoom/entrada/saída moderados; acompanhamento articulado e profundidade em camadas ainda dependem de assets.

Transições: corte direto principal; corte estilizado, movimento, passagem por objeto, blur direcional, digital discreta, zoom narrativo e cena/interface conforme função narrativa. Os exemplos vetoriais não executam isso automaticamente. A faixa 6–10 frames a 24fps equivale a 0,25–0,417s; converta com `framesFor(seconds,fps)`. O timeline considera sobreposições; a implementação inicial oferece dissolve e movimento discreto, não uma coleção de efeitos prontos.

## Índice dos 12 blocos revisados

- [01 — Personagens principais](../../references/futuro-pratico/blocos/01.webp)
- [02 — Expressões faciais](../../references/futuro-pratico/blocos/02.webp)
- [03 — Poses e ações](../../references/futuro-pratico/blocos/03.webp)
- [04 — Storyboard narrativo](../../references/futuro-pratico/blocos/04.webp)
- [05 — Cenários principais](../../references/futuro-pratico/blocos/05.webp)
- [06 — Objetos e elementos](../../references/futuro-pratico/blocos/06.webp)
- [07 — Interfaces e HUD](../../references/futuro-pratico/blocos/07.webp)
- [08 — Enquadramentos](../../references/futuro-pratico/blocos/08.webp)
- [09 — Movimentos de câmera](../../references/futuro-pratico/blocos/09.webp)
- [10 — Transições](../../references/futuro-pratico/blocos/10.webp)
- [11 — Composição vertical](../../references/futuro-pratico/blocos/11.webp)
- [12 — Identidade e regras visuais](../../references/futuro-pratico/blocos/12.webp)
