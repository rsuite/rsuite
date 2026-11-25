import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Loader } from 'rsuite';

interface ExampleLoaderProps {
  /**
   * Example component mapping configuration
   * @example { responsive: () => import('./responsive') }
   */
  examples: Record<string, () => Promise<any>>;
  /**
   * Default example to show if no example is specified in URL
   */
  defaultExample?: string;
}

const ExampleLoader: React.FC<ExampleLoaderProps> = ({ examples, defaultExample }) => {
  const searchParams = useSearchParams();
  const exampleKey = searchParams.get('example') || defaultExample;

  if (!exampleKey || !examples[exampleKey]) {
    const availableExamples = Object.keys(examples).join(', ');
    return (
      <div>
        Please specify a valid example via the URL parameter `?example=name`.
        <br />
        Available examples: {availableExamples}
      </div>
    );
  }

  // Dynamically import example component
  const ExampleComponent = dynamic(examples[exampleKey], {
    loading: () => <Loader center content="Loading..." />,
    ssr: false
  });

  return (
    <Suspense fallback={<Loader center content="Loading..." />}>
      <ExampleComponent />
    </Suspense>
  );
};

export default ExampleLoader;
