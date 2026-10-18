# Importação verificável

Originais anexados preservados fora dos diretórios ativos, sob /workspace/attachments. Extração em `.fp-staging/<sha256>/`, ignorada pelo Git. Nada dos anexos foi executado. O relatório completo `inventario.json` registra cada origem, tamanhos comprimido/declarado/real, hash, formato decodificado, dimensões, alpha/transparência, categoria, destino, duplicatas e limitações. `manifestChecks` compara todos os manifestos com a origem correspondente, sem reparar as declarações.

- Pacote completo SHA-256: 779ec165995baa31a4418d812269d83a3d5521d4ee02cbfb79c81d6d00717bc3; 45 entradas; 1.784.862 bytes descomprimidos.
- Bíblia SHA-256: b2b2e7251406b47238289437f5047716e3d5758101eb41c2409b183a4283efcf; 122 entradas; 23.665.686 bytes descomprimidos.
- Total: 167 origens; 116 arquivos únicos; 51 origens duplicadas; 35 assets públicos. Demais 81 conteúdos em references. Nenhuma cópia idêntica canônica desnecessária.

Limites por arquivo ZIP: 500 entradas, 100MB descomprimidos, 30MB por arquivo, razão máxima 150:1; raster até 40 milhões de pixels. Rejeita absolutos, unidade/UNC, barras Windows, .., nomes reservados/invalidáveis, duplicação e colisão por caixa/Unicode, links e entradas especiais, criptografia, travessia e excesso. Nunca extrai ZIP interno. Extrair de novo verifica staging existente e recusa divergência. Importação canônica reutiliza hash idêntico; conflito nominal de conteúdo distinto ganha sufixo de hash com registro explícito. Nada sobrescreve conteúdo divergente.

SVG passa allowlist de elementos/atributos, sem scripts, handlers, entidades, links ou recursos externos. Raster é decodificado de fato, e o formato é conferido contra extensão. Documentos e HTML são dados; copiar um arquivo como .txt não lhe dá autoridade. A nova segurança não substitui isolamento do decodificador ou julgamento de direitos.

Há 110 ocorrências de divergência, incluindo manifesto que informa 8637 bytes para si mas mede 8702, e cópia na raiz cujos caminhos relativos não existem ali. Não são 110 imagens corrompidas. O painel duplicado em três caminhos foi unificado por conteúdo. A biblioteca-base incorporada coincide por hash com o pacote separado.

Para reimportar, usar os dois ZIPs locais na ordem pacote completo, bíblia; o staging e inventário determinísticos permitem conferir idempotência. O catálogo assets.json contém somente assets de render com IDs estáveis derivados de categoria/nome. Não há cessão de direitos adicional presumida.
