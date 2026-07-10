import React from 'react';
import { CalendarDays, MapPin, Clock, Users } from 'lucide-react';

const EVENTS = [
  {
    date: '2026년 9월 30일 (수)',
    time: '오전 10:00 – 오후 1:00',
    topic: '2025 재산세 감면 서류 작성 행사',
    location: 'Hunterdon Creekside Clubhouse, 1 Oakville Blvd, Teaneck, NJ 07666',
    host: 'Assemblyman Freiman',
  },
  {
    date: '2026년 9월 30일 (수)',
    time: '오후 1:00 – 오후 5:00',
    topic: '2025 재산세 감면 서류 작성 행사',
    location: '1425 Teaneck Road, Teaneck, NJ 07666',
    host: 'Assemblyman Haider',
  },
  {
    date: '2026년 10월 15일 (목)',
    time: '오후 1:00 – 오후 5:00',
    topic: '2025 재산세 감면 서류 작성 행사',
    location: 'Tenafly Senior Center, 20 South Summit Street, Tenafly, NJ 07670',
    host: 'Borough of Tenafly',
  },
];

export default function FilingEventNotice() {
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="w-5 h-5 text-amber-700" />
        <h3 className="text-base font-bold text-amber-900">📋 재산세 환급 서류 작성 행사 안내</h3>
      </div>

      <p className="text-sm text-foreground leading-relaxed mb-4">
        통합 신청서 <strong>PAS-1</strong>을 인터넷으로 신청하지 못하시는 분들을 위한{' '}
        <strong>재산세 환급 서류 작성 행사</strong>가 다음과 같이 있을 예정입니다.
        <br />
        주 재무부 직원들이 직접 와서 여러분들의 서류 작성을 도와줍니다.
        영어가 힘든 분들도 직접 와서 복잡한 서류 작성을 할 수 있으니 많은 분들이 꼭 참여하시기 바랍니다.
      </p>

      <div className="space-y-3">
        {EVENTS.map((ev, i) => (
          <div key={i} className="bg-white rounded-xl border border-amber-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                {ev.date}
              </span>
              <span className="text-xs font-semibold text-amber-700">{ev.host}</span>
            </div>
            <p className="text-sm font-bold text-foreground mb-2">{ev.topic}</p>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" /> {ev.time}
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {ev.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-amber-800 bg-amber-100 rounded-lg p-3">
        <Users className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          <strong>준비물:</strong> 참석 시 신분증(사진 부착) 및 PAS-1 작성에 필요한 서류(2024·2025년 재산세 영수증, 소득 증빙 서류 등)를 지참하세요.{' '}
          <span className="underline">「준비 서류 확인」</span> 버튼을 눌러 필요 서류를 미리 확인하실 수 있습니다.
        </p>
      </div>
    </div>
  );
}