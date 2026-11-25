import Image from 'next/image';
import { Avatar, AvatarGroup, Badge } from 'rsuite';
import DefaultPage from '@/components/layout/Page';
import ImportGuide from '@/components/ImportGuide';
import { FaUserLarge } from 'react-icons/fa6';
import { FcBusinessman, FcCustomerSupport } from 'react-icons/fc';

function NextImageDemo() {
  return (
    <Avatar circle size="lg">
      <Image
        src="/design/default/assets/user%20default%20copy%202.png"
        alt="Example profile photo"
        width={60}
        height={60}
      />
    </Avatar>
  );
}

const inDocsComponents = {
  'import-guide': () => <ImportGuide components={['Avatar', 'AvatarGroup']} />,
  'next-image-demo': NextImageDemo
};

export default function Page() {
  return (
    <DefaultPage
      inDocsComponents={inDocsComponents}
      dependencies={{ Avatar, AvatarGroup, Badge, FaUserLarge, FcBusinessman, FcCustomerSupport }}
      sandboxDependencies={{ 'react-icons': 'latest' }}
    />
  );
}
