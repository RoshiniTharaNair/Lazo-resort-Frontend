'use client';

import EmailForm from '@/components/EmailForm';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Send Email</h1>
      <EmailForm />
    </div>
  );
};

export default Home;
