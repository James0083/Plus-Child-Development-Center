import SectionTitle from '@/components/ui/SectionTitle'

type LegalDocumentProps = {
  title: string
  note: string
  sections: { title: string; body: string[] }[]
}

export default function LegalDocument({ title, note, sections }: LegalDocumentProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <SectionTitle as="h1" title={title} description={note} />
      <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-bold">{section.title}</h2>
            <div className="mt-2 space-y-2">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
