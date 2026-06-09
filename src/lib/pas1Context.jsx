import React, { createContext, useContext, useState } from 'react';

const defaultState = {
  step: 0,
  // Step 0 - Eligibility
  age65: null, disability: null, njResident: null, homeowner: null, incomeLow: null, propTax: null,
  // Step 1 - Personal
  lname: '', fname: '', birthYear: '', phone: '', address: '', muniCode: '', ssnLast4: '',
  hasSpouse: false, spName: '', spBirthYear: '',
  // Step 2 - Filing
  filingStatus: 'D', ssdi: false, rrd: false,
  // Step 3 - Residency
  homeType: 'own', oct1Nj: true, same2025: true, born1960: false, movedWithin2025: false,
  since2022: true, sameAsLast: true, moved2023: false, coOwn: false, coPct: '',
  multiUnit: false, multiUnitPct: '',
  // Schedule 1 (only when 6a=No, 6b=Yes, 6c=Yes)
  sched1: {
    home1: { address: '', blockLot: '', dates: '', shared: false, sharePct: '', multiUnit: false, multiUnitPct: '', taxes: '', pilot: '' },
    home2: { address: '', blockLot: '', dates: '', shared: false, sharePct: '', multiUnit: false, multiUnitPct: '', taxes: '', pilot: '' },
  },
  // Step 4 - Property Tax
  block: '', lot: '', qualifier: '', tax2024: '', tax2025: '',
  additionalLots: false, pilot: false, pilotAmount: '',
  // Step 5 - Income
  inc: { 2024: { a: 0, b: 0, c: 0, d: 0, e: 0 }, 2025: { a: 0, b: 0, c: 0, d: 0, e: 0 } },
  activeIncYear: 2024,
  // Step 6 - Signature
  sigName: '', sigDate: '',
  checks: [false, false, false, false, false, false],
};

const PAS1Context = createContext();

export function PAS1Provider({ children }) {
  const [formData, setFormData] = useState(defaultState);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateIncome = (year, key, value) => {
    setFormData(prev => ({
      ...prev,
      inc: {
        ...prev.inc,
        [year]: { ...prev.inc[year], [key]: parseFloat(value) || 0 }
      }
    }));
  };

  const setStep = (step) => {
    setFormData(prev => ({ ...prev, step }));
  };

  // Determine if user should skip Steps 4+5 (property tax & income) and go straight to signature
  // "Skip to Signature section" applies when:
  //   - homeType is 'rent' (renters skip everything after Step 3)
  //   - homeType is 'mobile' AND 6a=No
  //   - homeType is 'own' AND 6a=No AND 6b=No (not born 1960 or earlier)
  //   - homeType is 'own' AND 6a=No AND 6b=Yes AND 6c=No (didn't move within NJ)
  const shouldSkipToSignature = (data) => {
    if (data.homeType === 'rent') return true;
    if (data.same2025) return false; // 6a=Yes → normal flow
    if (data.homeType === 'mobile') return true; // 6a=No, mobile → skip
    if (data.homeType === 'own') {
      if (!data.born1960) return true; // 6b=No → skip
      if (!data.movedWithin2025) return true; // 6b=Yes, 6c=No → skip
    }
    return false;
  };

  const nextStep = () => {
    setFormData(prev => {
      let nextStepNum = prev.step + 1;
      // After Step 3 (residency), check if we should skip to Step 6 (signature)
      if (prev.step === 3 && shouldSkipToSignature(prev)) {
        nextStepNum = 6;
      }
      return { ...prev, step: Math.min(nextStepNum, 7) };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setFormData(prev => {
      let prevStepNum = prev.step - 1;
      // When going back from Step 6, check if we skipped 4+5
      if (prev.step === 6 && shouldSkipToSignature(prev)) {
        prevStepNum = 3;
      }
      return { ...prev, step: Math.max(prevStepNum, 0) };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fillSample = (sampleData) => {
    setFormData(prev => ({
      ...prev,
      ...sampleData,
      step: prev.step,
      age65: true, disability: false, njResident: true,
      homeowner: true, incomeLow: true, propTax: true,
      checks: [false, false, false, false, false, false],
    }));
  };

  return (
    <PAS1Context.Provider value={{
      formData, updateField, updateIncome, setStep, nextStep, prevStep, fillSample, setFormData
    }}>
      {children}
    </PAS1Context.Provider>
  );
}

export function usePAS1() {
  return useContext(PAS1Context);
}