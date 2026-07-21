import React from 'react';
import { incomeTotal } from '@/lib/pas1Data';

const money = (v) => {
  const n = parseFloat(String(v || 0).replace(/,/g, ''));
  if (!n || isNaN(n)) return '';
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

/* ─── Base styles ─── */
const BASE = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '9.5px',
  color: '#000',
  lineHeight: 1.35,
};

/* ─── Pink input box (matches official form) ─── */
const InputBox = ({ value = '', width = 80, height = 18, mono = false, small = false }) => (
  <span style={{
    display: 'inline-block',
    minWidth: width,
    height,
    border: '1px solid #c06',
    background: '#fff',
    verticalAlign: 'middle',
    padding: '1px 3px',
    fontSize: small ? '8px' : '10px',
    fontFamily: mono ? 'monospace' : 'inherit',
    lineHeight: `${height - 2}px`,
    color: '#000',
  }}>{value}</span>
);

/* ─── Segmented digit boxes ─── */
const DigitBoxes = ({ value = '', count = 4 }) => (
  <span style={{ display: 'inline-flex', gap: '1px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{
        display: 'inline-block', width: 14, height: 16,
        border: '1px solid #c06', background: '#fff',
        textAlign: 'center', lineHeight: '14px', fontSize: '9px',
        fontFamily: 'monospace',
      }}>{value?.[i] || ''}</span>
    ))}
  </span>
);

/* ─── Money segmented boxes ─── */
const MoneyBoxes = ({ value }) => {
  const formatted = money(value);
  const [intPart = '', decPart = '00'] = formatted.split('.');
  const digits = intPart.replace(/,/g, '').padStart(7, '');
  const dec = decPart.padEnd(2, '0').slice(0, 2);
  const groups = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7)];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
      <DigitBoxes value={groups[0]} count={2} />
      <span style={{ fontSize: '9px', padding: '0 1px' }}>,</span>
      <DigitBoxes value={groups[1]} count={3} />
      <span style={{ fontSize: '9px', padding: '0 1px' }}>,</span>
      <DigitBoxes value={groups[2]} count={2} />
      <span style={{ fontSize: '9px', padding: '0 1px' }}>.</span>
      <DigitBoxes value={dec} count={2} />
    </span>
  );
};

