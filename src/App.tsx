import { Link, Outlet } from 'react-router-dom'
import './App.css'

export default function App() {
  return (
    <div>
      <header className="appHeader">
        <div className="container appHeaderInner">
          <Link to="/" style={{ fontWeight: 700 }}>TravelTrucks</Link>
          <nav style={{ display: 'flex', gap: 12 }}>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
          </nav>
        </div>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
