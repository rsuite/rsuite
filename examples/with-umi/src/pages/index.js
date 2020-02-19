import styles from './index.css';

import Container from 'rsuite/lib/Container';
import Button from 'rsuite/lib/Button';

import 'rsuite/styles/button.less';
import 'rsuite/styles/container.less';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <Container>
        <ul className={styles.list}>
          <li>
            <Button>React Suite</Button>
          </li>
        </ul>
      </Container>
    </div>
  );
}
