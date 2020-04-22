import { h } from 'preact';
import style from './style';
import { Button, Notification, Placeholder } from 'rsuite';
import React from 'preact/compat';

const { Paragraph } = Placeholder;
function open(funcName) {
  Notification[funcName]({
    title: funcName,
    description: <Paragraph style={{ width: 320 }} rows={3} />
  });
}
const Home = () => (
	<div class={style.home}>
		<h1>Home</h1>
		<p>This is the Home component.</p>
    <Button appearance="primary" onClick={() => open('success')}> Button </Button>
	</div>
);

export default Home;
