import { useEffect, useState } from 'preact/hooks';
import style from './style.css';
import { Message, Button } from 'rsuite';

// Note: `user` comes from the URL, courtesy of our router
const Profile = ({ user }) => {
  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState(10);

  useEffect(() => {
    let timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div class={style.profile}>
      <Message showIcon type="info" description="Preact with RSuite UI." />
      <h1>Profile: {user}</h1>
      <p>This is the user profile for a user named {user}.</p>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <Button appearance="ghost" onClick={() => void setCount(prev => prev + 1)}>
          Click Me
        </Button>
        Clicked {count} times.
      </p>
    </div>
  );
};

export default Profile;
