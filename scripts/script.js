document.addEventListener('DOMContentLoaded', function () {
    const generateCardButton = document.getElementById('generateCardButton');
    const filterButton = document.getElementById('filterButton');
    const filterMenu = document.getElementById('filterMenu');
    const applyFiltersButton = document.getElementById('applyFilters');

    // Carregar automaticamente uma carta aleatória ao abrir a página
    fetchRandomCard();

    // Abre o menu de filtros ao clicar no botão flutuante "Filtros"
    filterButton.addEventListener('click', function () {
        filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Botão flutuante "Nova Carta" usa os filtros padrões
    generateCardButton.addEventListener('click', function () {
        fetchRandomCard();
    });

    // Aplica os filtros e busca uma nova carta ao clicar em "Aplicar Filtros"
    applyFiltersButton.addEventListener('click', fetchRandomCard);

    function fetchRandomCard() {
        const language = document.getElementById('language').value;
        const cardType = document.getElementById('cardType').value;
        const cardColors = Array.from(document.getElementById('cardColor').selectedOptions)
            .map(option => option.value)
            .join(' or ');  // Usa OR entre as cores

        // Monta a query para a API com base nos filtros
        let query = `https://api.scryfall.com/cards/random?q=lang:${language}`;
        if (cardType) {
            query += ` t:${cardType}`;
        }
        if (cardColors) {
            query += ` (color:${cardColors})`;  // Adiciona as cores com OR
        }

        fetch(query)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(card => {
                displayCard(card);
                filterMenu.style.display = 'none'; // Fecha o menu após aplicar os filtros
            })
            .catch(error => {
                console.error('Erro ao buscar carta aleatória:', error);
            });
    }

    function displayCard(card) {
        const cardImage = document.getElementById('cardImage');
        const cardText = card.oracle_text || 'Sem descrição disponível.';
        cardImage.src = card.image_uris.png || card.image_uris.large || '';
        cardImage.alt = `Carta: ${card.name}. ${cardText}`;
    }
});
