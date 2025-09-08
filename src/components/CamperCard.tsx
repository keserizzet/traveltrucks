import { Link } from 'react-router-dom'
import type { Camper } from '../api/client'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleFavorite } from '../store/slices/favoritesSlice'
import styles from './CamperCard.module.scss'

type Props = { camper: Camper }

export function CamperCard({ camper }: Props) {
  const dispatch = useAppDispatch()
  const favIds = useAppSelector((s) => s.favorites.ids)
  const isFav = favIds.includes(camper.id)

  return (
    <div className={styles.card}>
      <div className={styles.thumb} />
      <div style={{ flex: 1 }}>
        <h3 className={styles.title}>{camper.name}</h3>
        <div className={styles.row}>
          <strong>{camper.price.toFixed(2)}</strong>
          <span>{camper.location}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={() => dispatch(toggleFavorite(camper.id))}>
            {isFav ? 'Favoriden Çıkar' : 'Favorilere Ekle'}
          </button>
          <Link to={`/catalog/${camper.id}`} target="_blank" rel="noreferrer">
            <button>Show More</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

