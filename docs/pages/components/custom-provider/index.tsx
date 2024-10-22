import ImportGuide from '@/components/ImportGuide';
import DefaultPage from '@/components/Page';

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['CustomProvider']} />
};

export default function Page() {
  return <DefaultPage inDocsComponents={inDocsComponents} />;
}
