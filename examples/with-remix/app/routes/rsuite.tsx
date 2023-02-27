import React from 'react';
import { Link } from '@remix-run/react';

export default function RSuite() {
  return (
    <div>
      <h1>RSuite</h1>
      <p>RSuite is a React UI library</p>
      <Link to="/">Home</Link>
    </div>
  );
}
