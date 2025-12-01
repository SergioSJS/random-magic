import './APICredits.css'

function APICredits() {
  return (
    <div className="api-credits">
      <p className="credits-text">
        Cartas fornecidas por{' '}
        <a 
          href="https://scryfall.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="credits-link"
        >
          Scryfall
        </a>
      </p>
      <p className="credits-subtext">
        API de dados de Magic: The Gathering
      </p>
    </div>
  )
}

export default APICredits

