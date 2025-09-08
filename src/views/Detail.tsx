import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCamperById } from '../api/client'
import type { Camper } from '../api/client'
import { RatingStars } from '../components/RatingStars'

export function Detail() {
  const { id } = useParams()
  const [data, setData] = useState<Camper | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetchCamperById(id)
      .then((d) => setData(d))
      .catch((e) => setError(e?.message || 'Hata'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p style={{ padding: 20 }}>Yükleniyor...</p>
  if (error) return <p style={{ padding: 20 }}>Hata: {error}</p>
  if (!data) return null

  return (
    <main style={{ padding: '20px', display: 'grid', gap: 16 }}>
      <header>
        <h2 style={{ marginBottom: 4 }}>{data.name}</h2>
        {!!data.rating && <RatingStars value={data.rating} />}
        <div style={{ display: 'flex', gap: 12 }}>
          <strong>{data.price.toFixed(2)}</strong>
          <span>{data.location}</span>
        </div>
      </header>
      <section style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(data.gallery ?? []).map((g, i) => {
          const src = typeof g === 'string' ? g : g.original || g.thumb
          if (!src) return null
          return <img key={i} src={src} alt="camper" style={{ width: 160, height: 120, objectFit: 'cover' }} />
        })}
      </section>
      <section>
        <h3>Detaylar</h3>
        <p>{data.description}</p>
      </section>
      <section>
        <h3>Yorumlar</h3>
        {(data.reviews ?? []).map((r, idx) => {
          const key = (r as any).id ?? idx.toString()
          const author = (r as any).author ?? (r as any).reviewer_name ?? 'Kullanıcı'
          const rating = (r as any).rating ?? (r as any).reviewer_rating ?? 0
          const comment = (r as any).comment ?? ''
          const date = (r as any).date
          return (
            <div key={key} style={{ borderTop: '1px solid #eee', padding: '8px 0' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <strong>{author}</strong>
                <RatingStars value={Number(rating) || 0} />
                {date && <span>{date}</span>}
              </div>
              <div>{comment}</div>
            </div>
          )
        })}
      </section>
      <section>
        <h3>Rezervasyon</h3>
        <BookingForm camperId={data.id} />
      </section>
    </main>
  )
}

function BookingForm({ camperId }: { camperId: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo: sadece başarı bildirimi veriyoruz
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
    setName('')
    setEmail('')
    setDate('')
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
      <input placeholder="Ad Soyad" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="E-posta" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Tarih" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit" style={{ cursor: 'pointer' }}>Rezervasyon Yap</button>
      {submitted && <span style={{ color: 'green' }}>Rezervasyon talebiniz alındı!</span>}
      <small>Camper: {camperId}</small>
    </form>
  )
}

