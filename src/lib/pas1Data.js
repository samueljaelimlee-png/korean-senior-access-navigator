// NJ Municipality codes (subset of most common Korean communities)
export const MUNI_DB = {
  'absecon':{ code:'0101', county:'Atlantic County' },
  'atlantic city':{ code:'0102', county:'Atlantic County' },
  'bergenfield':{ code:'0203', county:'Bergen County' },
  'bogota':{ code:'0204', county:'Bergen County' },
  'cliffside park':{ code:'0206', county:'Bergen County' },
  'closter':{ code:'0207', county:'Bergen County' },
  'cresskill':{ code:'0208', county:'Bergen County' },
  'demarest':{ code:'0209', county:'Bergen County' },
  'dumont':{ code:'0210', county:'Bergen County' },
  'edgewater':{ code:'0213', county:'Bergen County' },
  'elmwood park':{ code:'0211', county:'Bergen County' },
  'englewood cliffs':{ code:'0216', county:'Bergen County' },
  'englewood':{ code:'0215', county:'Bergen County' },
  'fair lawn':{ code:'0217', county:'Bergen County' },
  'fort lee':{ code:'0219', county:'Bergen County' },
  'garfield':{ code:'0221', county:'Bergen County' },
  'hackensack':{ code:'0223', county:'Bergen County' },
  'leonia':{ code:'0229', county:'Bergen County' },
  'little ferry':{ code:'0230', county:'Bergen County' },
  'lodi':{ code:'0231', county:'Bergen County' },
  'new milford':{ code:'0238', county:'Bergen County' },
  'norwood':{ code:'0241', county:'Bergen County' },
  'old tappan':{ code:'0243', county:'Bergen County' },
  'palisades park':{ code:'0245', county:'Bergen County' },
  'paramus':{ code:'0246', county:'Bergen County' },
  'ridgefield':{ code:'0249', county:'Bergen County' },
  'ridgefield park':{ code:'0250', county:'Bergen County' },
  'river edge':{ code:'0252', county:'Bergen County' },
  'teaneck':{ code:'0260', county:'Bergen County' },
  'tenafly':{ code:'0261', county:'Bergen County' },
  'westwood':{ code:'0267', county:'Bergen County' },
  'bayonne':{ code:'0901', county:'Hudson County' },
  'guttenberg':{ code:'0903', county:'Hudson County' },
  'hoboken':{ code:'0905', county:'Hudson County' },
  'jersey city':{ code:'0906', county:'Hudson County' },
  'north bergen':{ code:'0908', county:'Hudson County' },
  'secaucus':{ code:'0909', county:'Hudson County' },
  'union city':{ code:'0910', county:'Hudson County' },
  'weehawken':{ code:'0911', county:'Hudson County' },
  'west new york':{ code:'0912', county:'Hudson County' },
  'belleville':{ code:'0701', county:'Essex County' },
  'bloomfield':{ code:'0702', county:'Essex County' },
  'east orange':{ code:'0705', county:'Essex County' },
  'irvington':{ code:'0709', county:'Essex County' },
  'livingston':{ code:'0710', county:'Essex County' },
  'maplewood':{ code:'0711', county:'Essex County' },
  'millburn':{ code:'0712', county:'Essex County' },
  'montclair':{ code:'0713', county:'Essex County' },
  'newark':{ code:'0714', county:'Essex County' },
  'nutley':{ code:'0716', county:'Essex County' },
  'south orange':{ code:'0719', county:'Essex County' },
  'west orange':{ code:'0722', county:'Essex County' },
  'clifton':{ code:'1602', county:'Passaic County' },
  'passaic':{ code:'1607', county:'Passaic County' },
  'paterson':{ code:'1608', county:'Passaic County' },
  'wayne':{ code:'1614', county:'Passaic County' },
  'edison':{ code:'1205', county:'Middlesex County' },
  'east brunswick':{ code:'1204', county:'Middlesex County' },
  'new brunswick':{ code:'1213', county:'Middlesex County' },
  'piscataway':{ code:'1217', county:'Middlesex County' },
  'woodbridge':{ code:'1225', county:'Middlesex County' },
  'elizabeth':{ code:'2004', county:'Union County' },
  'linden':{ code:'2009', county:'Union County' },
  'union':{ code:'2019', county:'Union County' },
  'cherry hill':{ code:'0409', county:'Camden County' },
  'trenton':{ code:'1111', county:'Mercer County' },
  'princeton':{ code:'1114', county:'Mercer County' },
  'freehold':{ code:'1316', county:'Monmouth County' },
  'toms river':{ code:'1508', county:'Ocean County' },
  'lakewood':{ code:'1515', county:'Ocean County' },
  'bridgewater':{ code:'1806', county:'Somerset County' },
};

