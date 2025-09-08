import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setLocation, setVehicleType, toggleExtra, resetFilters } from '../store/slices/filtersSlice'
import styles from './Filters.module.scss'

export function Filters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((s) => s.filters)

  return (
    <section className={styles.wrap}>
      <input
        placeholder="Konum"
        value={filters.location}
        onChange={(e) => dispatch(setLocation(e.target.value))}
      />
      <select
        value={filters.vehicleType ?? ''}
        onChange={(e) => dispatch(setVehicleType(e.target.value || null))}
      >
        <option value="">Araç Tipi</option>
        <option value="alcove">Alcove</option>
        <option value="panelTruck">Panel Truck</option>
        <option value="fullyIntegrated">Fully Integrated</option>
      </select>
      {(['ac','kitchen','bathroom','tv','radio','refrigerator','microwave','gas','water'] as const).map((key) => (
        <label key={key} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input type="checkbox" checked={filters.extras[key]} onChange={() => dispatch(toggleExtra(key))} />
          {key}
        </label>
      ))}
      <button onClick={() => dispatch(resetFilters())}>Temizle</button>
    </section>
  )
}

