import React from 'react';
import { PrivacyPolicyView } from '../../src/components/policy/PrivacyPolicyView';

export const metadata = {
  title: 'Privacy Policy | Saathi — Simpler 2 Gather',
  description:
    'Saathi Privacy Policy compliant with India IT Act 2000 and Digital Personal Data Protection (DPDP) Act, 2023.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}
