import { Link } from 'react-router-dom'

export function Home() {
  return (
    <main style={{ padding: '40px', textAlign: 'center' }}>
      <h1>TravelTrucks</h1>
      <p>Discover and rent the perfect camper for your next adventure.</p>
      <Link to="/catalog">
        <button style={{ cursor: 'pointer' }}>View Now</button>
      </Link>
    </main>
  )
}

