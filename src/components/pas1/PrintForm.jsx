import React from 'react';
import { incomeTotal, formatMoney, FILING_STATUS_OPTIONS } from '@/lib/pas1Data';

/* ─── helpers ─── */
const yn = (v) => v ? 'X' : '';
const money = (v) => {
  const n = parseFloat(String(v || 0).replace(/,/g, ''));
  if (!n || isNaN(n)) return '';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const s = {
  page: { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', color: '#000', background: '#fff', maxWidth: '720px', margin: '0 auto', padding: '24px 32px', lineHeight: 1.3 },
  h1: { fontSize: '22px', fontWeight: '700', margin: 0, lineHeight: 1 },
  h2: { fontSize: '16px', fontWeight: '700', borderBottom: '2px solid #000', paddingBottom: '2px', marginTop: '14px', marginBottom: '6px' },
  h3: { fontSize: '13px', fontWeight: '700', marginTop: '10px', marginBottom: '4px' },
  box: { border: '1px solid #b00', background: '#fff', display: 'inline-block', minWidth: '70px', height: '17px', verticalAlign: 'bottom', padding: '0 3px', fontSize: '11px', lineHeight: '17px' },
  boxSm: { border: '1px solid #b00', background: '#fff', display: 'inline-block', minWidth: '30px', height: '17px', verticalAlign: 'bottom', padding: '0 3px', fontSize: '11px', lineHeight: '17px' },
  boxMd: { border: '1px solid #b00', background: '#fff', display: 'inline-block', minWidth: '50px', height: '17px', verticalAlign: 'bottom', padding: '0 3px', fontSize: '11px', lineHeight: '17px' },
  moneyBox: { border: '1px solid #b00', background: '#fff', display: 'inline-block', minWidth: '130px', height: '17px', verticalAlign: 'bottom', padding: '0 4px', fontSize: '11px', lineHeight: '17px', textAlign: 'right', fontFamily: 'monospace' },
  checkBox: { border: '1px solid #b00', background: '#fff', display: 'inline-block', width: '14px', height: '14px', verticalAlign: 'middle', textAlign: 'center', lineHeight: '14px', fontSize: '10px', fontWeight: 'bold' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 0', borderBottom: '1px dotted #ccc' },
  label: { flex: 1, paddingRight: '8px' },
  lineNum: { fontWeight: '700', minWidth: '24px', display: 'inline-block' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', paddingBottom: '4px', marginBottom: '8px', fontSize: '9px', color: '#333' },
  dividerLine: { borderTop: '1px solid #000', margin: '10px 0' },
  ssnBox: { display: 'inline-flex', gap: '2px', alignItems: 'center' },
};

const CheckBox = ({ checked }) => (
  <span style={s.checkBox}>{checked ? 'X' : ''}</span>
);

const MoneyField = ({ value }) => (
  <span style={s.moneyBox}>{money(value)}</span>
);

const TextField = ({ value, width }) => (
  <span style={{ ...s.box, minWidth: width || '120px' }}>{value || ''}</span>
);

const SmallBox = ({ value, width }) => (
  <span style={{ ...s.boxSm, minWidth: width || '30px' }}>{value || ''}</span>
);

/* ─── SSN display: shows only last 4 ─── */
const SSNBox = ({ last4 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px', fontSize: '11px' }}>
    <span style={s.boxSm}>X</span><span style={s.boxSm}>X</span><span style={s.boxSm}>X</span>
    <span style={{ padding: '0 2px' }}>-</span>
    <span style={s.boxSm}>X</span><span style={s.boxSm}>X</span>
    <span style={{ padding: '0 2px' }}>-</span>
    <span style={s.boxSm}>{last4?.[0] || ''}</span>
    <span style={s.boxSm}>{last4?.[1] || ''}</span>
    <span style={s.boxSm}>{last4?.[2] || ''}</span>
    <span style={s.boxSm}>{last4?.[3] || ''}</span>
  </span>
);

/* ─── Page break ─── */
const PageBreak = () => (
  <div style={{ pageBreakAfter: 'always', borderTop: '1px dashed #999', marginTop: '24px', paddingTop: '0' }} />
);

/* ─── Repeating page header (pg 2-4) ─── */
const PageHeader = ({ page, name, ssn }) => (
  <div style={s.pageHeader}>
    <div>
      <span style={{ marginRight: '40px' }}>Name(s) as shown on Property Tax Relief Application: <strong>{name}</strong></span>
    </div>
    <div>Your Social Security Number: <strong>XXX-XX-{ssn}</strong></div>
    <div style={{ marginLeft: '20px', fontWeight: '700' }}>PAS-1 (2025) Page {page}</div>
  </div>
);

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function PrintForm({ data }) {
  const t24 = parseFloat(data.tax2024) || 0;
  const t25 = parseFloat(data.tax2025) || 0;
  const inc24 = data.inc?.[2024] || {};
  const inc25 = data.inc?.[2025] || {};
  const fullName = data.lname && data.fname ? `${data.lname}, ${data.fname}` : '';
  const sigDateFormatted = data.sigDate
    ? new Date(data.sigDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    : '';

  const fsMap = { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F' };
  const fs = data.filingStatus;

  return (
    <div className="print-only" style={s.page}>

      {/* ══════════════════════════════════════
          PAGE 1
      ══════════════════════════════════════ */}
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <div style={s.h1}>2025</div>
          <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>PAS-1</div>
        </div>
        <div style={{ textAlign: 'center', flex: 1, marginLeft: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700' }}>State of New Jersey</div>
          <div style={{ fontSize: '18px', fontWeight: '900' }}>Application for Property Tax Relief</div>
          <div style={{ fontSize: '11px' }}>For Seniors and Certain Disability Recipients</div>
        </div>
      </div>

      <div style={{ fontSize: '9px', marginBottom: '8px', lineHeight: 1.5 }}>
        <strong>Complete this application ONLY if</strong><br />
        • You or your spouse/CU partner were born in 1960 or before, <strong>OR</strong><br />
        • You or your spouse/CU partner were receiving Social Security Disability benefits during 2025, <strong>OR</strong><br />
        • You or your spouse/CU partner were receiving Railroad Retirement Disability during 2025.
      </div>

      {/* Top grid: SSN + Name/Address */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #b00', marginBottom: '8px' }}>
        <tbody>
          <tr>
            <td style={{ width: '35%', padding: '4px 6px', border: '1px solid #b00', verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px', color: '#555', marginBottom: '2px' }}>Your Social Security Number</div>
              <SSNBox last4={data.ssnLast4} />
              <div style={{ fontSize: '9px', color: '#555', margin: '6px 0 2px' }}>Spouse's/CU Partner's Social Security Number</div>
              <SSNBox last4={''} />
              <div style={{ fontSize: '9px', color: '#555', margin: '6px 0 2px' }}>County/Municipality Code (See Table page 15)</div>
              <span style={s.box}>{data.muniCode}</span>
            </td>
            <td style={{ padding: '4px 6px', border: '1px solid #b00', verticalAlign: 'top' }}>
              <div style={{ fontSize: '9px', color: '#555', marginBottom: '2px' }}>Last Name, First Name and Initial</div>
              <div style={{ fontSize: '12px', fontWeight: '600', minHeight: '18px', borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>{fullName}</div>
              <div style={{ fontSize: '9px', color: '#555', margin: '4px 0 2px' }}>Home Address (Number and Street, including apartment number)</div>
              <div style={{ fontSize: '11px', minHeight: '16px', borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>{data.address}</div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px', fontSize: '9px', color: '#555' }}>
                <span>City, Town, Post Office</span>
                <span>State: NJ</span>
                <span>ZIP Code</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginBottom: '8px', fontSize: '10px' }}>
        Enter the address of your main home on October 1, 2025, <strong>if different from the address above.</strong><br />
        <span>Street Address: </span>
        <span style={{ ...s.box, minWidth: '300px' }}></span>
        &nbsp;&nbsp;County/Municipality Code: <span style={s.box}></span>
      </div>

      <div style={{ fontSize: '9px', marginBottom: '10px', lineHeight: 1.5, borderTop: '1px solid #000', paddingTop: '4px' }}>
        <strong>This is a combined application for the Property Tax Reimbursement (Senior Freeze), ANCHOR Benefit, and Stay NJ programs.</strong> The application collects information that the Division of Taxation needs to assess your eligibility for these property tax relief programs.
      </div>

      {/* Filing Status */}
      <div style={s.h2}>Filing Status</div>
      <div style={{ marginBottom: '6px', fontSize: '10px' }}>
        <div><span style={s.lineNum}>1.</span> Your Filing Status from your 2025 NJ-1040:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '4px', paddingLeft: '16px' }}>
          <div><CheckBox checked={fs === 'A'} /> A.&nbsp;&nbsp;Single</div>
          <div><CheckBox checked={fs === 'E'} /> E.&nbsp;&nbsp;Married/CU Partner, filing separately: each maintains <strong>separate</strong> residence</div>
          <div><CheckBox checked={fs === 'B'} /> B.&nbsp;&nbsp;Head of Household</div>
          <div><CheckBox checked={fs === 'F'} /> F.&nbsp;&nbsp;Both maintain <strong>same</strong> residence</div>
          <div><CheckBox checked={fs === 'C'} /> C.&nbsp;&nbsp;Qualifying Widow(er)/Surviving CU Partner</div>
          <div></div>
          <div><CheckBox checked={fs === 'D'} /> D.&nbsp;&nbsp;Married/CU Couple, filing joint return</div>
        </div>
      </div>

      {/* Age & Disability */}
      <div style={s.h2}>Age and Disability Status (Fill in all ovals that apply)</div>
      <div style={{ fontSize: '10px', marginBottom: '6px' }}>
        <div style={{ display: 'flex', gap: '40px', marginBottom: '4px' }}>
          <div><span style={s.lineNum}>2.</span> Your Birth Year: <span style={s.box}>{data.birthYear}</span></div>
          <div>Your Spouse's/CU Partner's Birth Year: <span style={s.box}>{data.spBirthYear}</span></div>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>3a.</span> During 2025, were you <strong>receiving</strong> federal Social Security Disability benefit payments?</span>
          <span>Yourself &nbsp;<CheckBox checked={data.ssdi} /> Yes &nbsp;<CheckBox checked={!data.ssdi} /> No &nbsp;&nbsp;&nbsp; Spouse/CU Partner &nbsp;<CheckBox checked={false} /> Yes &nbsp;<CheckBox checked={true} /> No</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>3b.</span> During 2025, were you <strong>receiving</strong> Railroad Retirement Disability benefit payments?</span>
          <span>Yourself &nbsp;<CheckBox checked={data.rrd} /> Yes &nbsp;<CheckBox checked={!data.rrd} /> No &nbsp;&nbsp;&nbsp; Spouse/CU Partner &nbsp;<CheckBox checked={false} /> Yes &nbsp;<CheckBox checked={true} /> No</span>
        </div>
      </div>

      {/* Residency Information */}
      <div style={s.h2}>Residency Information</div>
      <div style={{ fontSize: '10px' }}>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>4.</span> Did you own/rent your principal residence (main home) in New Jersey on <strong>October 1, 2025</strong>?</span>
          <span><CheckBox checked={data.oct1Nj} /> Yes &nbsp;<CheckBox checked={!data.oct1Nj} /> No</span>
        </div>
        <div style={{ padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
          <span style={s.lineNum}>5.</span> Indicate your residency status on <strong>October 1, 2025.</strong>
          &nbsp;&nbsp;
          <CheckBox checked={data.homeType === 'own'} /> Homeowner &nbsp;&nbsp;
          <CheckBox checked={data.homeType === 'mobile'} /> Mobile home owner &nbsp;&nbsp;
          <CheckBox checked={data.homeType === 'rent'} /> Renter – SKIP TO Signature section
        </div>
        <div style={s.row}>
          <span style={s.label}>
            <span style={s.lineNum}>6a.</span> Did you own and live in the same main home in New Jersey from <strong>January 1, 2025, through December 31, 2025</strong>? (See instructions)
            <span style={{ fontSize: '8px', color: '#555', display: 'block', marginTop: '2px' }}>
              If "Yes," go to line 7. &nbsp;|&nbsp; If "No" and you were a homeowner, go to line 6b. &nbsp;|&nbsp; If "No" and you were a mobile home owner, skip to the Signature section.
            </span>
          </span>
          <span><CheckBox checked={data.same2025} /> Yes &nbsp;<CheckBox checked={!data.same2025} /> No</span>
        </div>
        {/* 6b and 6c are skipped when 6a = Yes */}
        <div style={{ ...s.row, opacity: data.same2025 ? 0.35 : 1 }}>
          <span style={s.label}>
            <span style={s.lineNum}>6b.</span> Were you (or your spouse/CU partner) born in 1960 or earlier?
            {data.same2025 && <span style={{ fontSize: '8px', color: '#b00', marginLeft: '6px' }}>(SKIP — 6a = Yes)</span>}
          </span>
          <span>
            <CheckBox checked={!data.same2025 && parseInt(data.birthYear) <= 1960} /> Yes &nbsp;
            <CheckBox checked={!data.same2025 && parseInt(data.birthYear) > 1960} /> No
          </span>
        </div>
        <div style={{ ...s.row, opacity: data.same2025 ? 0.35 : 1 }}>
          <span style={s.label}>
            <span style={s.lineNum}>6c.</span> Did you move from one main home you <strong>owned</strong> in New Jersey to another main home you <strong>owned</strong> in New Jersey in 2025?
            {data.same2025 && <span style={{ fontSize: '8px', color: '#b00', marginLeft: '6px' }}>(SKIP — 6a = Yes)</span>}
          </span>
          <span>
            <CheckBox checked={!data.same2025 && data.movedWithin2025} /> Yes &nbsp;
            <CheckBox checked={!data.same2025 && !data.movedWithin2025} /> No
          </span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>7.</span> Are you filing this application for the same home as last year's property tax relief benefits?</span>
          <span><CheckBox checked={data.sameAsLast} /> Yes &nbsp;<CheckBox checked={!data.sameAsLast} /> No</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>8.</span> On December 31, 2025, did you own and live in the same New Jersey home that you owned and occupied on <strong>December 31, 2022</strong>, or earlier?</span>
          <span><CheckBox checked={data.since2022} /> Yes &nbsp;<CheckBox checked={!data.since2022} /> No</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>9.</span> Did you move to your current home between <strong>January 1, 2023, and December 31, 2023</strong>?</span>
          <span><CheckBox checked={data.moved2023} /> Yes &nbsp;<CheckBox checked={!data.moved2023} /> No</span>
        </div>
      </div>

      <PageBreak />

      {/* ══════════════════════════════════════
          PAGE 2
      ══════════════════════════════════════ */}
      <PageHeader page={2} name={fullName} ssn={data.ssnLast4} />

      <div style={s.h2}>Principal Residence (Main Home)</div>
      <div style={{ fontSize: '10px' }}>
        <div style={{ padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
          <span style={s.lineNum}>10.</span> If your home on October 1, 2025, was a unit in a Co-op or a Continuing Care Retirement Facility, indicate the type:
          &nbsp;<CheckBox checked={false} /> Co-op &nbsp; or &nbsp;<CheckBox checked={false} /> Continuing Care Retirement Facility
        </div>

        {/* Lines 11-12: table with 2024/2025 columns */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '6px', fontSize: '10px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontWeight: 'normal', paddingRight: '8px' }}></th>
              <th style={{ width: '100px', textAlign: 'center', fontWeight: '700', borderBottom: '1px solid #000' }}>2024</th>
              <th style={{ width: '100px', textAlign: 'center', fontWeight: '700', borderBottom: '1px solid #000' }}>2025</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px dotted #ccc' }}>
              <td style={{ padding: '4px 0' }}><span style={s.lineNum}>11a.</span> Did you share ownership of the property that was your main home on October 1, 2025, with anyone other than your spouse/CU partner?</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><CheckBox checked={data.coOwn} /> Yes &nbsp;<CheckBox checked={!data.coOwn} /> No</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><CheckBox checked={data.coOwn} /> Yes &nbsp;<CheckBox checked={!data.coOwn} /> No</td>
            </tr>
            <tr style={{ borderBottom: '1px dotted #ccc' }}>
              <td style={{ padding: '4px 0' }}><span style={s.lineNum}>11b.</span> If you answered "Yes," indicate the share (percentage) of the property you (and your spouse/CU partner) owned.</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><span style={s.boxSm}>{data.coOwn ? data.coPct : ''}</span> %</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><span style={s.boxSm}>{data.coOwn ? data.coPct : ''}</span> %</td>
            </tr>
            <tr style={{ borderBottom: '1px dotted #ccc' }}>
              <td style={{ padding: '4px 0' }}><span style={s.lineNum}>12a.</span> Did the property that was your main home on October 1, 2025, consist of multiple units?</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><CheckBox checked={data.multiUnit} /> Yes &nbsp;<CheckBox checked={!data.multiUnit} /> No</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><CheckBox checked={data.multiUnit} /> Yes &nbsp;<CheckBox checked={!data.multiUnit} /> No</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}><span style={s.lineNum}>12b.</span> If you answered "Yes," indicate the share (percentage) of the property that you used as your main home.</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><span style={s.boxSm}>{data.multiUnit ? data.multiUnitPct : ''}</span> %</td>
              <td style={{ textAlign: 'center', padding: '4px' }}><span style={s.boxSm}>{data.multiUnit ? data.multiUnitPct : ''}</span> %</td>
            </tr>
          </tbody>
        </table>
        {data.coOwn || data.multiUnit ? (
          <div style={{ fontSize: '9px', fontWeight: '700', margin: '4px 0' }}>If you answered "Yes" at line 11a or 12a, see instructions before completing lines 14 through 16b.</div>
        ) : null}
      </div>

      <div style={s.h2}>Property Taxes</div>
      <div style={{ fontSize: '10px' }}>
        <div style={{ padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
          <div style={{ marginBottom: '4px' }}><span style={s.lineNum}>13a.</span> Enter the block and lot numbers of the address that was your main home on October 1, 2025.</div>
          <div style={{ display: 'flex', gap: '16px', paddingLeft: '16px', flexWrap: 'wrap' }}>
            <span>Block: <TextField value={data.block} width="60px" /></span>
            <span>Block Suffix: <TextField value="" width="50px" /></span>
            <span>Lot: <TextField value={data.lot} width="60px" /></span>
            <span>Lot Suffix: <TextField value="" width="50px" /></span>
            <span>Qualifier: <TextField value={data.qualifier} width="60px" /></span>
          </div>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>13b.</span> Are you claiming property taxes for additional lots?</span>
          <span><CheckBox checked={data.additionalLots} /> Yes &nbsp;<CheckBox checked={!data.additionalLots} /> No</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>14.</span> Enter your <strong>2024</strong> property taxes billed for the home that was your main home on October 1, 2024.<br />
            <span style={{ fontSize: '9px' }}>(Mobile home owners enter 18% of total site fees) — <strong>Prior Senior Freeze recipients: Do not change.</strong></span>
          </span>
          <MoneyField value={t24} />
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>15.</span> Enter your <strong>2025</strong> property taxes billed for the home that was your main home on October 1, 2025.<br />
            <span style={{ fontSize: '9px' }}>(Mobile home owners enter 18% of total site fees)</span>
          </span>
          <MoneyField value={t25} />
        </div>
      </div>

      <div style={s.h2}>Payment-in-Lieu-of-Taxes (P.I.L.O.T.)</div>
      <div style={{ fontSize: '10px' }}>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>16a.</span> Is there a Payment-in-Lieu-of-Taxes (P.I.L.O.T.) agreement for the home that was your main home in 2025?</span>
          <span><CheckBox checked={data.pilot} /> Yes &nbsp;<CheckBox checked={!data.pilot} /> No</span>
        </div>
        <div style={s.row}>
          <span style={s.label}><span style={s.lineNum}>16b.</span> If you answered "Yes," enter your Payment-in-Lieu-of-Taxes (P.I.L.O.T.) due for the home that was your main home in 2025.</span>
          <MoneyField value={data.pilot ? data.pilotAmount : ''} />
        </div>
      </div>

      <PageBreak />

      {/* ══════════════════════════════════════
          PAGE 3
      ══════════════════════════════════════ */}
      <PageHeader page={3} name={fullName} ssn={data.ssnLast4} />

      {/* 2024 Income */}
      <div style={s.h2}>2024 Income</div>
      <div style={{ fontSize: '9px', marginBottom: '6px', lineHeight: 1.4 }}>
        Enter your annual income for 2024. See the instructions for information on sources of income and how to determine the amount to report. If you do not have any income to report, you must enter "0.00" on line 17f. Losses in one category of income cannot be used to reduce total income. If you have a net loss in any income category, leave that line blank. If you were married or in a civil union on December 31, 2024, and living in the same home, combine your incomes for that year.
      </div>
      <div style={{ fontSize: '10px' }}>
        {[
          { ln: '17a.', label: 'New Jersey Total Income (see instructions)', key: 'a' },
          { ln: '17b.', label: 'Tax-exempt interest income', key: 'b' },
          { ln: '17c.', label: 'Roth IRA rollovers (see instructions)', key: 'c' },
          { ln: '17d.', label: 'Disability pension received (see instructions)', key: 'd' },
          { ln: '17e.', label: 'Social Security Benefits (including Medicare Part B premiums) received.\nEnter total amount from Box 5 of Form SSA-1099', key: 'e' },
        ].map(({ ln, label, key }) => (
          <div key={ln} style={s.row}>
            <span style={s.label}><span style={s.lineNum}>{ln}</span> {label}</span>
            <MoneyField value={inc24[key]} />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '2px solid #000', marginTop: '6px' }}>
          <strong><span style={s.lineNum}>17f.</span> Total 2024 income (Add lines 17a–17e)</strong>
          <MoneyField value={incomeTotal(inc24)} />
        </div>
      </div>

      <div style={s.dividerLine} />

      {/* 2025 Income */}
      <div style={s.h2}>2025 Income</div>
      <div style={{ fontSize: '9px', marginBottom: '6px', lineHeight: 1.4 }}>
        Enter your annual income for 2025. See the instructions for information on sources of income and how to determine the amount to report. If you do not have any income to report, you must enter "0.00" on line 18f. Losses in one category of income cannot be used to reduce total income. If you have a net loss in any income category, leave that line blank. If you were married or in a civil union on December 31, 2025, and living in the same home, combine your incomes for that year.
      </div>
      <div style={{ fontSize: '10px' }}>
        {[
          { ln: '18a.', label: 'New Jersey Total Income (see instructions)', key: 'a' },
          { ln: '18b.', label: 'Tax-exempt interest income', key: 'b' },
          { ln: '18c.', label: 'Roth IRA rollovers (see instructions)', key: 'c' },
          { ln: '18d.', label: 'Disability pension received (see instructions)', key: 'd' },
          { ln: '18e.', label: 'Social Security Benefits (including Medicare Part B premiums) received.\nEnter total amount from Box 5 of Form SSA-1099', key: 'e' },
        ].map(({ ln, label, key }) => (
          <div key={ln} style={s.row}>
            <span style={s.label}><span style={s.lineNum}>{ln}</span> {label}</span>
            <MoneyField value={inc25[key]} />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '2px solid #000', marginTop: '6px' }}>
          <strong><span style={s.lineNum}>18f.</span> Total 2025 income (Add lines 18a–18e)</strong>
          <MoneyField value={incomeTotal(inc25)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '13px', marginTop: '20px' }}>Complete Signature section.</div>

      <PageBreak />

      {/* ══════════════════════════════════════
          PAGE 4 — Signature
      ══════════════════════════════════════ */}
      <PageHeader page={4} name={fullName} ssn={data.ssnLast4} />

      {/* Schedule 1 */}
      <div style={s.h2}>Schedule 1</div>
      <div style={{ fontSize: '9px', marginBottom: '8px' }}>
        <strong>ONLY</strong> complete this schedule if you moved from one main home you <strong>owned</strong> to another main home you <strong>owned</strong> during 2025. Otherwise, leave this schedule blank.
      </div>
      {(() => {
        const h1 = data.sched1?.home1 || {};
        const h2 = data.sched1?.home2 || {};
        const rows = [
          { label: '1. Address', v1: h1.address, v2: h2.address },
          { label: '2. Block/lot/qualifier number', v1: h1.blockLot, v2: h2.blockLot },
          { label: '3. Dates you lived in the property in 2025', v1: h1.dates, v2: h2.dates },
          { label: '4. Did you share ownership?', v1: h1.shared ? 'Yes' : 'No', v2: h2.shared ? 'Yes' : 'No' },
          { label: '5. Share percentage owned', v1: h1.shared ? (h1.sharePct + '%') : '', v2: h2.shared ? (h2.sharePct + '%') : '' },
          { label: '6. Did the property consist of multiple units?', v1: h1.multiUnit ? 'Yes' : 'No', v2: h2.multiUnit ? 'Yes' : 'No' },
          { label: '7. Share percentage used as main home', v1: h1.multiUnit ? (h1.multiUnitPct + '%') : '', v2: h2.multiUnit ? (h2.multiUnitPct + '%') : '' },
          { label: '8. Total property taxes billed', v1: h1.taxes ? ('$' + parseFloat(h1.taxes).toLocaleString('en-US',{minimumFractionDigits:2})) : '', v2: h2.taxes ? ('$' + parseFloat(h2.taxes).toLocaleString('en-US',{minimumFractionDigits:2})) : '' },
          { label: '9. P.I.L.O.T. due', v1: h1.pilot || '', v2: h2.pilot || '' },
        ];
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginBottom: '10px' }}>
            <thead>
              <tr>
                <th style={{ width: '40%' }}></th>
                <th style={{ textAlign: 'center', padding: '3px', border: '1px solid #000', fontWeight: '700' }}>Main Home 1</th>
                <th style={{ textAlign: 'center', padding: '3px', border: '1px solid #000', fontWeight: '700' }}>Main Home 2</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '4px', border: '1px solid #ccc', fontSize: '9px' }}>{row.label}</td>
                  <td style={{ padding: '4px', border: '1px solid #ccc', fontSize: '10px', minHeight: '20px', height: '22px' }}>{row.v1}</td>
                  <td style={{ padding: '4px', border: '1px solid #ccc', fontSize: '10px', minHeight: '20px', height: '22px' }}>{row.v2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      })()}

      <div style={{ fontWeight: '700', fontSize: '11px', marginBottom: '12px' }}>Continue to PAS-1, line 10 on page 2.</div>

      {/* Signature Section */}
      <div style={{ border: '1px solid #000', padding: '10px', marginTop: '8px' }}>
        <div style={{ fontWeight: '700', fontSize: '11px', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '6px', marginBottom: '8px' }}>
          Signature — All of the programs included in this Property Tax Relief application are subject to appropriation in the State budget.
        </div>

        <div style={{ fontSize: '9px', marginBottom: '8px' }}>
          <CheckBox checked={false} /> If enclosing a copy of a death certificate for a deceased applicant, check the box. (See instructions)
        </div>

        <div style={{ fontSize: '9px', marginBottom: '10px', lineHeight: 1.5, maxWidth: '70%' }}>
          Under penalties of perjury, I declare that I have examined this Property Tax Relief application, including accompanying schedules and statements, and to the best of my knowledge and belief, it is true, correct, and complete. If prepared by a person other than the applicant, this declaration is based on all information of which the preparer has any knowledge.
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '200px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '16px', borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '28px', color: '#00008b' }}>
              {data.sigName}
            </div>
            <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>Your Signature</div>
          </div>
          <div style={{ flex: '1', minWidth: '100px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '28px', fontSize: '11px' }}>{sigDateFormatted}</div>
            <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>Date</div>
          </div>
          <div style={{ flex: '2', minWidth: '200px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '28px' }}></div>
            <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>Spouse's/CU Partner's Signature (if filing jointly, BOTH must sign)</div>
          </div>
        </div>

        <div style={{ marginTop: '8px' }}>
          <div style={{ fontSize: '9px', color: '#555' }}>Your daytime phone number and/or email address (optional)</div>
          <div style={{ borderBottom: '1px solid #000', minHeight: '18px', fontSize: '11px', paddingBottom: '2px' }}>{data.phone}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
          <div>
            <div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}></div>
            <div style={{ fontSize: '9px', color: '#555' }}>Paid Preparer's Signature</div>
          </div>
          <div>
            <div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}></div>
            <div style={{ fontSize: '9px', color: '#555' }}>Federal Identification Number</div>
          </div>
          <div>
            <div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}></div>
            <div style={{ fontSize: '9px', color: '#555' }}>Firm's name</div>
          </div>
          <div>
            <div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}></div>
            <div style={{ fontSize: '9px', color: '#555' }}>Firm's Federal Employer Identification Number</div>
          </div>
        </div>

        <div style={{ marginTop: '10px', padding: '6px', background: '#f5f5f5', border: '1px solid #ccc', fontSize: '9px', lineHeight: 1.6 }}>
          <strong>Due Date: November 2, 2026</strong><br />
          Mail your completed application to:<br />
          NJ Division of Taxation / Revenue Processing Center<br />
          Property Tax Relief Application / PO Box 635 / Trenton, NJ 08646-0635
        </div>
      </div>

      {/* Disclaimer note */}
      <div style={{ marginTop: '10px', fontSize: '8px', color: '#666', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '6px' }}>
        ※ 이 문서는 입력하신 내용을 PAS-1 양식 형식으로 정리한 참고용입니다. 실제 제출 전에 공식 PAS-1 양식에 직접 옮겨 적거나, propertytaxrelief.nj.gov 에서 온라인으로 제출하세요.
      </div>
    </div>
  );
}