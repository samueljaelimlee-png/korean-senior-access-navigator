import React, { createContext, useContext, useState } from 'react';

const defaultState = {
  step: 0,
  // Step 0 - Eligibility
  q1: '', q2: '',
  // Step 1 - Personal
  lname: '', fname: '', ssnLast4: '', spSsnLast4: '',
  address: '', muniCode: '', city: '', state: 'NJ', zip: '',
  diffAddress: false, diffStreet: '', diffMuniCode: '',
  hasSpouse: false, spLname: '', spFname: '',
  // Step 2 - Filing & Age
  filingStatus: 'D', birthYear: '', spBirthYear: '',
  blindSelf: false, blindSpouse: false,
  // Step 3 - Income
  njGrossIncome: '',
  // Step 4 - Residency
  oct1Nj: null, homeType: '',
  // Step 5 - Homeowner
  sameAsLast: false,
  block: '', blockSuffix: '', lot: '', lotSuffix: '', qualifier: '',
  coOwn: false, coPct: '', multiUnit: false, multiUnitPct: '',
  coopType: '', coopName: '', propertyTax2025: '',
  // Step 5 - Renter
  nameOnLease: false, sharedRent: false,
  // Step 6 - Signature
  sigName: '', spSigName: '', sigDate: '', phone: '',
};

const AnchorContext = createContext();

export function AnchorProvider({ children }) {
  const [formData, setFormData] = useState(defaultState);
  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const setStep = (step) => setFormData(prev => ({ ...prev, step }));
  const nextStep = () => { setFormData(prev => ({ ...prev, step: Math.min(prev.step + 1, 7) })); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const prevStep = () => { setFormData(prev => ({ ...prev, step: Math.max(prev.step - 1, 0) })); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const fillSample = (sampleData) => setFormData(prev => ({ ...prev, ...sampleData, step: prev.step }));

  return (
    <AnchorContext.Provider value={{ formData, updateField, setStep, nextStep, prevStep, fillSample, setFormData }}>
      {children}
    </AnchorContext.Provider>
  );
}

export function useAnchor() {
  return useContext(AnchorContext);
}