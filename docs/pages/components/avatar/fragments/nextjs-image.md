```tsx
import Image from 'next/image';
import { Avatar } from 'rsuite';

export default function ProfileAvatar() {
  return (
    <Avatar circle size="lg">
      <Image src="/profile.png" alt="Ada Lovelace" width={60} height={60} />
    </Avatar>
  );
}
```
