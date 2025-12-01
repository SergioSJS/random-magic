# Random Magic Card Generator

Um gerador de cartas aleatórias do Magic: The Gathering usando a API do Scryfall. Disponível como Progressive Web App (PWA) - pode ser instalado no dispositivo!

🌐 **Acesse:** [https://sergiosjs.github.io/random-magic/](https://sergiosjs.github.io/random-magic/)

## 🚀 Funcionalidades

- ✨ Gera cartas aleatórias do Magic: The Gathering
- 🎯 Filtros avançados por:
  - Idioma (Inglês, Português, Espanhol, Francês, Alemão, Italiano, Japonês)
  - Tipo de carta (Criatura, Artefato, Encantamento, Instantâneo, Feitiço, Planeswalker, Terreno)
  - Cores (Branco, Azul, Preto, Vermelho, Verde)
  - Sets/coleções (atualizado automaticamente da API)
- 📱 Gera múltiplas cartas (1-12)
- 🔍 Visualização ampliada das cartas
- 🎨 Interface moderna e responsiva
- 📲 **PWA - Pode ser instalado como app no dispositivo**

## 🛠️ Tecnologias

- React 18
- Vite
- API Scryfall
- Progressive Web App (PWA)

## 📦 Instalação

```bash
npm install
```

## 🏃 Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

O build será gerado na pasta `dist/`

## 📱 PWA - Instalar como App

Este projeto é uma Progressive Web App (PWA), o que significa que pode ser instalado no dispositivo:

### Desktop (Chrome/Edge)
1. Acesse o site
2. Clique no ícone de instalação na barra de endereços
3. Ou vá em Menu → "Instalar Random Magic Card Generator"

### Mobile (Android)
1. Acesse o site no Chrome
2. Toque no menu (3 pontos) → "Adicionar à tela inicial"

### Mobile (iOS/Safari)
1. Acesse o site no Safari
2. Toque no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"

## 🚀 Deploy no GitHub Pages

O projeto está configurado para deploy automático no GitHub Pages:

1. **Deploy Automático**: O GitHub Actions faz deploy automaticamente ao fazer push para a branch `main`
2. **Configuração Manual**: 
   - Execute `npm run build`
   - Publique a pasta `dist/` na branch `gh-pages`

### Configuração do Base Path

O projeto está configurado para o repositório `random-magic`. Se o nome do repositório for diferente:

1. Edite `vite.config.js` e altere o `base`:
```js
base: '/seu-repositorio/',
```

2. Atualize o `manifest.json` com o novo `start_url`

3. Atualize o `sw.js` com os novos caminhos

## 📝 Notas

- Os sets são carregados automaticamente da API do Scryfall, sempre atualizados
- As cartas são fornecidas pela [Scryfall API](https://scryfall.com)
- O projeto usa Service Worker para cache offline (funcionalidade básica)
- Ícones PNG para PWA: Execute `python tools/generate_icons.py` (requer `cairosvg` e `pillow`)

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🙏 Agradecimentos

- [Scryfall](https://scryfall.com) - API de dados de Magic: The Gathering
- Wizards of the Coast - Magic: The Gathering
