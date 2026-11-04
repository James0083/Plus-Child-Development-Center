type SectionTitleProps = {
  title: string
  description?: string
  as?: 'h1' | 'h2'
}

export default function SectionTitle({ title, description, as: Tag = 'h2' }: SectionTitleProps) {
  return (
    <div className="mb-10 text-center">
      <Tag className={`text-2xl font-extrabold ${Tag === 'h1' ? 'lg:text-3xl' : ''}`}>{title}</Tag>
      {description && <p className="mt-3 text-sm text-muted">{description}</p>}
    </div>
  )
}
