document.addEventListener('DOMContentLoaded', function () {
    const generateCardButton = document.getElementById('generateCardButton');
    const filterButton = document.getElementById('filterButton');
    const decreaseQuantityButton = document.getElementById('decreaseQuantityButton');
    const increaseQuantityButton = document.getElementById('increaseQuantityButton');
    const cardQuantityInput = document.getElementById('cardQuantity');
    const filterMenu = document.getElementById('filterMenu');
    const applyFiltersButton = document.getElementById('applyFilters');
    const cardContainer = document.getElementById('cardContainer');
    const modal = document.getElementById('cardModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close');

    // Carregar automaticamente uma carta aleatória ao abrir a página
    fetchRandomCard();

    // Menu de filtros fechado por padrão
    filterMenu.style.display = 'none';

    // Abre o menu de filtros ao clicar no botão flutuante "Filtros"
    filterButton.addEventListener('click', function () {
        filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Diminui a quantidade de cartas
    decreaseQuantityButton.addEventListener('click', function () {
        let currentQuantity = parseInt(cardQuantityInput.value);
        if (currentQuantity > 1) {
            cardQuantityInput.value = currentQuantity - 1;
        }
    });

    // Aumenta a quantidade de cartas
    increaseQuantityButton.addEventListener('click', function () {
        let currentQuantity = parseInt(cardQuantityInput.value);
        if (currentQuantity < 10) {
            cardQuantityInput.value = currentQuantity + 1;
        }
    });

    // Botão flutuante "Nova Carta" usa os filtros atuais
    generateCardButton.addEventListener('click', function () {
        fetchRandomCard();
    });

    // Aplica os filtros e busca novas cartas ao clicar em "Aplicar Filtros"
    applyFiltersButton.addEventListener('click', function () {
        fetchRandomCard();
        filterMenu.style.display = 'none'; // Fecha o menu após aplicar os filtros
    });

    // Fecha o modal de visualização
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Função para buscar cartas
    function fetchRandomCard() {
        const language = document.getElementById('language').value;
        const cardType = document.getElementById('cardType').value;
        const cardColors = Array.from(document.getElementById('cardColor').selectedOptions)
            .map(option => option.value);

        // Construir a consulta de cores concatenando com color>=
        let cardColorsQuery = '';
        if (cardColors.length > 0) {
            const colorLetters = cardColors.map(color => {
                switch (color) {
                    case 'blue': return 'u';
                    case 'red': return 'r';
                    case 'white': return 'w';
                    case 'black': return 'b';
                    case 'green': return 'g';
                    default: return '';
                }
            }).join('');
            cardColorsQuery = `color>=${colorLetters}`;
        }

        const cardQuantity = parseInt(cardQuantityInput.value) || 1;

        cardContainer.innerHTML = ''; // Limpa as cartas anteriores

        for (let i = 0; i < cardQuantity; i++) {
            let searchQuery = `lang:${language}`;
            if (cardType) {
                if (cardType === 'land') {
                    searchQuery += ' t:land OR t:basic'; // Considera terrenos e terrenos básicos
                } else {
                    searchQuery += ` t:${cardType}`;
                }
                // Se o tipo de carta for terreno ou básico, buscar variações de arte
                if (cardType === 'land') {
                    searchQuery += ' unique:prints';  // Adiciona o parâmetro para buscar diferentes artes
                }
            }
            if (cardColorsQuery) {
                searchQuery += ` ${cardColorsQuery}`;
            }

            let queryUrl = `https://api.scryfall.com/cards/random?q=${encodeURIComponent(searchQuery)}`;

            // Imprime a URL gerada no log
            console.log("URL gerada: ", queryUrl);

            fetch(queryUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(card => {
                    displayCard(card, cardQuantity);
                })
                .catch(error => {
                    console.error('Erro ao buscar carta aleatória:', error);
                });
        }
    }

    // Exibe as cartas no container, ajustando o tamanho com base na quantidade
    function displayCard(card, quantity) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-item');
        if (quantity <= 2) {
            cardDiv.classList.add('large');  // Cartas maiores se a quantidade for pequena
        }
        cardDiv.innerHTML = `<img src="${card.image_uris.png || card.image_uris.large}" alt="${card.name}">`;
        cardDiv.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImage.src = card.image_uris.png || card.image_uris.large;
        });
        cardContainer.appendChild(cardDiv);
    }
});