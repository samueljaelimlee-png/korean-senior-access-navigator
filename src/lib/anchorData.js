import { MUNI_DB, FILING_STATUS_OPTIONS, lookupMuni, getMuniCounty, formatMoney } from '@/lib/pas1Data';

export { MUNI_DB, FILING_STATUS_OPTIONS, lookupMuni, getMuniCounty, formatMoney };

export const HOMEOWNER_INCOME_LIMIT = 250000;
export const RENTER_INCOME_LIMIT = 150000;

export function getAnchorEligible(data) {
  const inc = parseFloat(data.njGrossIncome) || 0;
  if (data.homeType === 'homeowner') return inc <= HOMEOWNER_INCOME_LIMIT;
  if (data.homeType === 'renter') return inc <= RENTER_INCOME_LIMIT;
  return false;
}

export const SAMPLE_DATA = {
  q1: 'no', q2: 'no',
  lname: 'Park', fname: 'Ji Hoon', ssnLast4: '4321', spSsnLast4: '8765',
  address: '320 Main St', muniCode: '0219', city: 'Fort Lee', state: 'NJ', zip: '07024',
  hasSpouse: true, spLname: '', spFname: 'Min Hee',
  filingStatus: 'D', birthYear: '1970', spBirthYear: '1972',
  blindSelf: false, blindSpouse: false,
  njGrossIncome: '65000',
  oct1Nj: true, homeType: 'homeowner',
  sameAsLast: true,
  block: '102', blockSuffix: '', lot: '15', lotSuffix: '', qualifier: '',
  coOwn: false, coPct: '', multiUnit: false, multiUnitPct: '',
  coopType: '', coopName: '', propertyTax2025: '9800',
  nameOnLease: false, sharedRent: false,
  sigName: 'Ji Hoon Park', spSigName: 'Min Hee Park', sigDate: '2026-09-15', phone: '(201) 555-0148',
};