/* ─── SSN box ─── */
const SSNBox = ({ last4 = '' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
    {[0,1,2].map(i => <span key={i} style={{ display:'inline-block', width:16, height:16, border:'1px solid #c06', background:'#fff', textAlign:'center', lineHeight:'14px', fontSize:'9px' }}>X</span>)}
    <span style={{ padding: '0 2px', fontSize: '9px' }}>-</span>
    {[0,1].map(i => <span key={i} style={{ display:'inline-block', width:16, height:16, border:'1px solid #c06', background:'#fff', textAlign:'center', lineHeight:'14px', fontSize:'9px' }}>X</span>)}
    <span style={{ padding: '0 2px', fontSize: '9px' }}>-</span>
    {[0,1,2,3].map(i => <span key={i} style={{ display:'inline-block', width:16, height:16, border:'1px solid #c06', background:'#fff', textAlign:'center', lineHeight:'14px', fontSize:'9px' }}>{last4?.[i] || ''}</span>)}
  </span>
);

/* ─── Checkbox ─── */
const CB = ({ checked }) => (
  <span style={{ display:'inline-block', width:14, height:14, border:'1px solid #c06', background:'#fff', textAlign:'center', lineHeight:'12px', fontSize:'9px', fontWeight:'bold', verticalAlign:'middle' }}>
    {checked ? 'X' : ''}
  </span>
);

/* ─── Page break ─── */
const PB = () => <div style={{ pageBreakAfter: 'always', borderTop: '1px dashed #999', margin: '16px 0 0' }} />;

/* ─── Repeating page header ─── */
const PageHeader = ({ page, name, ssn }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: '6px', gap: '8px' }}>
    <div style={{ border: '1px solid #999', padding: '2px 6px', fontSize: '8px', flex: 2 }}>
      <div style={{ color: '#666', fontSize: '7.5px' }}>Name(s) as shown on Property Tax Relief Application</div>
      <div style={{ fontWeight: '600', fontSize: '10px' }}>{name}</div>
    </div>
    <div style={{ border: '1px solid #999', padding: '2px 6px', fontSize: '8px', flex: 1 }}>
      <div style={{ color: '#666', fontSize: '7.5px' }}>Your Social Security Number</div>
      <div style={{ fontWeight: '600', fontSize: '10px' }}>XXX-XX-{ssn}</div>
    </div>
    <div style={{ fontSize: '8px', fontWeight: '700', alignSelf: 'flex-end', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
      PAS-1 (2025) Page {page}
    </div>
  </div>
);

/* ─── Section heading ─── */
const H2 = ({ children }) => (
  <div style={{ fontSize: '14px', fontWeight: '900', margin: '10px 0 5px', borderBottom: '1.5px solid #000', paddingBottom: '2px', letterSpacing: '-0.2px' }}>
    {children}
  </div>
);

/* ─── Row with dotted separator ─── */
const Row = ({ children, style = {} }) => (
  <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', ...style }}>
    {children}
  </div>
);

const Ln = ({ n }) => <span style={{ fontWeight: '700', minWidth: '26px', display: 'inline-block' }}>{n}</span>;

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function PrintForm({ data }) {
  const t24 = parseFloat(data.tax2024) || 0;
  const t25 = parseFloat(data.tax2025) || 0;
  const inc24 = data.inc?.[2024] || {};
  const inc25 = data.inc?.[2025] || {};
  const fullName = data.lname && data.fname ? `${data.lname}, ${data.fname}` : '';
  const sigDate = data.sigDate
    ? new Date(data.sigDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    : '';
  const fs = data.filingStatus;

  return (
    <div className="print-only" style={{ ...BASE, maxWidth: '740px', margin: '0 auto', padding: '20px 28px', background: '#fff' }}>

      {/* ══ PAGE 1 ══ */}
      {/* Top header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div style={{ border: '2px solid #000', padding: '4px 8px', lineHeight: 1.1 }}>
          <div style={{ fontSize: '22px', fontWeight: '900' }}>2025</div>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>PAS-1</div>
        </div>
        <div style={{ textAlign: 'right', flex: 1, marginLeft: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>State of New Jersey</div>
          <div style={{ fontSize: '20px', fontWeight: '900', lineHeight: 1.1 }}>Application for Property Tax Relief</div>
          <div style={{ fontSize: '10px', fontWeight: '600' }}>For Seniors and Certain Disability Recipients</div>
        </div>
      </div>

      {/* Complete ONLY if */}
      <div style={{ fontSize: '8.5px', marginBottom: '8px', lineHeight: 1.5 }}>
        <strong>Complete this application ONLY if</strong><br />
        • You or your spouse/CU partner were born in 1960 or before, <strong>OR</strong><br />
        • You or your spouse/CU partner were receiving Social Security Disability benefits during 2025, <strong>OR</strong><br />
        • You or your spouse/CU partner were receiving Railroad Retirement Disability during 2025.
      </div>

      {/* Top info table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #c06', marginBottom: '6px', fontSize: '8.5px' }}>
        <tbody>
          <tr>
            <td style={{ width: '32%', border: '1px solid #c06', padding: '4px 6px', verticalAlign: 'top' }}>
              <div style={{ fontSize: '7.5px', color: '#555', marginBottom: '3px' }}>Your Social Security Number</div>
              <SSNBox last4={data.ssnLast4} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '5px 0 3px' }}>Spouse's/CU Partner's Social Security Number</div>
              <SSNBox last4={''} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '5px 0 3px' }}>County/Municipality Code (See Table page 15)</div>
              <DigitBoxes value={data.muniCode} count={4} />
            </td>
            <td style={{ border: '1px solid #c06', padding: '4px 6px', verticalAlign: 'top' }}>
              <div style={{ fontSize: '7.5px', color: '#555', marginBottom: '2px' }}>Last Name, First Name and Initial</div>
              <InputBox value={fullName} width={320} height={20} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '4px 0 2px' }}>Home Address (Number and Street, including apartment number)</div>
              <InputBox value={data.address} width={320} height={20} />
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '7.5px', color: '#555' }}>
                <span>City, Town, Post Office</span>
                <span>State: NJ</span>
                <span>ZIP Code</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
        Enter the address of your main home on October 1, 2025, <strong>if different from the address above.</strong><br />
        Street Address: <InputBox value="" width={280} /> &nbsp; County/Municipality Code: <DigitBoxes value="" count={4} />
      </div>

      <div style={{ fontSize: '8px', marginBottom: '8px', lineHeight: 1.5, borderTop: '1px solid #000', paddingTop: '4px' }}>
        <strong>This is a combined application for the Property Tax Reimbursement (Senior Freeze), ANCHOR Benefit, and Stay NJ programs.</strong> The application collects information that the Division of Taxation needs to assess your eligibility for these property tax relief programs.
      </div>

      {/* Filing Status */}
      <H2>Filing Status</H2>
      <div style={{ fontSize: '9px', marginBottom: '6px' }}>
        <div style={{ marginBottom: '4px' }}>1. &nbsp;Your Filing Status from your 2025 NJ-1040:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', paddingLeft: '12px' }}>
          <div><CB checked={fs==='A'} /> &nbsp;A. &nbsp;Single</div>
          <div><CB checked={fs==='E'} /> &nbsp;E. &nbsp;Each maintains <strong>separate</strong> residence</div>
          <div><CB checked={fs==='B'} /> &nbsp;B. &nbsp;Head of Household</div>
          <div><CB checked={fs==='F'} /> &nbsp;F. &nbsp;Both maintain <strong>same</strong> residence</div>
          <div><CB checked={fs==='C'} /> &nbsp;C. &nbsp;Qualifying Widow(er)/Surviving CU Partner</div>
          <div></div>
          <div><CB checked={fs==='D'} /> &nbsp;D. &nbsp;Married/CU Couple, filing joint return</div>
        </div>
      </div>

      {/* Age & Disability */}
      <H2>Age and Disability Status (Fill in all ovals that apply)</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span><Ln n="2." /> Your Birth Year: <DigitBoxes value={data.birthYear} count={4} />
          &nbsp;&nbsp;&nbsp; Your Spouse's/CU Partner's Birth Year: <DigitBoxes value={data.spBirthYear} count={4} /></span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="3a." /> During 2025, were you <strong>receiving</strong> federal Social Security Disability benefit payments?</span>
          <span style={{ whiteSpace: 'nowrap' }}>Yourself &nbsp;<CB checked={data.ssdi} /> Yes &nbsp;<CB checked={!data.ssdi} /> No &nbsp;&nbsp; Spouse/CU &nbsp;<CB checked={false} /> Yes &nbsp;<CB checked={true} /> No</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="3b." /> During 2025, were you <strong>receiving</strong> Railroad Retirement Disability benefit payments?</span>
          <span style={{ whiteSpace: 'nowrap' }}>Yourself &nbsp;<CB checked={data.rrd} /> Yes &nbsp;<CB checked={!data.rrd} /> No &nbsp;&nbsp; Spouse/CU &nbsp;<CB checked={false} /> Yes &nbsp;<CB checked={true} /> No</span>
        </Row>
      </div>

      {/* Residency */}
      <H2>Residency Information</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span style={{ flex: 1 }}><Ln n="4." /> Did you own/rent your principal residence (main home) in New Jersey on <strong>October 1, 2025</strong>?</span>
          <span><CB checked={data.oct1Nj} /> Yes &nbsp;<CB checked={!data.oct1Nj} /> No</span>
        </Row>
        <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
          <Ln n="5." /> Indicate your residency status on <strong>October 1, 2025.</strong>
          &nbsp;&nbsp;<CB checked={data.homeType==='own'} /> Homeowner
          &nbsp;&nbsp;<CB checked={data.homeType==='mobile'} /> Mobile home owner
          &nbsp;&nbsp;<CB checked={data.homeType==='rent'} /> Renter – SKIP TO Signature section
        </div>
        <Row>
          <span style={{ flex: 1 }}>
            <Ln n="6a." /> Did you own and live in the same main home in New Jersey from <strong>January 1, 2025, through December 31, 2025</strong>?
            <span style={{ display: 'block', fontSize: '7.5px', color: '#555', marginTop: '1px' }}>If "Yes," go to line 7. | If "No" and homeowner, go to line 6b. | If "No" and mobile home owner, skip to Signature section.</span>
          </span>
          <span style={{ whiteSpace: 'nowrap' }}><CB checked={data.same2025} /> Yes &nbsp;<CB checked={!data.same2025} /> No</span>
        </Row>
        <Row style={{ opacity: data.same2025 ? 0.4 : 1 }}>
          <span style={{ flex: 1 }}><Ln n="6b." /> Were you (or your spouse/CU partner) born in 1960 or earlier? If "Yes," go to line 6c. If "No," skip to the Signature section.</span>
          <span style={{ whiteSpace: 'nowrap' }}><CB checked={!data.same2025 && parseInt(data.birthYear) <= 1960} /> Yes &nbsp;<CB checked={!data.same2025 && parseInt(data.birthYear) > 1960} /> No</span>
        </Row>
        <Row style={{ opacity: data.same2025 ? 0.4 : 1 }}>
          <span style={{ flex: 1 }}><Ln n="6c." /> Did you move from one main home you <strong>owned</strong> in New Jersey to another main home you <strong>owned</strong> in New Jersey in 2025? If "Yes," go to Schedule 1. If "No," skip to Signature section.</span>
          <span style={{ whiteSpace: 'nowrap' }}><CB checked={!data.same2025 && data.movedWithin2025} /> Yes &nbsp;<CB checked={!data.same2025 && !data.movedWithin2025} /> No</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="7." /> Are you filing this application for the same home as last year's property tax relief benefits?</span>
          <span><CB checked={data.sameAsLast} /> Yes &nbsp;<CB checked={!data.sameAsLast} /> No</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="8." /> On December 31, 2025, did you own and live in the same New Jersey home that you owned and occupied on <strong>December 31, 2022</strong>, or earlier?</span>
          <span><CB checked={data.since2022} /> Yes &nbsp;<CB checked={!data.since2022} /> No</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="9." /> Did you move to your current home between <strong>January 1, 2023, and December 31, 2023</strong>?</span>
          <span><CB checked={data.moved2023} /> Yes &nbsp;<CB checked={!data.moved2023} /> No</span>
        </Row>
      </div>

      <PB />

      {/* ══ PAGE 2 ══ */}
      <PageHeader page={2} name={fullName} ssn={data.ssnLast4} />
      <H2>Principal Residence (Main Home)</H2>
      <div style={{ fontSize: '9px' }}>
        <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
          <Ln n="10." /> If your home on October 1, 2025, was a unit in a Co-op or a Continuing Care Retirement Facility, indicate the type:<br />
          <span style={{ paddingLeft: '28px' }}><CB checked={false} /> Co-op &nbsp; or &nbsp; <CB checked={false} /> Continuing Care Retirement Facility</span>
        </div>

        {/* Lines 11-12 table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginTop: '6px' }}>
          <thead>
            <tr>
              <th style={{ width: '55%', textAlign: 'left', fontWeight: 'normal', paddingBottom: '2px' }}></th>
              <th style={{ textAlign: 'center', fontWeight: '700', borderBottom: '1.5px solid #000', padding: '2px 4px' }}>2024</th>
              <th style={{ textAlign: 'center', fontWeight: '700', borderBottom: '1.5px solid #000', padding: '2px 4px' }}>2025</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: '11a.', text: 'Did you share ownership of the property that was your main home on October 1, 2025, with anyone other than your spouse/CU partner? (Mobile home owners see instructions.)', v: data.coOwn },
              { n: '11b.', text: 'If you answered "Yes," indicate the share (percentage) of the property you (and your spouse/CU partner) owned.', pct: data.coOwn ? data.coPct : '' },
              { n: '12a.', text: 'Did the property that was your main home on October 1, 2025, consist of multiple units?', v: data.multiUnit },
              { n: '12b.', text: 'If you answered "Yes," indicate the share (percentage) of the property that you (and your spouse/CU partner) used as your main home.', pct: data.multiUnit ? data.multiUnitPct : '' },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px dotted #bbb' }}>
                <td style={{ padding: '4px 0' }}><Ln n={r.n} /> {r.text}</td>
                {r.pct !== undefined ? (
                  <>
                    <td style={{ textAlign: 'center', padding: '4px' }}><InputBox value={r.pct} width={30} /> %</td>
                    <td style={{ textAlign: 'center', padding: '4px' }}><InputBox value={r.pct} width={30} /> %</td>
                  </>
                ) : (
                  <>
                    <td style={{ textAlign: 'center', padding: '4px', whiteSpace: 'nowrap' }}><CB checked={r.v} /> Yes &nbsp;<CB checked={!r.v} /> No</td>
                    <td style={{ textAlign: 'center', padding: '4px', whiteSpace: 'nowrap' }}><CB checked={r.v} /> Yes &nbsp;<CB checked={!r.v} /> No</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Property Taxes</H2>
      <div style={{ fontSize: '9px' }}>
        <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
          <div style={{ marginBottom: '3px' }}><Ln n="13a." /> Enter the block and lot numbers of the address that was your main home on October 1, 2025.</div>
          <div style={{ display: 'flex', gap: '10px', paddingLeft: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span>Block <br /><InputBox value={data.block} width={55} /></span>
            <span>Block Suffix <br /><InputBox value="" width={40} /></span>
            <span style={{ padding: '0 2px', alignSelf: 'flex-end', marginBottom: '2px' }}>.</span>
            <span>Lot <br /><InputBox value={data.lot} width={55} /></span>
            <span>Lot Suffix <br /><InputBox value="" width={40} /></span>
            <span style={{ padding: '0 2px', alignSelf: 'flex-end', marginBottom: '2px' }}>.</span>
            <span>Qualifier <br /><InputBox value={data.qualifier} width={55} /></span>
          </div>
        </div>
        <Row>
          <span style={{ flex: 1 }}><Ln n="13b." /> Are you claiming property taxes for additional lots? (see instructions)</span>
          <span><CB checked={data.additionalLots} /> Yes &nbsp;<CB checked={!data.additionalLots} /> No</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}>
            <Ln n="14." /> Enter your <strong>2024</strong> property taxes billed for the home that was your main home on October 1, 2024.
            <span style={{ display: 'block', fontSize: '7.5px', color: '#555' }}>(Mobile home owners enter 18% of total site fees) &nbsp; <strong>Prior Senior Freeze recipients: Do not change.</strong></span>
          </span>
          <MoneyBoxes value={t24} />
        </Row>
        <Row>
          <span style={{ flex: 1 }}>
            <Ln n="15." /> Enter your <strong>2025</strong> property taxes billed for the home that was your main home on October 1, 2025.
            <span style={{ display: 'block', fontSize: '7.5px', color: '#555' }}>(Mobile home owners enter 18% of total site fees)</span>
          </span>
          <MoneyBoxes value={t25} />
        </Row>
      </div>

      <H2>Payment-in-Lieu-of-Taxes (P.I.L.O.T.)</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span style={{ flex: 1 }}><Ln n="16a." /> Is there a Payment-in-Lieu-of-Taxes (P.I.L.O.T.) agreement for the home that was your main home in 2025?</span>
          <span><CB checked={data.pilot} /> Yes &nbsp;<CB checked={!data.pilot} /> No</span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="16b." /> If you answered "Yes," enter your Payment-in-Lieu-of-Taxes (P.I.L.O.T.) due for the home that was your main home in 2025.</span>
          <MoneyBoxes value={data.pilot ? data.pilotAmount : ''} />
        </Row>
      </div>

      <PB />

      {/* ══ PAGE 3 ══ */}
      <PageHeader page={3} name={fullName} ssn={data.ssnLast4} />

      <H2>2024 Income</H2>
      <div style={{ fontSize: '8px', marginBottom: '6px', lineHeight: 1.5 }}>
        Enter your annual income for 2024. See the instructions for information on sources of income and how to determine the amount to report. If you do not have any income to report, you must enter "0.00" on line 17f. Losses in one category of income cannot be used to reduce total income. If you have a net loss in any income category, leave that line blank. If you were married or in a civil union on December 31, 2024, and living in the same home, combine your incomes for that year.
      </div>
      <div style={{ fontSize: '9px' }}>
        {[
          { ln: '17a.', label: 'New Jersey Total Income (see instructions)', key: 'a' },
          { ln: '17b.', label: 'Tax-exempt interest income', key: 'b' },
          { ln: '17c.', label: 'Roth IRA rollovers (see instructions)', key: 'c' },
          { ln: '17d.', label: 'Disability pension received (see instructions)', key: 'd' },
          { ln: '17e.', label: 'Social Security Benefits (including Medicare Part B premiums) received. Enter 1040 Line 6a or SSA-1099 Box 5', key: 'e' },
        ].map(({ ln, label, key }) => (
          <Row key={ln}>
            <span style={{ flex: 1 }}><Ln n={ln} /> {label}</span>
            <MoneyBoxes value={inc24[key]} />
          </Row>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderTop: '2px solid #000', marginTop: '4px' }}>
          <strong><Ln n="17f." /> Total 2024 income (Add lines 17a–17e)</strong>
          <MoneyBoxes value={incomeTotal(inc24)} />
        </div>
      </div>

      <div style={{ borderTop: '1.5px solid #000', margin: '10px 0' }} />

      <H2>2025 Income</H2>
      <div style={{ fontSize: '8px', marginBottom: '6px', lineHeight: 1.5 }}>
        Enter your annual income for 2025. See the instructions for information on sources of income and how to determine the amount to report. If you do not have any income to report, you must enter "0.00" on line 18f. Losses in one category of income cannot be used to reduce total income. If you have a net loss in any income category, leave that line blank. If you were married or in a civil union on December 31, 2025, and living in the same home, combine your incomes for that year.
      </div>
      <div style={{ fontSize: '9px' }}>
        {[
          { ln: '18a.', label: 'New Jersey Total Income (see instructions)', key: 'a' },
          { ln: '18b.', label: 'Tax-exempt interest income', key: 'b' },
          { ln: '18c.', label: 'Roth IRA rollovers (see instructions)', key: 'c' },
          { ln: '18d.', label: 'Disability pension received (see instructions)', key: 'd' },
          { ln: '18e.', label: 'Social Security Benefits (including Medicare Part B premiums) received. Enter 1040 Line 6a or SSA-1099 Box 5', key: 'e' },
        ].map(({ ln, label, key }) => (
          <Row key={ln}>
            <span style={{ flex: 1 }}><Ln n={ln} /> {label}</span>
            <MoneyBoxes value={inc25[key]} />
          </Row>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderTop: '2px solid #000', marginTop: '4px' }}>
          <strong><Ln n="18f." /> Total 2025 income (Add lines 18a–18e)</strong>
          <MoneyBoxes value={incomeTotal(inc25)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '12px', marginTop: '18px' }}>Complete Signature section.</div>

      <PB />

      {/* ══ PAGE 4 ══ */}
      <PageHeader page={4} name={fullName} ssn={data.ssnLast4} />

      {/* Schedule 1 */}
      <H2>Schedule 1</H2>
      <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
        <strong>ONLY</strong> complete this schedule if you moved from one main home you <strong>owned</strong> to another main home you <strong>owned</strong> during 2025. Otherwise, leave this schedule blank.
      </div>
      {(() => {
        const h1 = data.sched1?.home1 || {};
        const h2 = data.sched1?.home2 || {};
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '10px' }}>
            <thead>
              <tr>
                <th style={{ width: '35%', borderBottom: '1.5px solid #000', padding: '3px 4px', textAlign: 'left' }}></th>
                <th style={{ borderBottom: '1.5px solid #000', border: '1px solid #999', padding: '4px', textAlign: 'center', fontWeight: '700', background: '#f5f5f5' }}>Main Home 1</th>
                <th style={{ borderBottom: '1.5px solid #000', border: '1px solid #999', padding: '4px', textAlign: 'center', fontWeight: '700', background: '#f5f5f5' }}>Main Home 2</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: '1. Address', v1: h1.address, v2: h2.address, type: 'text' },
                { label: '2. Block/lot/qualifier number', v1: h1.blockLot, v2: h2.blockLot, type: 'text' },
                { label: '3. Dates you lived in the property in 2025', v1: h1.dates, v2: h2.dates, type: 'text' },
                { label: '4. Did you share ownership?', v1: h1.shared, v2: h2.shared, type: 'yesno' },
                { label: '5. Share percentage owned', v1: h1.shared ? h1.sharePct : '', v2: h2.shared ? h2.sharePct : '', type: 'pct' },
                { label: '6. Did the property consist of multiple units?', v1: h1.multiUnit, v2: h2.multiUnit, type: 'yesno' },
                { label: '7. Share percentage used as main home', v1: h1.multiUnit ? h1.multiUnitPct : '', v2: h2.multiUnit ? h2.multiUnitPct : '', type: 'pct' },
                { label: '8. Total property taxes billed', v1: h1.taxes, v2: h2.taxes, type: 'money' },
                { label: '9. P.I.L.O.T. due', v1: h1.pilot, v2: h2.pilot, type: 'money' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '4px', border: '1px solid #ccc', fontSize: '8.5px' }}>{row.label}</td>
                  {['v1', 'v2'].map((k) => (
                    <td key={k} style={{ padding: '4px', border: '1px solid #ccc', textAlign: row.type === 'money' || row.type === 'pct' ? 'right' : 'left', minHeight: '22px', height: '22px' }}>
                      {row.type === 'yesno' && <><CB checked={row[k]} /> Yes &nbsp;<CB checked={!row[k]} /> No</>}
                      {row.type === 'pct' && (row[k] ? `${row[k]}%` : '')}
                      {row.type === 'money' && (row[k] ? `$${parseFloat(row[k]).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '')}
                      {row.type === 'text' && (row[k] || '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      })()}

      <div style={{ fontWeight: '700', fontSize: '10px', marginBottom: '10px' }}>Continue to PAS-1, line 10 on page 2.</div>

      {/* Signature */}
      <div style={{ border: '1.5px solid #000', padding: '8px 10px' }}>
        <div style={{ fontWeight: '700', fontSize: '11px', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '6px' }}>
          Signature — All of the programs included in this Property Tax Relief application are subject to appropriation in the State budget.
        </div>
        <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
          <CB checked={false} /> If enclosing a copy of a death certificate for a deceased applicant, check the box. (See instructions)
        </div>
        <div style={{ fontSize: '8px', marginBottom: '8px', lineHeight: 1.6, maxWidth: '68%' }}>
          Under penalties of perjury, I declare that I have examined this Property Tax Relief application, including accompanying schedules and statements, and to the best of my knowledge and belief, it is true, correct, and complete. If prepared by a person other than the applicant, this declaration is based on all information of which the preparer has any knowledge.
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '8px' }}>
          <div style={{ flex: 2, minWidth: '180px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px', borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px', color: '#00008b' }}>{data.sigName}</div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>Your Signature</div>
          </div>
          <div style={{ flex: 1, minWidth: '90px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px', fontSize: '10px' }}>{sigDate}</div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>Date</div>
          </div>
          <div style={{ flex: 2, minWidth: '180px' }}>
            <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px' }}></div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>Spouse's/CU Partner's Signature (if filing jointly, BOTH must sign)</div>
          </div>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '7.5px', color: '#555' }}>Your daytime phone number and/or email address (optional)</div>
          <div style={{ borderBottom: '1px solid #000', minHeight: '16px', fontSize: '10px', paddingBottom: '1px' }}>{data.phone}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
          {[['Paid Preparer\'s Signature', ''], ['Federal Identification Number', ''], ['Firm\'s name', ''], ['Firm\'s Federal Employer Identification Number', '']].map(([label], i) => (
            <div key={i}>
              <div style={{ borderBottom: '1px solid #000', minHeight: '16px' }}></div>
              <div style={{ fontSize: '7.5px', color: '#555' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: '#f5f5f5', border: '1px solid #ccc', padding: '6px 10px', fontSize: '8px', lineHeight: 1.7, textAlign: 'left', maxWidth: '220px' }}>
            <strong>Due Date: November 2, 2026</strong><br />
            Mail your completed application to:<br />
            NJ Division of Taxation<br />
            Revenue Processing Center<br />
            Property Tax Relief Application<br />
            PO Box 635<br />
            Trenton, NJ 08646-0635
          </div>
        </div>
      </div>

      <div style={{ marginTop: '8px', fontSize: '7.5px', color: '#666', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '5px' }}>
        ※ This document is a reference copy of your PAS-1 entries. Before submitting, transfer to the official PAS-1 form or apply online at propertytaxrelief.nj.gov
      </div>
    </div>
  );
}