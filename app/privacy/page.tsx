import type { Metadata } from 'next'
import SectionTitle from '@/components/ui/SectionTitle'
import { footerInfo, PRIVACY_RETENTION } from '@/lib/constants'

export const metadata: Metadata = { title: '개인정보처리방침' }

// [DUMMY] 시안용 초안입니다. 공개 전 실제 운영 방식에 맞게 수정하고 법률 검토를 받아야 합니다.
const sections = [
  {
    title: '1. 수집하는 개인정보 항목',
    body: '상담 신청서, 전화 또는 카카오 채널 상담 과정에서 아동 이름, 생년월일, 성별, 보호자 이름, 연락처, 상담 내용, 희망 상담일을 받을 수 있습니다.',
  },
  {
    title: '2. 수집 및 이용 목적',
    body: '상담 신청 확인, 상담 일정 안내 및 상담 진행. 상담 신청서 내용은 Cloudflare 메일 전송 기능을 통해 센터 이메일로 전달되며, 홈페이지에 별도로 저장하지 않습니다.',
  },
  {
    title: '3. 보유 및 이용 기간',
    body: `${PRIVACY_RETENTION}까지 보유하며, 이후 지체 없이 파기합니다. 다른 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.`,
  },
  {
    title: '4. 만 14세 미만 아동의 개인정보',
    body: '만 14세 미만 아동의 개인정보는 법정대리인인 보호자의 동의를 받아 처리합니다.',
  },
  {
    title: '5. 제3자 제공',
    body: '법령에 근거가 있거나 정보주체의 동의가 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.',
  },
  {
    title: '6. 정보주체의 권리',
    body: '정보주체와 법정대리인은 언제든지 개인정보의 열람, 정정, 삭제 및 처리 정지를 요청할 수 있습니다.',
  },
  {
    title: '7. 개인정보의 파기',
    body: '보유 기간이 끝나거나 처리 목적을 달성한 개인정보는 지체 없이 파기합니다. 전자 파일은 복구할 수 없는 방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다.',
  },
  {
    title: '8. 개인정보 보호책임자 및 문의처',
    body: `개인정보 보호책임자 센터장 ${footerInfo.director} / ${footerInfo.name} / 전화 ${footerInfo.phone} / 이메일 ${footerInfo.email}`,
  },
]

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <SectionTitle as="h1" title="개인정보처리방침" description="시안용 초안이며, 공개 전 실제 내용으로 교체됩니다." />
      <div className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="mt-2">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
