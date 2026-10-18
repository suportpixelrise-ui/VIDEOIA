# Diagnóstico inicial — 18/10/2026

- Raiz Git: `/workspace/VIDEOIA`; app npm: `futuro-pratico/`.
- Origin: `https://github.com/suportpixelrise-ui/VIDEOIA.git`.
- Estado inicial: branch simbólica `work`, sem commits; README e app inteiramente não rastreados. Não havia AGENTS.md aplicável em `/`, `/workspace` ou na árvore do projeto.
- `git ls-remote --heads origin` e `--symref origin HEAD` retornaram sucesso sem refs. API GitHub: size 0, default_branch main. Autenticação existente permite push; isso não fornece uma branch base para PR.
- Branch desta tarefa: `feat/fp-production-base`. Nenhum reset, clean, alteração de histórico ou atualização de dependências.
- Node 24.19.0; npm 11.9.0; package-lock.json; React/React DOM 19.2.3; Remotion e pacotes diretos 4.0.536; TypeScript 5.9.3; ESLint 10.12.0. Codex CLI 0.159.2.
- Chromium, FFmpeg, ffprobe, Pillow 12.3.0 e jsonschema 4.26.0 já disponíveis. Reutilizados sem reinstalação.
- Registro: `src/index.ts` chama registerRoot; `src/Root.tsx` registra os episódios anteriores e agora também o catálogo técnico. Entrada futura de episódio: `src/futuro-pratico/episode-entry.tsx`, isolada dos episódios históricos.
- Antes: lint/typecheck, bundle, Studio e scripts de áudio/render específicos. Não havia suíte geral, CI ou pipeline de episódios.
- Preservação: snapshot SHA-256 de todos os arquivos anteriores feito antes da edição; arquivos integrados de forma aditiva: package.json, .gitignore, README e src/Root.tsx. Vídeos e fontes de episódios anteriores permanecem no ambiente.

Plano executado: conferir anexos → importar com rastreabilidade → documentar padrão/Skills → biblioteca e pipeline → testes/stills/bundle → revisão Git. A conversa anterior recuperada é parcial; somente decisões presentes em arquivos ou neste pedido são afirmadas.
