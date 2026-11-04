import type { Metadata } from 'next'
import LegalDocument from '@/components/legal/LegalDocument'
import { footerInfo, LEGAL_EFFECTIVE_DATE, PRIVACY_RETENTION } from '@/lib/constants'

export const metadata: Metadata = { title: '개인정보처리방침' }

const sections = [
  {
    title: '1. 처리 목적',
    body: [`${footerInfo.name}(이하 "센터")는 상담 신청 확인, 상담 일정 안내, 상담 진행과 문의 응대를 위해 개인정보를 처리합니다.`],
  },
  {
    title: '2. 처리하는 항목',
    body: [
      '상담 신청 시: 아동 이름, 생년월일, 성별, 보호자 이름, 연락처, 상담 내용, 희망 상담일',
      '홈페이지 이용 과정에서 접속 기록 등 서비스 운영에 필요한 정보가 자동으로 처리될 수 있습니다.',
    ],
  },
  {
    title: '3. 보유 및 이용 기간',
    body: [`수집한 개인정보는 ${PRIVACY_RETENTION}까지 보유합니다. 다른 법령에서 보존을 요구하면 해당 기간 동안 보관합니다.`],
  },
  {
    title: '4. 만 14세 미만 아동의 개인정보',
    body: ['만 14세 미만 아동의 개인정보는 법정대리인의 동의를 받아 처리하며, 필요한 경우 동의 여부를 확인합니다.'],
  },
  {
    title: '5. 제3자 제공',
    body: ['센터는 정보주체의 동의가 있거나 법률에 특별한 규정이 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.'],
  },
  {
    title: '6. 처리 위탁과 국외 처리',
    body: [
      '홈페이지 운영과 상담 신청 전달을 위해 Cloudflare, Inc.의 호스팅, 보안 확인, 메일 전송 서비스를 이용합니다. 이 과정에서 정보가 국외 서버에서 처리될 수 있습니다.',
      '상담 신청 내용은 센터 이메일로 전달되며, 홈페이지에 별도로 저장하지 않습니다.',
    ],
  },
  {
    title: '7. 파기 절차와 방법',
    body: ['보유 기간이 끝나거나 처리 목적을 달성하면 지체 없이 파기합니다. 전자 파일은 복구할 수 없는 방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다.'],
  },
  {
    title: '8. 정보주체와 법정대리인의 권리',
    body: ['정보주체와 법정대리인은 개인정보의 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다. 아래 문의처로 요청하면 지체 없이 조치합니다.'],
  },
  {
    title: '9. 안전성 확보 조치',
    body: ['센터는 접근 권한 관리, 담당자 교육, 보안 프로그램 사용, 문서 보관 장소 관리 등 개인정보 보호에 필요한 조치를 합니다.'],
  },
  {
    title: '10. 쿠키 등 자동 수집 장치',
    body: ['이 홈페이지는 맞춤 광고를 위한 쿠키를 사용하지 않습니다. 스팸 방지를 위한 보안 확인 과정에서 기술 정보가 처리될 수 있습니다.'],
  },
  {
    title: '11. 개인정보 보호책임자',
    body: [`책임자: 센터장 ${footerInfo.director} / 전화 ${footerInfo.phone} / 이메일 ${footerInfo.email}`],
  },
  {
    title: '12. 권익 침해 구제',
    body: [
      '개인정보 분쟁조정위원회 1833-6972 (kopico.go.kr)',
      '개인정보침해신고센터 118 (privacy.kisa.or.kr)',
      '대검찰청 1301 (spo.go.kr)',
      '경찰청 182 (ecrm.police.go.kr)',
    ],
  },
  {
    title: '13. 시행 및 변경',
    body: [`이 방침은 ${LEGAL_EFFECTIVE_DATE}부터 시행합니다. 내용이 바뀌면 시행 전에 홈페이지에 공지합니다.`],
  },
]

export default function PrivacyPage() {
  return <LegalDocument title="개인정보처리방침" note={`시행일: ${LEGAL_EFFECTIVE_DATE}`} sections={sections} />
}
