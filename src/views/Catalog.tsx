import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadCampers, reset as resetCampers } from '../store/slices/campersSlice'
import { CamperCard } from '../components/CamperCard'
import { Filters } from '../components/Filters'
import styles from './Catalog.module.scss'

export function Catalog() {
  const dispatch = useAppDispatch()
  const { items, status, page, hasMore } = useAppSelector((s) => s.campers)
  const filters = useAppSelector((s) => s.filters)

  useEffect(() => {
    dispatch(resetCampers())
    const params: Record<string, any> = { page: 1, limit: 10 }
    if (filters.location) params.location = filters.location
    if (filters.vehicleType) params.type = filters.vehicleType
    Object.entries(filters.extras).forEach(([k, v]) => {
      if (v) params[k] = true
    })
    dispatch(loadCampers(params))
  }, [dispatch, filters])

  const loadMore = () => {
    const params: Record<string, any> = { page: page + 1, limit: 10 }
    if (filters.location) params.location = filters.location
    if (filters.vehicleType) params.type = filters.vehicleType
    Object.entries(filters.extras).forEach(([k, v]) => {
      if (v) params[k] = true
    })
    dispatch(loadCampers(params))
  }

  return (
    <main className={styles.wrap}>
      <div className={styles.header}>
        <h2>Catalog</h2>
      </div>
      <Filters />
      <div className={styles.grid}>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((c) => <CamperCard key={c.id} camper={c} />)
        ) : (
          <p>Sonuç bulunamadı.</p>
        )}
      </div>
      {status === 'loading' && <p>Yükleniyor...</p>}
      {hasMore && (
        <button onClick={loadMore} style={{ width: 160 }}>Load More</button>
      )}
    </main>
  )
}

