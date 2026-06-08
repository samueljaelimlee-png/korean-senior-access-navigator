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
  homeType: 'own', oct1Nj: true, same2025: true, since2022: true, 
  sameAsLast: true, moved2023: false, coOwn: false, coPct: '',
  multiUnit: false, multiUnitPct: '',
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

  const nextStep = () => {
    setFormData(prev => ({ ...prev, step: Math.min(prev.step + 1, 7) }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setFormData(prev => ({ ...prev, step: Math.max(prev.step - 1, 0) }));
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