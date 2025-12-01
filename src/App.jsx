import { useState, useEffect, useRef } from 'react'
import CardDisplay from './components/CardDisplay'
import Filters from './components/Filters'
import FloatingButtons from './components/FloatingButtons'
import SetSelector from './components/SetSelector'
import APICredits from './components/APICredits'
import './App.css'

function App() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    language: 'en',
    cardType: '',
    cardColors: [],
    selectedSets: [],
    quantity: 1
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showSetSelector, setShowSetSelector] = useState(false)
  const hasLoadedRef = useRef(false)

  // Carregar uma carta ao iniciar (apenas uma vez)
  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true
      fetchRandomCard()
    }
  }, [])

  const buildSearchQuery = () => {
    let query = `lang:${filters.language}`
    
    if (filters.cardType) {
      if (filters.cardType === 'land') {
        query += ' t:land OR t:basic unique:prints'
      } else {
        query += ` t:${filters.cardType}`
      }
    }
    
    if (filters.cardColors.length > 0) {
      const colorLetters = filters.cardColors.map(color => {
        switch (color) {
          case 'blue': return 'u'
          case 'red': return 'r'
          case 'white': return 'w'
          case 'black': return 'b'
          case 'green': return 'g'
          default: return ''
        }
      }).join('')
      query += ` color>=${colorLetters}`
    }
    
    if (filters.selectedSets.length > 0) {
      const setQuery = filters.selectedSets.map(set => `e:${set}`).join(' OR ')
      query += ` ${setQuery}`
    }
    
    return query
  }

  const fetchRandomCard = async () => {
    setLoading(true)
    setCards([])
    
    const query = buildSearchQuery()
    const promises = []
    
    for (let i = 0; i < filters.quantity; i++) {
      const url = `https://api.scryfall.com/cards/random?q=${encodeURIComponent(query)}`
      promises.push(
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro na requisição: ' + response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            console.error('Erro ao buscar carta:', error)
            return null
          })
      )
    }
    
    const results = await Promise.all(promises)
    const validCards = results.filter(card => card !== null)
    setCards(validCards)
    setLoading(false)
  }

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSetSelection = (selectedSets) => {
    updateFilter('selectedSets', selectedSets)
    setShowSetSelector(false)
  }

  return (
    <div className="app">
      <APICredits />
      <CardDisplay cards={cards} loading={loading} />
      
      <FloatingButtons
        quantity={filters.quantity}
        onQuantityChange={(qty) => updateFilter('quantity', qty)}
        onGenerate={fetchRandomCard}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      
      {showFilters && (
        <Filters
          filters={filters}
          onFilterChange={updateFilter}
          onApply={() => {
            fetchRandomCard()
            setShowFilters(false)
          }}
          onSelectSets={() => setShowSetSelector(true)}
        />
      )}
      
      {showSetSelector && (
        <SetSelector
          selectedSets={filters.selectedSets}
          onSelect={handleSetSelection}
          onClose={() => setShowSetSelector(false)}
        />
      )}
    </div>
  )
}

export default App

