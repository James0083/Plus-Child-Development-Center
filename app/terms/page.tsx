import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'
import { footerInfo, LEGAL_EFFECTIVE_DATE } from '@/lib/constants'

export const metadata: Metadata = { title: '이용약관' }

// 회원 가입과 결제가 없는 안내 사이트 기준입니다.
const sections = [
  {
    title: '제1조 목적',
    body: [`이 약관은 ${footerInfo.name}(이하 "센터")가 운영하는 홈페이지의 이용 조건과 절차를 정합니다.`],
  },
  {
    title: '제2조 약관의 효력과 변경',
    body: [
      '이 약관은 홈페이지에 게시하면 효력이 생깁니다. 관계 법령을 위반하지 않는 범위에서 변경할 수 있으며, 변경 내용은 홈페이지에 공지합니다.',
    ],
  },
  {
    title: '제3조 제공 서비스',
    body: [
      '센터는 센터 소개, 프로그램과 활동 안내, 시간표, 바우처 안내, 상담 안내를 제공합니다. 이 홈페이지는 회원 가입이나 결제 기능을 제공하지 않습니다.',
    ],
  },
  {
    title: '제4조 안내 내용의 성격',
    body: [
      '홈페이지의 정보는 일반적인 안내이며 의학적 진단이나 치료를 대신하지 않습니다.',
      '정부 지원 제도의 기준과 금액은 변경될 수 있으니 담당 기관에서 확인해 주세요.',
    ],
  },
  {
    title: '제5조 이용자의 의무',
    body: [
      '이용자는 다른 사람의 정보를 도용하거나 허위 내용을 입력해서는 안 되며, 홈페이지 운영을 방해하거나 다른 사람의 권리를 침해해서는 안 됩니다.',
    ],
  },
  {
    title: '제6조 서비스 중단',
    body: ['센터는 시스템 점검, 장애, 천재지변 등의 사유로 서비스를 일시 중단할 수 있습니다.'],
  },
  {
    title: '제7조 저작권',
    body: [
      '홈페이지의 문구, 사진, 로고 등의 저작권은 해당 권리자에게 있습니다. 권리자의 허락 없이 복제, 배포, 수정할 수 없습니다.',
    ],
  },
  {
    title: '제8조 외부 링크',
    body: [
      '홈페이지에는 네이버 지도, 카카오톡 채널, 복지로 등 외부 사이트 링크가 포함될 수 있습니다. 외부 사이트의 내용과 개인정보 처리에는 해당 사이트의 정책이 적용됩니다.',
    ],
  },
  {
    title: '제9조 면책',
    body: [
      '센터는 천재지변이나 이용자의 귀책 사유로 발생한 손해에 대해 관계 법령이 허용하는 범위에서 책임을 지지 않습니다.',
    ],
  },
  {
    title: '제10조 분쟁 해결',
    body: ['이 약관과 홈페이지 이용에 관한 분쟁은 대한민국 법령을 따르며, 관할 법원은 민사소송법에 따릅니다.'],
  },
  {
    title: '부칙',
    body: [`이 약관은 ${LEGAL_EFFECTIVE_DATE}부터 시행합니다.`],
  },
]

export default function TermsPage() {
  return <LegalDocument title="이용약관" note={`시행일: ${LEGAL_EFFECTIVE_DATE}`} sections={sections} />
}
