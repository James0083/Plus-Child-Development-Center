'use client'

import { motion, MotionConfig } from 'framer-motion'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { PHONE, TEL_HREF } from '@/lib/constants'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function HeroBanner() {
  return (
    <section className="grid bg-white md:grid-cols-2 lg:grid-cols-5">
      {/* 사진 위에 글자를 얹으면 간판이 가려지므로 나란히 놓습니다. */}
      <div className="relative aspect-3/2 md:order-last md:aspect-auto lg:col-span-3">
        <Image
          src="/images/hero-bg.jpg"
          alt="플러스 아동발달센터 건물 외관"
          fill
          preload
          sizes="(min-width: 64rem) 60vw, (min-width: 48rem) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      {/* 초기 상태가 투명이므로 JS가 없으면 문구와 버튼이 보이도록 되돌립니다. */}
      <noscript>
        <style>{'.hero-content *{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      <MotionConfig reducedMotion="user">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="hero-content flex flex-col justify-center px-4 py-10 md:min-h-[26rem] md:pr-8 md:pl-[max(1rem,calc((100vw_-_72rem)/2_+_1rem))] lg:col-span-2 lg:min-h-[32rem]"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl font-bold leading-tight lg:text-5xl lg:leading-tight">
            아이의 가능성을
            <br />
            함께 키워갑니다
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-6">
            전문 치료사와 함께하는 맞춤 아동발달 프로그램으로 우리 아이의 건강한 성장을 지원합니다.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
            <Button href="/consult">상담·비용 안내</Button>
            <Button href={TEL_HREF} variant="outline">
              <Phone className="h-5 w-5" />
              {PHONE}
            </Button>
          </motion.div>
        </motion.div>
      </MotionConfig>
    </section>
  )
}
