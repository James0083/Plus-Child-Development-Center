import { Accessibility, Bus, Car, Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import { centerInfo, NAVER_MAP_URL, TEL_HREF, withBasePath } from '@/lib/constants'

export default function MapSection() {
  return (
    <Section id="location">
      <SectionTitle title="찾아오는 길" />
      <div className="grid gap-6 md:grid-cols-5">
        {/* 네이버 지도 화면을 캡처한 이미지입니다. 누르면 네이버 지도로 이동합니다. */}
        <a
          href={NAVER_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start overflow-hidden card transition-shadow hover:shadow-lg md:col-span-3"
        >
          <Image
            src={withBasePath('/images/map.webp')}
            width={1000}
            height={877}
            alt={`${centerInfo.name} 위치를 표시한 네이버 지도`}
            className="h-auto w-full"
          />
          <span className="block p-4 text-center font-bold text-primary">
            네이버 지도에서 보기<span className="sr-only"> (새 창)</span>
          </span>
        </a>

        <div className="flex flex-col gap-5 md:col-span-2">
          <h3 className="text-lg font-bold">{centerInfo.name}</h3>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p>{centerInfo.address}</p>
              <p className="mt-1 text-sm text-muted">지번: {centerInfo.addressLot}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Car className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p>주차장: {centerInfo.parking}</p>
          </div>
          <div className="flex gap-3">
            <Accessibility className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p>편의시설: {centerInfo.amenities.join(', ')}</p>
          </div>
          <div className="flex gap-3">
            <Bus className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p>버스 정류장</p>
              <ul className="mt-1 space-y-1 text-sm">
                {centerInfo.busStops.map((stop) => (
                  <li key={stop.name}>
                    {stop.name} ({stop.walk})
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <a href={TEL_HREF} className="-my-2.5 py-2.5 hover:underline">
              {centerInfo.phone}
            </a>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <ul>
              <li>{centerInfo.hours.regular}</li>
              <li>{centerInfo.hours.closed}</li>
            </ul>
          </div>
          <Button href={centerInfo.kakao}>
            <MessageCircle className="h-5 w-5" />
            카카오 채널 상담
          </Button>
        </div>
      </div>
    </Section>
  )
}
