'use client';

import SmsForm from '@/components/SmsForm';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Send SMS</h1>
      <SmsForm />
    </div>
  );
};

export default Home;
