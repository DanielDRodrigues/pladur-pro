<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-working-rules -->
# Project Working Rules

- Responder em portugues europeu, salvo pedido em contrario.
- Antes de alterar codigo, perceber a estrutura existente e seguir os padroes ja usados no projeto.
- Manter alteracoes focadas no pedido; evitar refactors ou mudancas esteticas sem necessidade clara.
- Nao reverter nem sobrescrever alteracoes existentes que nao tenham sido feitas pelo agente.
- Para tarefas de Next.js, consultar primeiro a documentacao local em `node_modules/next/dist/docs/` relacionada com a API ou convencao a alterar.
- Qualquer interface deve ser responsiva e funcionar bem em mobile, tablet e desktop.
- Validar o trabalho com os comandos relevantes disponiveis no projeto, como lint, build ou testes, quando fizer sentido.
- Se um comando importante falhar por permissao, rede ou dependencia externa, explicar o bloqueio e pedir autorizacao quando necessario.
- Comunicar de forma direta: indicar o que foi alterado, como foi validado e qualquer risco ou passo pendente.
<!-- END:project-working-rules -->
