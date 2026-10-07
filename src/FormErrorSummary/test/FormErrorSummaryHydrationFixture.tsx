import React from 'react';
import FormErrorSummary from '../FormErrorSummary';

export default function FormErrorSummaryHydrationFixture() {
  return (
    <>
      <FormErrorSummary
        header="Check your contact"
        items={[
          {
            name: 'user.email',
            label: 'Email:',
            message: 'Enter an address.',
            controlId: 'contact-email'
          }
        ]}
      />
      <input id="contact-email" aria-label="Email" defaultValue="unchanged" />
      <FormErrorSummary
        header="Server error"
        items={[{ name: 'server', label: 'Submission:', message: 'Please try again.' }]}
      />
    </>
  );
}
