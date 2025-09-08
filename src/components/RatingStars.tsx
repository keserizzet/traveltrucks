type Props = { value: number }

export function RatingStars({ value }: Props) {
  const rounded = Math.round(value)
  return (
    <span aria-label={`Rating ${rounded} of 5`}>
      {'★★★★★'.slice(0, rounded)}{'☆☆☆☆☆'.slice(0, 5 - rounded)}
    </span>
  )
}

