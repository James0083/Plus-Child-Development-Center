import { ZoomableImage } from '@/components/ui/Lightbox'
import { facilities } from '@/data/history'

export default function FacilityGallery() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {facilities.map((facility, index) => (
        <li key={facility.src}>
          <ZoomableImage
            photos={facilities}
            index={index}
            sizes="(min-width: 75rem) 25vw, (min-width: 48rem) 50vw, 100vw"
            imageClassName="aspect-4/3 object-cover"
            objectPosition={facility.position}
          />
          <h3 className="mt-3 text-lg font-bold">{facility.name}</h3>
        </li>
      ))}
    </ul>
  )
}
