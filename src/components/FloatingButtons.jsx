import './FloatingButtons.css'

function FloatingButtons({ quantity, onQuantityChange, onGenerate, onToggleFilters }) {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < 12) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="floating-buttons-container">
      <button
        className="floating-button quantity-control decrease"
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
        aria-label="Diminuir quantidade"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      
      <div className="floating-button quantity-display">
        {quantity}
      </div>
      
      <button
        className="floating-button quantity-control increase"
        onClick={increaseQuantity}
        disabled={quantity >= 12}
        aria-label="Aumentar quantidade"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      
      <button
        className="floating-button primary"
        onClick={onGenerate}
        aria-label="Gerar nova carta"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
        </svg>
      </button>
      
      <button
        className="floating-button secondary"
        onClick={onToggleFilters}
        aria-label="Filtros"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      </button>
    </div>
  )
}

export default FloatingButtons

