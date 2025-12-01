import { useState } from 'react'
import './CardDisplay.css'

function CardDisplay({ cards, loading }) {
  const [selectedCard, setSelectedCard] = useState(null)

  if (loading) {
    return (
      <div className="card-container">
        <div className="loading">Carregando cartas...</div>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="card-container">
        <div className="empty-state">
          <p>Nenhuma carta encontrada</p>
          <p className="hint">Tente ajustar os filtros</p>
        </div>
      </div>
    )
  }

  const getCardSizeClass = () => {
    if (cards.length === 1) return 'single'
    if (cards.length === 2) return 'double'
    if (cards.length <= 4) return 'few'
    if (cards.length <= 6) return 'medium'
    return 'many'
  }

  return (
    <>
      <div className={`card-container ${getCardSizeClass()}`}>
        {cards.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className="card-item"
            onClick={() => setSelectedCard(card)}
          >
            <img
              src={card.image_uris?.png || card.image_uris?.large}
              alt={card.name}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="modal" onClick={() => setSelectedCard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedCard(null)}>
              &times;
            </span>
            <img
              src={selectedCard.image_uris?.png || selectedCard.image_uris?.large}
              alt={selectedCard.name}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CardDisplay

