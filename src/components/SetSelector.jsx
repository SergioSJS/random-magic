import { useState, useEffect } from 'react'
import './SetSelector.css'

function SetSelector({ selectedSets, onSelect, onClose }) {
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [localSelectedSets, setLocalSelectedSets] = useState(selectedSets)
  const itemsPerPage = 20

  useEffect(() => {
    fetchSets()
    setLocalSelectedSets(selectedSets)
  }, [])

  const fetchSets = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://api.scryfall.com/sets')
      const data = await response.json()
      
      // Filtrar apenas sets que têm cartas (não tokens, promos, etc)
      const validSets = data.data
        .filter(set => set.set_type !== 'token' && set.set_type !== 'memorabilia')
        .map(set => ({
          name: set.name,
          code: set.code,
          released_at: set.released_at,
          set_type: set.set_type
        }))
        .sort((a, b) => new Date(b.released_at) - new Date(a.released_at))
      
      setSets(validSets)
    } catch (error) {
      console.error('Erro ao buscar sets:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSets = sets.filter(set =>
    set.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    set.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedSets = filteredSets.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const totalPages = Math.ceil(filteredSets.length / itemsPerPage)

  const toggleSet = (setCode) => {
    setLocalSelectedSets(prev =>
      prev.includes(setCode)
        ? prev.filter(code => code !== setCode)
        : [...prev, setCode]
    )
  }

  const handleApply = () => {
    onSelect(localSelectedSets)
  }

  const handleClear = () => {
    setLocalSelectedSets([])
  }

  return (
    <div className="set-selector-modal" onClick={onClose}>
      <div className="set-selector-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        
        <h3>Selecionar Sets</h3>
        
        {localSelectedSets.length > 0 && (
          <div className="selected-count">
            {localSelectedSets.length} set{localSelectedSets.length !== 1 ? 's' : ''} selecionado{localSelectedSets.length !== 1 ? 's' : ''}
            <button className="clear-button" onClick={handleClear}>
              Limpar
            </button>
          </div>
        )}
        
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nome ou código..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(0)
          }}
        />
        
        {loading ? (
          <div className="loading">Carregando sets...</div>
        ) : (
          <>
            <div className="sets-list">
              {paginatedSets.length === 0 ? (
                <div className="empty-state">Nenhum set encontrado</div>
              ) : (
                paginatedSets.map(set => (
                  <div
                    key={set.code}
                    className={`set-item ${localSelectedSets.includes(set.code) ? 'selected' : ''}`}
                    onClick={() => toggleSet(set.code)}
                  >
                    <div className="set-name">{set.name}</div>
                    <div className="set-code">{set.code}</div>
                  </div>
                ))
              )}
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-button"
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                >
                  Anterior
                </button>
                <span className="page-info">
                  Página {currentPage + 1} de {totalPages}
                </span>
                <button
                  className="page-button"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage >= totalPages - 1}
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        )}
        
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="apply-button" onClick={handleApply}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SetSelector

