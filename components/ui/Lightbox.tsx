'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'

export type LightboxPhoto = {
  src: string
  width: number
  height: number
  alt: string
  name?: string
}

const SWIPE_DISTANCE = 50

function LightboxDialog({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: LightboxPhoto[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchStartX = useRef<number | null>(null)
  const photo = photos[index]
  const hasSiblings = photos.length > 1
  const move = (offset: number) => onChange((index + offset + photos.length) % photos.length)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = ''
    }
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (!hasSiblings) return
    if (e.key === 'ArrowLeft') move(-1)
    if (e.key === 'ArrowRight') move(1)
  }

  const onTouchEnd = (e: TouchEvent<HTMLDialogElement>) => {
    if (touchStartX.current === null || !hasSiblings) return
    const distance = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(distance) >= SWIPE_DISTANCE) move(distance > 0 ? -1 : 1)
  }

  const controlClass =
    'absolute flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80'

  return (
    <dialog
      ref={dialogRef}
      aria-label={photo.name ?? '사진 크게 보기'}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
      }}
      onTouchEnd={onTouchEnd}
      onClick={(e) => {
        // 사진 바깥을 누르면 닫습니다.
        if (!(e.target as HTMLElement).closest('img, button')) onClose()
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/90 p-0 text-white"
    >
      <div className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1 items-center justify-center p-4 pt-16">
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="100vw"
            className="h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded-lg object-contain"
          />
        </div>
        <p aria-live="polite" className="px-4 pb-6 text-center font-bold">
          {photo.name}
          {hasSiblings && ` (${index + 1}/${photos.length})`}
        </p>
      </div>
      <button type="button" onClick={onClose} aria-label="닫기" className={`${controlClass} right-3 top-3`}>
        <X className="h-6 w-6" aria-hidden />
      </button>
      {hasSiblings && (
        <>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="이전 사진"
            className={`${controlClass} left-3 top-1/2 -translate-y-1/2`}
          >
            <ChevronLeft className="h-7 w-7" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="다음 사진"
            className={`${controlClass} right-3 top-1/2 -translate-y-1/2`}
          >
            <ChevronRight className="h-7 w-7" aria-hidden />
          </button>
        </>
      )}
    </dialog>
  )
}

// 사진을 누르면 크게 보여 줍니다. 여러 장이면 좌우로 넘길 수 있습니다.
export function ZoomableImage({
  photos,
  index = 0,
  thumbSrc,
  sizes,
  className = '',
  imageClassName = '',
  objectPosition,
}: {
  photos: LightboxPhoto[]
  index?: number
  thumbSrc?: string
  sizes: string
  className?: string
  imageClassName?: string
  objectPosition?: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const photo = photos[index]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenIndex(index)}
        aria-label={`${photo.alt}, 크게 보기`}
        className={`block w-full cursor-zoom-in overflow-hidden rounded-lg ${className}`}
      >
        <Image
          src={thumbSrc ?? photo.src}
          alt=""
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          style={objectPosition ? { objectPosition } : undefined}
          className={`w-full transition-transform duration-200 hover:scale-105 motion-reduce:transition-none ${imageClassName}`}
        />
      </button>
      {openIndex !== null && (
        <LightboxDialog photos={photos} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  )
}
