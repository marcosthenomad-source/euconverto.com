# 🚀 GIT - GUIA RÁPIDO

## ⚡ USAR OS SCRIPTS (MAIS FÁCIL!)

### 1️⃣ Enviar tudo para GitHub pela primeira vez:
```bash
duplo-clique: git-push-tudo.bat
```

### 2️⃣ Fazer deploy do site:
```bash
duplo-clique: deploy-site.bat
```

### 3️⃣ Fazer deploy do backend:
```bash
duplo-clique: deploy-backend.bat
```

---

## 📝 COMANDOS MANUAIS (SE PREFERIRES)

### Configurar Git pela primeira vez:
```bash
git config --global user.name "Marcos"
git config --global user.email "marcosthenomad@gmail.com"
```

### Enviar alterações para GitHub:
```bash
# 1. Ver o que mudou
git status

# 2. Adicionar ficheiros
git add .

# 3. Criar commit
git commit -m "Descrição das alterações"

# 4. Enviar para GitHub
git push
```

### Ver histórico:
```bash
git log --oneline
```

### Descartar alterações locais:
```bash
# Descartar alterações num ficheiro
git checkout -- nome-do-ficheiro.tsx

# Descartar TODAS as alterações
git reset --hard
```

### Buscar alterações do GitHub:
```bash
git pull
```

---

## 🆘 RESOLVER PROBLEMAS

### "Authentication failed"
**SOLUÇÃO:** Usa um Personal Access Token em vez da password!

1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Marca: `repo` (tudo)
5. Copia o token
6. Usa como password quando git pedir

### "Git not found"
**SOLUÇÃO:** Instala Git!

- Download: https://git-scm.com/downloads
- Reinstala e marca "Add to PATH"
- Reinicia o terminal/command prompt

### "Merge conflict"
**SOLUÇÃO:**
```bash
# 1. Ver conflitos
git status

# 2. Abrir ficheiros com conflitos e resolver manualmente
# Procura por: <<<<<<< HEAD

# 3. Adicionar ficheiros resolvidos
git add .

# 4. Continuar o merge
git commit -m "Resolvido conflito"
```

### Voltar atrás num commit:
```bash
# Ver histórico
git log --oneline

# Voltar atrás (mantendo alterações)
git reset --soft HEAD~1

# Voltar atrás (apagando alterações)
git reset --hard HEAD~1
```

---

## 🌿 TRABALHAR COM BRANCHES

### Criar nova branch:
```bash
git checkout -b nome-da-feature
```

### Ver branches:
```bash
git branch
```

### Mudar de branch:
```bash
git checkout main
git checkout nome-da-feature
```

### Juntar branches:
```bash
# 1. Vai para a main
git checkout main

# 2. Junta a feature
git merge nome-da-feature
```

### Apagar branch:
```bash
git branch -d nome-da-feature
```

---

## 📊 COMANDOS ÚTEIS

### Ver diferenças:
```bash
# Diferenças não staged
git diff

# Diferenças staged
git diff --staged
```

### Ver quem mudou cada linha:
```bash
git blame nome-do-ficheiro.tsx
```

### Limpar ficheiros não tracked:
```bash
git clean -fd
```

### Ignorar alterações num ficheiro:
```bash
git update-index --assume-unchanged nome-do-ficheiro
```

---

## 🎯 WORKFLOW RECOMENDADO

### Trabalho diário:
```bash
# 1. Buscar últimas alterações
git pull

# 2. Fazer alterações nos ficheiros...

# 3. Ver o que mudou
git status

# 4. Adicionar tudo
git add .

# 5. Commit
git commit -m "Feature: descrição clara"

# 6. Enviar
git push
```

### Ao começar nova feature:
```bash
# 1. Criar branch
git checkout -b feature-nova-funcionalidade

# 2. Fazer alterações...

# 3. Commit
git add .
git commit -m "Feature: nova funcionalidade"

# 4. Enviar
git push -u origin feature-nova-funcionalidade

# 5. Criar Pull Request no GitHub
# (Ir ao GitHub e clicar em "Compare & pull request")
```

---

## 🔐 CONFIGURAR SSH (OPCIONAL - MAIS SEGURO)

### 1. Gerar chave SSH:
```bash
ssh-keygen -t ed25519 -C "marcosthenomad@gmail.com"
```

### 2. Copiar chave pública:
```bash
cat ~/.ssh/id_ed25519.pub
```

### 3. Adicionar ao GitHub:
- GitHub → Settings → SSH and GPG keys
- New SSH key
- Cola a chave
- Save

### 4. Testar:
```bash
ssh -T git@github.com
```

### 5. Mudar remote para SSH:
```bash
git remote set-url origin git@github.com:marcosthenomad-source/euconverto.com.git
```

---

## 💡 DICAS

- ✅ Faz commits pequenos e frequentes
- ✅ Usa mensagens de commit descritivas
- ✅ Faz `git pull` antes de começar a trabalhar
- ✅ Testa antes de fazer push
- ✅ Usa branches para features novas
- ❌ Nunca faças `git push --force` sem saber o que estás a fazer
- ❌ Não committes ficheiros sensíveis (.env)

---

## 📚 MENSAGENS DE COMMIT

### Formato sugerido:
```
Tipo: Descrição curta

Tipo pode ser:
- Feature: Nova funcionalidade
- Fix: Correção de bug
- Refactor: Refatoração de código
- Docs: Alterações em documentação
- Style: Alterações de estilo (CSS, formatação)
- Test: Adicionar/alterar testes
- Chore: Manutenção (dependencies, configs)

Exemplos:
- Feature: Adicionar sistema de feedback por email
- Fix: Corrigir erro no login com Google
- Refactor: Melhorar performance do dashboard
- Docs: Atualizar README com instruções de deploy
```

---

## 🎓 PRÓXIMOS PASSOS

Depois de dominares estes comandos, explora:
- Git rebase (organizar histórico)
- Git stash (guardar alterações temporariamente)
- Git tags (marcar versões)
- Git hooks (automatizar tarefas)

---

**MAS PARA COMEÇAR, USA OS SCRIPTS `.bat`! 🔥**

*Última atualização: 19 Novembro 2025*