export function lookupMuni(cityInput) {
  if (!cityInput) return null;
  const key = cityInput.toLowerCase().trim()
    .replace(/\s*,.*/, '')
    .replace(/(city|borough|township|twp\.?|town|village)/g, '')
    .trim().replace(/\s+/g, ' ');
  if (MUNI_DB[key]) return MUNI_DB[key];
  const keys = Object.keys(MUNI_DB);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].includes(key) || key.includes(keys[i])) return MUNI_DB[keys[i]];
  }
  return null;
}

export function getMuniCounty(code) {
  if (!code) return '';
  const entry = Object.values(MUNI_DB).find(v => v.code === code);
  return entry ? entry.county : '';
}

export const FILING_STATUS_OPTIONS = [
  { value: 'D', label: 'D — Married/CU Couple, filing joint return', sub: '기혼 공동신고 — 가장 일반적' },
  { value: 'A', label: 'A — Single', sub: '미혼' },
  { value: 'B', label: 'B — Head of Household', sub: '세대주' },
  { value: 'C', label: 'C — Qualifying Widow(er)/Surviving CU Partner', sub: '배우자 사망 2023~2024년' },
  { value: 'E', label: 'E — Married, filing separately: separate residences', sub: '별도 거주 부부 별도신고' },
  { value: 'F', label: 'F — Married, filing separately: same residence', sub: '동거 부부 별도신고 — 소득 합산 필요' },
];

export const INCOME_ITEMS = [
  { ln: '17a', desc: 'New Jersey Total Income', key: 'a', src1040: 'NJ-1040 Line 27', srcNoFile: '신고 안 하셨으면 0 입력' },
  { ln: '17b', desc: 'Tax-exempt interest income', key: 'b', src1040: 'NJ-1040 Line 16b', srcNoFile: '해당 없으면 비워두세요' },
  { ln: '17c', desc: 'Roth IRA rollovers', key: 'c', src1040: '연방 규정 — 수익분만', srcNoFile: '해당 없으면 비워두세요' },
  { ln: '17d', desc: 'Disability pension received', key: 'd', src1040: '65세 이전 장애연금만', srcNoFile: '해당 없으면 비워두세요' },
  { ln: '17e', desc: 'Social Security Benefits', key: 'e', src1040: 'SSA-1099 Box 5', srcNoFile: '⭐ SSA-1099 Box 5 — 여기 입력' },
];

export const SAMPLE_DATA = {
  lname: 'Kim', fname: 'Soo Young', birthYear: '1958', phone: '(201) 555-0192',
  address: '45 Broad Ave, Palisades Park, NJ 07650', muniCode: '0245', ssnLast4: '6789',
  hasSpouse: true, spName: 'Kim, Jae Won', spBirthYear: '1956',
  filingStatus: 'D', ssdi: false, rrd: false,
  homeType: 'own', oct1Nj: true, same2025: true, since2022: true, coOwn: false, coPct: '',
  block: '2204', lot: '8', qualifier: '', tax2024: '11250', tax2025: '11840',
  pilot: false, pilotAmount: '',
  inc: { 2024: { a: 41737, b: 0, c: 0, d: 0, e: 2396 }, 2025: { a: 49509, b: 0, c: 0, d: 0, e: 2713 } },
  sigName: 'Soo Young Kim', sigDate: '2026-10-12',
};

export function incomeTotal(incYear) {
  if (!incYear) return 0;
  return Object.values(incYear).reduce((a, b) => a + (b || 0), 0);
}

export function getEligiblePrograms(data) {
  const by = parseInt(data.birthYear);
  if (!by) return [];
  const age = 2025 - by;
  const is65 = age >= 65;
  const inc24 = incomeTotal(data.inc?.[2024]);
  const inc25 = incomeTotal(data.inc?.[2025]);
  const progs = [];
  if ((is65 || data.ssdi || data.rrd) && data.since2022 && inc24 <= 168268 && inc25 <= 172475) {
    progs.push('Senior Freeze');
  }
  if (inc25 <= 250000) progs.push('ANCHOR');
  if (is65 && inc25 < 500000) progs.push('Stay NJ');
  return progs;
}

export function formatMoney(v) {
  const n = parseFloat(String(v).replace(/,/g, ''));
  if (!v || isNaN(n)) return '—';
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}