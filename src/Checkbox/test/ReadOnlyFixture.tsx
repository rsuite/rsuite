import React, { useEffect, useRef, useState } from 'react';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../../CheckboxGroup';
import Radio from '../../Radio';
import RadioGroup from '../../RadioGroup';

export interface ReadOnlyFixtureProps {
  kind?: 'checkbox' | 'radio';
  group?: boolean;
  independent?: boolean;
  defaultChecked?: boolean;
  mixed?: boolean;
  onReady?: (api: {
    unlock: () => void;
    snapshot: () => { changes: unknown[]; inputChanges: unknown[]; clicks: number };
  }) => void;
}

export default function ReadOnlyFixture({
  kind = 'checkbox',
  group = false,
  independent = false,
  defaultChecked = false,
  mixed = false,
  onReady
}: ReadOnlyFixtureProps) {
  const [readOnly, setReadOnly] = useState(true);
  const changes = useRef<unknown[]>([]);
  const inputChanges = useRef<unknown[]>([]);
  const clicks = useRef(0);
  const change = (value: unknown) => changes.current.push(value);
  const inputChange = (value: unknown, checked: boolean) =>
    inputChanges.current.push([value, checked]);
  useEffect(() => {
    onReady?.({
      unlock: () => setReadOnly(false),
      snapshot: () => ({
        changes: [...changes.current],
        inputChanges: [...inputChanges.current],
        clicks: clicks.current
      })
    });
  }, [onReady]);
  const Component = kind === 'checkbox' ? Checkbox : Radio;
  let control: React.ReactNode;
  if (group) {
    const options = [
      <Component key="first" value="first" onChange={inputChange}>
        First
      </Component>,
      <Component key="second" value="second" onChange={inputChange}>
        Second
      </Component>
    ];
    control =
      kind === 'checkbox' ? (
        <CheckboxGroup readOnly={readOnly} defaultValue={['first']} name="choice" onChange={change}>
          {options}
        </CheckboxGroup>
      ) : (
        <RadioGroup readOnly={readOnly} defaultValue="first" name="choice" onChange={change}>
          {options}
        </RadioGroup>
      );
  } else if (independent) {
    control = (
      <>
        <Radio name="choice" value="first" defaultChecked>
          First
        </Radio>
        <Radio name="choice" value="second" readOnly={readOnly} onChange={inputChange}>
          Second
        </Radio>
      </>
    );
  } else {
    control =
      kind === 'checkbox' ? (
        <Checkbox
          readOnly={readOnly}
          defaultChecked={defaultChecked}
          indeterminate={mixed}
          name="choice"
          value="yes"
          onChange={inputChange}
          onCheckboxClick={() => clicks.current++}
        >
          Choice
        </Checkbox>
      ) : (
        <Radio
          readOnly={readOnly}
          defaultChecked={defaultChecked}
          name="choice"
          value="yes"
          onChange={inputChange}
          inputProps={{ onClick: () => clicks.current++ }}
        >
          Choice
        </Radio>
      );
  }
  return (
    <form data-testid="readonly-form" data-locked={readOnly} style={{ padding: 24 }}>
      <button type="button">Before</button>
      {control}
    </form>
  );
}
