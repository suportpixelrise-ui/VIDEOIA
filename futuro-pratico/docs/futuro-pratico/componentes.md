# Biblioteca reutilizável

Importe de `src/futuro-pratico` ou diretamente dos módulos. Nenhuma API faz requisição remota ou gera atuação articulada.

| Componente/utilitário | Propriedades principais |
| --- | --- |
| CharacterSprite | character, pose, x, y, height, scale, facing, cropBottom (percentual explícito; 0 por padrão) |
| SceneBackground | id, crop (cover/contain), focal [x,y] em %, pan limitado a 2%, zoom limitado a 4% |
| TechObject / AssetOverlay | id do catálogo e style; SVGs previamente revisados |
| Title | children editável e kicker opcional |
| Caption | cues em segundos absolutos; até duas linhas validadas no pipeline |
| InfoCard | title/text editáveis |
| ChatPanel | messages role human/assistant; identifica exemplo fictício |
| DemoChart | values 0–100 e labels correspondentes; sempre demonstrativo |
| TechDashboard | heading, items label/value; identifica exemplo fictício |
| EditorialLayout | canvas proporcional dentro das margens; kind registra a intenção de plano |
| Motion | entrada/saída em segundos, pan em px, zoom moderado por frames |
| DebugSafeArea | show; margens editoriais visíveis na composição atual |
| makeTimeline | cenas com durationSeconds/transitionSeconds e fps; offsets/duração únicos |
| framesFor | segundos → frames arredondados no fps atual |
| captionErrors | sobreposição, duração, áudio, linhas e texto |

Os exemplos concretos de distribuição para solo, duo, interface, objeto e revelação estão em `compositions/Catalog.tsx`. EditorialLayout fornece o espaço de coordenadas; não toma decisões narrativas nem resolve toda colisão de objetos. O template inicial ProductionEpisode faz montagem editorial básica. Para chat/gráfico personalizados, compor uma cena explicitamente usando os componentes; não há geração autônoma de direção.

```tsx
<SceneBackground id="cenarios.laboratorio" focal={[55,50]} zoom={0.02}/>
<EditorialLayout kind="solo">
  <Title kicker="FUTURO PRÁTICO">Uma descoberta.</Title>
  <CharacterSprite character="personagem_1" pose="pensativo"
    x={120} y={650} height={650} facing="original"/>
</EditorialLayout>
<DebugSafeArea show/>
```

Posições dentro de EditorialLayout usam 828×1460, área útil do canvas 1080×1920. Escala uniforme evita deformação; formatos horizontais podem deixar espaço e exigem direção própria. Sprite mantém proporção; scale/facing afetam a composição, não a expressão. Espelhamento e crop precisam de revisão de mãos/acessórios/pés. A orientação original é o padrão.

Pan de background usa overscan para evitar bordas vazias. Não desloca camadas internas da placa. Motion usa interpolação por frames e duração da Sequence. Cenas com sobreposição usam a timeline compartilhada; nunca calcule offsets paralelos à mão.

A fonte Outfit local é carregada nas composições independentes. Ao criar outra composição, carregar a mesma fonte local via @remotion/fonts ou importar uma composição existente. Montserrat não está disponível por padrão. Recursos de áudio ficam em ProductionEpisode e aceitam arquivo local, sem chamar TTS. Legendas são texto editável, sem imagem de texto.
