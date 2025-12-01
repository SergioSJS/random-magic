import './Filters.css'

function Filters({ filters, onFilterChange, onApply, onSelectSets }) {
  const handleColorToggle = (color) => {
    const currentColors = filters.cardColors || []
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color]
    onFilterChange('cardColors', newColors)
  }

  const colorOptions = [
    { value: 'white', label: 'Branco', emoji: '⚪' },
    { value: 'blue', label: 'Azul', emoji: '🔵' },
    { value: 'black', label: 'Preto', emoji: '⚫' },
    { value: 'red', label: 'Vermelho', emoji: '🔴' },
    { value: 'green', label: 'Verde', emoji: '🟢' }
  ]

  return (
    <div className="filters-menu">
      <h3>Filtros</h3>
      
      <div className="filter-group">
        <label htmlFor="language">Idioma:</label>
        <select
          id="language"
          value={filters.language}
          onChange={(e) => onFilterChange('language', e.target.value)}
        >
          <option value="en">Inglês</option>
          <option value="pt">Português</option>
          <option value="es">Espanhol</option>
          <option value="fr">Francês</option>
          <option value="de">Alemão</option>
          <option value="it">Italiano</option>
          <option value="ja">Japonês</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="cardType">Tipo de Carta:</label>
        <select
          id="cardType"
          value={filters.cardType}
          onChange={(e) => onFilterChange('cardType', e.target.value)}
        >
          <option value="">Todos os Tipos</option>
          <option value="creature">Criatura</option>
          <option value="artifact">Artefato</option>
          <option value="enchantment">Encantamento</option>
          <option value="instant">Instantâneo</option>
          <option value="sorcery">Feitiço</option>
          <option value="planeswalker">Planeswalker</option>
          <option value="land">Terreno</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Cores:</label>
        <div className="color-selector">
          {colorOptions.map(color => (
            <button
              key={color.value}
              className={`color-button ${filters.cardColors?.includes(color.value) ? 'active' : ''}`}
              onClick={() => handleColorToggle(color.value)}
              title={color.label}
              aria-label={color.label}
            >
              <span className="color-emoji">{color.emoji}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <button className="set-selector-button" onClick={onSelectSets}>
          {filters.selectedSets.length > 0
            ? `Sets (${filters.selectedSets.length} selecionados)`
            : 'Selecionar Sets'}
        </button>
      </div>

      <button className="apply-button" onClick={onApply}>
        Aplicar Filtros
      </button>
    </div>
  )
}

export default Filters

