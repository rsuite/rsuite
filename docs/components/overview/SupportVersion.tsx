import React from 'react';

export const SupportVersion = ({ minVersion }: { minVersion: string }) => {
  return (
    <img
      src={`https://img.shields.io/badge/version->=${minVersion}-blue`}
      alt={`Supported from version ${minVersion}`}
      title={`Supported from version ${minVersion}`}
      className="support-version"
    />
  );
};
