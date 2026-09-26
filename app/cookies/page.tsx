import React from 'react';
import { CookiePolicyView } from '../../src/components/policy/CookiePolicyView';

export const metadata = {
  title: 'Cookie Policy | Saathi — Simpler 2 Gather',
  description:
    'Learn how Saathi uses strictly necessary cookies and user-consented analytics to power the marketplace.',
};

export default function CookiePolicyPage() {
  return <CookiePolicyView />;
}
