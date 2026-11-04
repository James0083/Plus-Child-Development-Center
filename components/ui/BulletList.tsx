type BulletListProps = {
  items: string[]
  className?: string
}

export default function BulletList({ items, className = '' }: BulletListProps) {
  return (
    <ul className={`list-disc space-y-2 pl-5 ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
