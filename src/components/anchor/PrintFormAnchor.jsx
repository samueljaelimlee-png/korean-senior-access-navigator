import React from 'react';
import { InputBox, DigitBoxes, MoneyBoxesSmall, SSNBox, CB, PB, H2, Row, Ln, BASE } from './printBlocks';

export default function PrintFormAnchor({ data, printOnly = true }) {
  const fullName = data.lname && data.fname ? `${data.lname}, ${data.fname}` : '';
  const sigDate = data.sigDate ? new Date(data.sigDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
  const fs = data.filingStatus;
  const income = parseFloat(data.njGrossIncome) || 0;
  const isHomeowner = data.homeType === 'homeowner';
  const isRenter = data.homeType === 'renter';

  return (
    <div className={printOnly ? 'print-only' : ''} style={{ ...BASE, maxWidth: '740px', margin: '0 auto', padding: '20px 28px', background: '#fff' }}>
      {/* ══ PAGE 1 ══ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div style={{ border: '2px solid #000', padding: '4px 8px', lineHeight: 1.1 }}>
          <div style={{ fontSize: '22px', fontWeight: '900' }}>2025</div>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>ANC-1</div>
        </div>
        <div style={{ textAlign: 'right', flex: 1, marginLeft: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700' }}>State of New Jersey</div>
          <div style={{ fontSize: '20px', fontWeight: '900', lineHeight: 1.1 }}>ANCHOR Application</div>
          <div style={{ fontSize: '10px', fontWeight: '600' }}>For Homeowners and Renters Under 65</div>
          <div style={{ fontSize: '8.5px' }}>Who Are Not Receiving Social Security Disability or Railroad Retirement Disability</div>
        </div>
      </div>

      <div style={{ fontSize: '8px', marginBottom: '6px' }}>Mail your completed application to: ANCHOR Application, Revenue Processing Center, PO Box 636, Trenton, NJ 08646-0636</div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #c06', marginBottom: '6px', fontSize: '8.5px' }}>
        <tbody>
          <tr>
            <td style={{ width: '32%', border: '1px solid #c06', padding: '4px 6px', verticalAlign: 'top' }}>
              <div style={{ fontSize: '7.5px', color: '#555', marginBottom: '3px' }}>Your Social Security Number</div>
              <SSNBox last4={data.ssnLast4} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '5px 0 3px' }}>Spouse's/CU Partner's Social Security Number</div>
              <SSNBox last4={data.spSsnLast4} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '5px 0 3px' }}>County/Municipality Code</div>
              <DigitBoxes value={data.muniCode} count={4} />
            </td>
            <td style={{ border: '1px solid #c06', padding: '4px 6px', verticalAlign: 'top' }}>
              <div style={{ fontSize: '7.5px', color: '#555', marginBottom: '2px' }}>Last Name, First Name and Initial (Joint filers enter first name and middle initial of each – Enter spouse/CU partner last name ONLY if different)</div>
              <InputBox value={fullName} width={320} height={20} />
              <div style={{ fontSize: '7.5px', color: '#555', margin: '4px 0 2px' }}>Home Address (Number and Street, including apartment number)</div>
              <InputBox value={data.address} width={320} height={20} />
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '7.5px', color: '#555' }}>
                <span>City, Town, Post Office: <InputBox value={data.city} width={90} /></span>
                <span>State: NJ</span>
                <span>ZIP: <InputBox value={data.zip} width={50} /></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
        Enter the address of your main home on October 1, 2025, <strong>if different</strong> from the address above.<br />
        County/Municipality Code: <DigitBoxes value={data.diffMuniCode} count={4} /> &nbsp; Street Address: <InputBox value={data.diffStreet} width={260} />
      </div>

      <div style={{ fontSize: '8px', marginBottom: '8px', lineHeight: 1.5, borderTop: '1px solid #000', paddingTop: '4px' }}>
        <strong>Do Not File This Application If:</strong> You or your spouse/CU partner were born in 1960 or before, OR were receiving Social Security Disability or Railroad Retirement Disability benefits during 2025. <strong>You must file Form PAS-1 instead.</strong>
      </div>

      <H2>Filing Status</H2>
      <div style={{ fontSize: '9px', marginBottom: '6px' }}>
        <div style={{ marginBottom: '4px' }}>1. Your Filing Status from your 2025 NJ-1040:</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', paddingLeft: '12px' }}>
          <div><CB checked={fs === 'A'} /> A. Single</div>
          <div style={{ fontSize: '8.5px' }}>Married/CU Partner, filing separately:</div>
          <div><CB checked={fs === 'B'} /> B. Head of Household</div>
          <div><CB checked={fs === 'E'} /> E. Each maintains separate residence</div>
          <div><CB checked={fs === 'C'} /> C. Qualifying Widow(er)/Surviving CU Partner</div>
          <div><CB checked={fs === 'F'} /> F. Both maintain same residence</div>
          <div><CB checked={fs === 'D'} /> D. Married/CU Couple, filing joint return</div>
        </div>
      </div>

      <H2>Age and Disability Status (Fill in all ovals that apply)</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span><Ln n="2." /> Your Birth Year: <DigitBoxes value={data.birthYear} count={4} /> &nbsp;&nbsp; Spouse's/CU Partner's Birth Year: <DigitBoxes value={data.spBirthYear} count={4} /></span>
        </Row>
        <Row>
          <span style={{ flex: 1 }}><Ln n="3." /> Were you blind or disabled on December 31, 2025? (See instructions)</span>
          <span style={{ whiteSpace: 'nowrap' }}>Yourself &nbsp;<CB checked={data.blindSelf} /> Yes &nbsp;<CB checked={!data.blindSelf} /> No &nbsp;&nbsp; Spouse/CU &nbsp;<CB checked={data.blindSpouse} /> Yes &nbsp;<CB checked={!data.blindSpouse} /> No</span>
        </Row>
      </div>

      <H2>Income</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span style={{ flex: 1 }}><Ln n="4." /> Enter your 2025 New Jersey Gross Income (see instructions)</span>
          <MoneyBoxesSmall value={income} />
        </Row>
      </div>

      <H2>Residency Information</H2>
      <div style={{ fontSize: '9px' }}>
        <Row>
          <span style={{ flex: 1 }}><Ln n="5a." /> Did you own (or rent) and live in your principal residence (main home) in New Jersey on <strong>October 1, 2025</strong>? If "Yes," complete line 5b. If "No," STOP. You are not eligible.</span>
          <span><CB checked={data.oct1Nj === true} /> Yes &nbsp;<CB checked={data.oct1Nj === false} /> No</span>
        </Row>
        <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
          <Ln n="5b." /> Indicate your residency status on October 1, 2025:
          &nbsp;&nbsp;<CB checked={isHomeowner} /> Homeowner – Go to Homeowners section
          &nbsp;&nbsp;<CB checked={isRenter} /> Renter or Mobile Home Owner – Go to Renters section
        </div>
      </div>

      <PB />

      {/* ══ PAGE 2 ══ */}
      {isHomeowner && (
        <>
          <H2>Homeowners (Renters and Mobile Home Owners DO NOT complete this section.)</H2>
          <div style={{ fontSize: '9px' }}>
            <Row>
              <span style={{ flex: 1 }}><Ln n="6." /> Are you filing this application for the same home as last year's ANCHOR benefit?</span>
              <span><CB checked={data.sameAsLast} /> Yes &nbsp;<CB checked={!data.sameAsLast} /> No</span>
            </Row>
            <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
              <div style={{ marginBottom: '3px' }}><Ln n="7." /> Enter the block and lot numbers of the address that was your main home on October 1, 2025.</div>
              <div style={{ display: 'flex', gap: '10px', paddingLeft: '28px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <span>Block<br /><InputBox value={data.block} width={55} /></span>
                <span>Block Suffix<br /><InputBox value={data.blockSuffix} width={40} /></span>
                <span>Lot<br /><InputBox value={data.lot} width={55} /></span>
                <span>Lot Suffix<br /><InputBox value={data.lotSuffix} width={40} /></span>
                <span>Qualifier<br /><InputBox value={data.qualifier} width={55} /></span>
              </div>
            </div>
            <Row>
              <span style={{ flex: 1 }}><Ln n="8a." /> Did you share ownership of this property with anyone other than your spouse/CU partner?</span>
              <span><CB checked={data.coOwn} /> Yes &nbsp;<CB checked={!data.coOwn} /> No</span>
            </Row>
            <Row>
              <span style={{ flex: 1 }}><Ln n="8b." /> If "Yes," indicate the share (percentage) of the property you (and your spouse/CU partner) owned.</span>
              <span><InputBox value={data.coOwn ? data.coPct : ''} width={30} /> %</span>
            </Row>
            <Row>
              <span style={{ flex: 1 }}><Ln n="9a." /> Did the property consist of multiple units?</span>
              <span><CB checked={data.multiUnit} /> Yes &nbsp;<CB checked={!data.multiUnit} /> No</span>
            </Row>
            <Row>
              <span style={{ flex: 1 }}><Ln n="9b." /> If "Yes," indicate the share (percentage) of the property that you (and your spouse/CU partner) used as your main home.</span>
              <span><InputBox value={data.multiUnit ? data.multiUnitPct : ''} width={30} /> %</span>
            </Row>
            <div style={{ borderBottom: '1px dotted #bbb', padding: '4px 0' }}>
              <Ln n="10." /> If your home was a unit in a Co-op or a Continuing Care Retirement Facility on October 1, 2025, indicate the type:<br />
              <span style={{ paddingLeft: '28px' }}><CB checked={data.coopType === 'coop'} /> Co-op &nbsp; or &nbsp; <CB checked={data.coopType === 'ccrc'} /> Continuing Care Retirement Facility</span>
              <div style={{ paddingLeft: '28px', marginTop: '3px' }}>Name of Co-op or Continuing Care Retirement Facility: <InputBox value={data.coopName} width={240} /></div>
            </div>
            <Row>
              <span style={{ flex: 1 }}><Ln n="11." /> Enter your 2025 property taxes billed for the home that was your main home on October 1, 2025.</span>
              <MoneyBoxesSmall value={data.propertyTax2025} />
            </Row>
            <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '11px', marginTop: '8px' }}>Go to the Signature section.</div>
          </div>
        </>
      )}

      {isRenter && (
        <>
          <H2>Renters and Mobile Home Owners (Homeowners DO NOT complete this section.)</H2>
          <div style={{ fontSize: '9px' }}>
            <Row>
              <span style={{ flex: 1 }}><Ln n="12." /> Was your name on the lease or rental agreement for the rental property or mobile home that was your main home on October 1, 2025?</span>
              <span><CB checked={data.nameOnLease} /> Yes &nbsp;<CB checked={!data.nameOnLease} /> No</span>
            </Row>
            <Row>
              <span style={{ flex: 1 }}><Ln n="13." /> Did anyone, other than your spouse/CU partner, occupy and share rent with you for the rental property or mobile home that was your main home on October 1, 2025?</span>
              <span><CB checked={data.sharedRent} /> Yes &nbsp;<CB checked={!data.sharedRent} /> No</span>
            </Row>
          </div>
        </>
      )}

      {/* Signature */}
      <div style={{ border: '1.5px solid #000', padding: '8px 10px', marginTop: '10px' }}>
        <div style={{ fontWeight: '700', fontSize: '11px', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '6px' }}>
          Signature
        </div>
        <div style={{ fontSize: '8.5px', marginBottom: '6px' }}>
          <CB checked={false} /> Check here if enclosing a copy of a death certificate for a deceased applicant.
        </div>
        <div style={{ fontSize: '8px', marginBottom: '8px', lineHeight: 1.6, maxWidth: '68%' }}>
          Under the penalties of perjury, I declare that the information in this application is true and correct and that I owned (or rented) and occupied the property for which I am applying for the ANCHOR benefit as my main home on October 1, 2025.
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
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px', borderBottom: '1.5px solid #000', paddingBottom: '2px', minHeight: '26px', color: '#00008b' }}>{data.spSigName}</div>
            <div style={{ fontSize: '7.5px', color: '#555', marginTop: '2px' }}>Spouse's/CU Partner's Signature (if filing jointly, BOTH must sign)</div>
          </div>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '7.5px', color: '#555' }}>Your daytime phone number and/or email address (optional)</div>
          <div style={{ borderBottom: '1px solid #000', minHeight: '16px', fontSize: '10px', paddingBottom: '1px' }}>{data.phone}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: '#f5f5f5', border: '1px solid #ccc', padding: '6px 10px', fontSize: '8px', lineHeight: 1.8, textAlign: 'left', maxWidth: '230px' }}>
            <strong>Due Date: November 2, 2026</strong><br />
            Mail your completed application:<br />
            NJ Division of Taxation<br />
            Revenue Processing Center<br />
            ANCHOR Application<br />
            PO Box 636<br />
            Trenton, NJ 08646-0636
          </div>
        </div>
      </div>

      <div style={{ marginTop: '8px', fontSize: '7.5px', color: '#666', textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: '5px' }}>
        This document organizes your entered information in the official ANC-1 form layout for reference. Submit online at anchor.nj.gov or mail the official form.
      </div>
    </div>
  );
}