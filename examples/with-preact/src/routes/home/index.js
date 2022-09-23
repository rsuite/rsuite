import { Button, Notification, Placeholder, useToaster } from 'rsuite';
import style from './style.css';

const { Paragraph } = Placeholder;

const Home = () => {
  const toaster = useToaster();

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <Button
        appearance="primary"
        onClick={() =>
          void toaster.push(
            <Notification type="success" header="success">
              <Paragraph style={{ width: 320 }} rows={3} />
            </Notification>
          )
        }
      >
        Button
      </Button>
    </div>
  );
};

export default Home;
