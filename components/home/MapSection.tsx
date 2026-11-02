import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SectionTitle from '@/components/ui/SectionTitle'
import { centerInfo, NAVER_MAP_URL, TEL_HREF } from '@/lib/constants'

export default function MapSection() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle title="오시는 길" />
        <div className="grid gap-6 md:grid-cols-5">
          {/* map.naver.com은 X-Frame-Options: DENY로 iframe 삽입을 막아 링크 패널로 대체합니다. */}
          <div className="flex h-[400px] flex-col items-center justify-center gap-4 rounded-2xl bg-mint/15 p-6 text-center md:col-span-3">
            <MapPin className="h-12 w-12 text-primary-dark" aria-hidden />
            <p className="font-semibold">{centerInfo.address}</p>
            <Button href={NAVER_MAP_URL} variant="outline">
              네이버 지도에서 보기
            </Button>
          </div>

          <div className="flex flex-col gap-5 md:col-span-2">
            <h3 className="text-lg font-semibold">{centerInfo.name}</h3>
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-primary-dark" aria-hidden />
              <div>
                <p>{centerInfo.address}</p>
                <p className="mt-1 text-sm font-light text-muted">{centerInfo.directions}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary-dark" aria-hidden />
              <a href={TEL_HREF} className="hover:underline">
                {centerInfo.phone}
              </a>
            </div>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 shrink-0 text-primary-dark" aria-hidden />
              <ul>
                <li>{centerInfo.hours.regular}</li>
                <li>{centerInfo.hours.sunday}</li>
                <li>{centerInfo.hours.holiday}</li>
              </ul>
            </div>
            <ul className="flex flex-wrap gap-2">
              {centerInfo.amenities.map((amenity) => (
                <li key={amenity}>
                  <Badge tone="mint">{amenity}</Badge>
                </li>
              ))}
            </ul>
            <Button href={centerInfo.kakao} className="mt-auto">
              <MessageCircle className="h-5 w-5" />
              카카오 채널 상담
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
