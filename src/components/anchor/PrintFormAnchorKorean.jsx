import React from 'react';
import { InputBox, DigitBoxes, MoneyBoxesSmall, SSNBox, CB, PB, H2, Row, Ln, BASE } from './printBlocks';

export default function PrintFormAnchorKorean({ data, printOnly = true }) {
  const fullName = data.lname && data.fname ? `${data.lname}, ${data.fname}` : '';
  const sigDate = data.sigDate ? new Date(data.sigDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
  const fs = data.filingStatus;
  const income = parseFloat(data.njGrossIncome) || 0;
  const isHomeowner = data.homeType === 'homeowner';
  const isRenter = data.homeType === 'renter';

  return (
    <div className={printOnly ? 'print-only' : ''} style={{ ...BASE, maxWidth: '740px', margin: '0 auto', padding: '20px 28px', background: '#fff' }}>
      {/* ══ 1페이지 ══ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div style={{ border: '2px solid #000', padding: '4px 8px', lineHeight: 1.1 }}>
          <div style={{ fontSize: '22px', fontWeight: '900' }}>2025</div>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>ANC-1</div>
        </div>
        <div style={{ textAlign: 'right', flex: 1, marginLeft: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>뉴저지주</div>
          <div style={{ fontSize: '20px', fontWeight: '900', lineHeight: 1.1 }}>ANCHOR 신청서</div>
          <div style={{ fontSize: '10px', fontWeight: '600' }}>65세 미만 주택 소유자 및 임차인 대상</div>
          <div style={{ fontSize: '8.5px' }}>사회보장 장애급여 또는 철도퇴직 장애급여 미수령자</div>
        </div>
      </div>

      <div style={{ fontSize: '8px', marginBottom: '6px' }}>완성된 신청서를 다음 주소로 우편 발송: ANCHOR Application, Revenue Processing Center, PO Box 636, Trenton, NJ 08646-0636</div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #c06', marginBottom: '6px', fontSize: '8.5px' }}>
        <tbody>
          <tr>
            <td style={{ width: '32%', border: '1px solid #c06', padding: '4px 6px', verticalAlign: 'top' }}>
              <div style={{ fontSize: '7.5px', color: '#555', marginBottom: '3px' }}>본인 사회보장번호</div>
              <SSNBox last4={data.ssnLast4} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '5px 0 3px' }}>배우자/CU 파트너 사회보장번호</div>
              <SSNBox last4={data.spSsnLast4} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '5px 0 3px' }}>카운티/자치단체 코드</div>
              <DigitBoxes value={data.muniCode} count={4} />
            </td>
            <td style={{ border: '1px solid #c06', padding: '4px 6px', verticalAlign: 'top' }}>
              <div style={{ fontSize: '7.5px', color: '#555', marginBottom: '2px' }}>성, 이름 및 이니셜 (공동 신고자는 각 이름/중간 이니셜, 배우자 성은 다를 때만)</div>
              <InputBox value={fullName} width={320} height={20} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '4px 0 2px' }}>자택 주소 (번지 및 도로명, 아파트 번호 포함)</div>
              <InputBox value={data.address} width={320} height={20} />
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '7.5px', color: '#555' }}>
                <span>시, 타운, 우체국명: <InputBox value={data.city} width={90} /></span>
                <span>주: NJ</span>
                <span>우편번호: <InputBox value={data.zip} width={50} /></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
        2025년 10월 1일 기준 주요 주택 주소가 위와 <strong>다를 때만</strong> 기입하세요.<br />
        카운티/자치단체 코드: <DigitBoxes value={data.diffMuniCode} count={4} /> &nbsp; 도로명 주소: <InputBox value={data.diffStreet} width={260} />
      </div>

      <div style={{ fontSize: '8px', marginBottom: '8px', lineHeight: 1.5, borderTop: '1px solid #000', paddingTop: '4px' }}>
        <strong>다음 경우 이 신청서를 제출하지 마세요:</strong> 본인 또는 배우자가 1960년 이전 출생, 또는 2025년에 사회보장 장애급여나 철도퇴직 장애급여를 수령한 경우. <strong>대신 PAS-1 양식을 신청하세요.</strong>
      </div>

      <H2>신고 신분</H2>
      <div style={{ fontSize: '9px', marginBottom: '6px' }}>
        <div style={{ marginBottom: '4px' }}>1. 2025년 NJ-1040 신고서상 신분:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', paddingLeft: '12px' }}>
          <div><CB checked={fs === 'A'} /> A. 미혼</div>
          <div style={{ fontSize: '8.5px' }}>기혼/CU 별도 신고:</div>
          <div><CB checked={fs === 'B'} /> B. 세대주</div>
          <div><CB checked={fs === 'E'} /> E. 각자 별도 거주지 유지</div>
          <div><CB checked={fs === 'C'} /> C. 자격 있는 생존 배우자/CU 파트너</div>
          <div><CB checked={fs === 'F'} /> F. 같은 거주지에서 함께 거주</div>
          <div><CB checked={fs === 'D'} /> D. 기혼/CU 공동 신고</div>
        </div>
      </div>

      <H2>나이 및 장애 상태 (해당 사항 모두 표시)</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span><Ln n="2." /> 본인 출생연도: <DigitBoxes value={data.birthYear} count={4} /> &nbsp;&nbsp; 배우자/CU 파트너 출생연도: <DigitBoxes value={data.spBirthYear} count={4} /></span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="3." /> 2025년 12월 31일 기준 실명 또는 장애 상태입니까? (안내서 참조)</span>
          <span style={{ whiteSpace: 'nowrap' }}>본인 &nbsp;<CB checked={data.blindSelf} /> 예 &nbsp;<CB checked={!data.blindSelf} /> 아니오 &nbsp;&nbsp; 배우자/CU &nbsp;<CB checked={data.blindSpouse} /> 예 &nbsp;<CB checked={!data.blindSpouse} /> 아니오</span>
        </Row>
      </div>

      <H2>소득</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span style={{ flex: 1 }}><Ln n="4." /> 2025년 뉴저지 총소득을 적으세요. (안내서 참조)</span>
          <MoneyBoxesSmall value={income} />
        </Row>
      </div>

      <H2>거주 정보</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span style={{ flex: 1 }}><Ln n="5a." /> 2025년 <strong>10월 1일</strong> 기준 뉴저지에 주요 주택을 소유(또는 임차)하고 거주하셨나요? "예"이면 5b. "아니오"이면 중단 — 대상이 아닙니다.</span>
          <span><CB checked={data.oct1Nj === true} /> 예 &nbsp;<CB checked={data.oct1Nj === false} /> 아니오</span>
        </Row>
        <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
          <Ln n="5b." /> 2025년 10월 1일 기준 거주 상태:
          &nbsp;&nbsp;<CB checked={isHomeowner} /> 주택 소유자 — 주택 소유자 섹션으로
          &nbsp;&nbsp;<CB checked={isRenter} /> 임차인/모바일홈 — 임차인 섹션으로
        </div>
      </div>

      <PB />

      {/* ══ 2페이지 ══ */}
      {isHomeowner && (
        <>
          <H2>주택 소유자 (임차인/모바일홈 소유자는 이 섹션 작성 불가)</H2>
          <div style={{ fontSize: '9px' }}>
            <Row>
              <span style={{ flex: 1 }}><Ln n="6." /> 작년 ANCHOR 혜택과 같은 주택으로 신청하십니까?</span>
              <span><CB checked={data.sameAsLast} /> 예 &nbsp;<CB checked={!data.sameAsLast} /> 아니오</span>
            </Row>
            <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
              <div style={{ marginBottom: '3px' }}><Ln n="7." /> 2025년 10월 1일 기준 주요 주택 주소의 Block 및 Lot 번호를 적으세요.</div>
              <div style={{ display: 'flex', gap: '10px', paddingLeft: '28px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <span>Block<br /><InputBox value={data.block} width={55} /></span>
                <span>Block Suffix<br /><InputBox value={data.blockSuffix} width={40} /></span>
                <span>Lot<br /><InputBox value={data.lot} width={55} /></span>
                <span>Lot Suffix<br /><InputBox value={data.lotSuffix} width={40} /></span>
                <span>Qualifier<br /><InputBox value={data.qualifier} width={55} /></span>
              </div>
            </div>
            <Row>
              <span style={{ flex: 1 }}><Ln n="8a." /> 배우자/CU 파트너 이외의 사람과 공동 소유하셨나요?</span>
              <span><CB checked={data.coOwn} /> 예 &nbsp;<CB checked={!data.coOwn} /> 아니오</span>
            </Row>
            <Row>
              <span style={{ flex: 1 }}><Ln n="8b." /> "예"이면 본인(및 배우자/CU)이 소유한 지분 비율(%)을 적으세요.</span>
              <span><InputBox value={data.coOwn ? data.coPct : ''} width={30} /> %</span>
            </Row>
            <Row>
              <span style={{ flex: 1 }}><Ln n="9a." /> 해당 주택이 다세대 주택이었나요?</span>
              <span><CB checked={data.multiUnit} /> 예 &nbsp;<CB checked={!data.multiUnit} /> 아니오</span>
            </Row>
            <Row>
              <span style={{ flex: 1 }}><Ln n="9b." /> "예"이면 본인(및 배우자/CU)이 주요 거주지로 사용한 비율(%)을 적으세요.</span>
              <span><InputBox value={data.multiUnit ? data.multiUnitPct : ''} width={30} /> %</span>
            </Row>
            <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
              <Ln n="10." /> 2025년 10월 1일 기준 주택이 Co-op 또는 지속 돌봄 은퇴시설 유닛이면 유형을 표시하세요:<br />
              <span style={{ paddingLeft: '28px' }}><CB checked={data.coopType === 'coop'} /> Co-op &nbsp; 또는 &nbsp; <CB checked={data.coopType === 'ccrc'} /> 지속 돌봄 은퇴시설</span>
              <div style={{ paddingLeft: '28px', marginTop: '3px' }}>Co-op 또는 시설명: <InputBox value={data.coopName} width={240} /></div>
            </div>
            <Row>
              <span style={{ flex: 1 }}><Ln n="11." /> 2025년 10월 1일 기준 주요 주택에 청구된 2025년 재산세를 적으세요.</span>
              <MoneyBoxesSmall value={data.propertyTax2025} />
            </Row>
            <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '11px', marginTop: '8px' }}>서명 섹션으로 이동하세요.</div>
          </div>
        </>
      )}

      {isRenter && (
        <>
          <H2>임차인 및 모바일홈 소유자 (주택 소유자는 이 섹션 작성 불가)</H2>
          <div style={{ fontSize: '9px' }}>
            <Row>
              <span style={{ flex: 1 }}><Ln n="12." /> 2025년 10월 1일 기준 주요 주택이었던 임대 주택 또는 모바일홈의 임대 계약서에 본인 이름이 등록되어 있었나요?</span>
              <span><CB checked={data.nameOnLease} /> 예 &nbsp;<CB checked={!data.nameOnLease} /> 아니오</span>
            </Row>
            <Row>
              <span style={{ flex: 1 }}><Ln n="13." /> 배우자/CU 파트너 이외의 사람이 해당 임대 주택 또는 모바일홈을 함께 점유하고 임대료를 분담했나요?</span>
              <span><CB checked={data.sharedRent} /> 예 &nbsp;<CB checked={!data.sharedRent} /> 아니오</span>
            </Row>
          </div>
        </>
      )}

      {/* 서명 */}
      <div style={{ border: '1.5px solid #000', padding: '8px 10px', marginTop: '10px' }}>
        <div style={{ fontWeight: '700', fontSize: '11px', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '6px' }}>
          서명
        </div>
        <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
          <CB checked={false} /> 사망한 신청자의 사망증명서 사본을 동봉하는 경우 체크하세요.
        </div>
        <div style={{ fontSize: '8px', marginBottom: '8px', lineHeight: 1.6, maxWidth: '68%' }}>
          위증 처벌을 감수하고 본 신청서의 정보가 사실이고 정확하며, 2025년 10월 1일 기준 ANCHOR 혜택을 신청하는 주택을 본인이 소유(또는 임차)하고 주요 주택으로 점유했음을 선언합니다.
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '8px' }}>
          <div style={{ flex: 2, minWidth: '180px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px', borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px', color: '#00008b' }}>{data.sigName}</div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>본인 서명</div>
          </div>
          <div style={{ flex: 1, minWidth: '90px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px', fontSize: '10px' }}>{sigDate}</div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>날짜</div>
          </div>
          <div style={{ flex: 2, minWidth: '180px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px', borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px', color: '#00008b' }}>{data.spSigName}</div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>배우자/CU 파트너 서명 (공동 신고 시 양쪽 모두 서명 필요)</div>
          </div>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '7.5px', color: '#555' }}>낮 시간 전화번호 및/또는 이메일 주소 (선택사항)</div>
          <div style={{ borderBottom: '1px solid #000', minHeight: '16px', fontSize: '10px', paddingBottom: '1px' }}>{data.phone}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: '#f5f5f5', border: '1px solid #ccc', padding: '6px 10px', fontSize: '8px', lineHeight: 1.8, textAlign: 'left', maxWidth: '230px' }}>
            <strong>제출 마감일: 2026년 11월 2일</strong><br />
            완성된 신청서를 우편 발송:<br />
            NJ Division of Taxation<br />
            Revenue Processing Center<br />
            ANCHOR Application<br />
            PO Box 636<br />
            Trenton, NJ 08646-0636
          </div>
        </div>
      </div>

      <div style={{ marginTop: '8px', fontSize: '7.5px', color: '#666', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '5px' }}>
        ※ 이 문서는 입력하신 내용을 공식 ANC-1 양식 형식으로 한국어 번역하여 정리한 참고용입니다. 실제 제출은 anchor.nj.gov 에서 온라인으로 하거나 공식 양식을 우편 발송하세요.
      </div>
    </div>
  );
}