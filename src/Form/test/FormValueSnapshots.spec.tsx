import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form from '../Form';
import FormControl from '../../FormControl';
import NumberInput from '../../NumberInput';
import { StringType } from 'schema-typed';
import type { FormInstance } from '../hooks/useFormRef';

describe('Form value snapshots', () => {
  it.each([null, 'change', 'blur'] as const)(
    'preserves nested defaults and resets after editing with checkTrigger=%s',
    checkTrigger => {
      const defaults = { profile: { name: 'Original' }, untouched: { enabled: true } };
      const onChange = vi.fn();
      const ref = React.createRef<FormInstance>();
      render(
        <Form
          ref={ref}
          nestedField
          formDefaultValue={defaults}
          checkTrigger={checkTrigger}
          onChange={onChange}
        >
          <FormControl name="profile.name" rule={StringType()} />
        </Form>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
      if (checkTrigger === 'blur') fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByRole('textbox')).to.have.value('Edited');
      expect(defaults.profile.name).to.equal('Original');
      const next = onChange.mock.calls[0][0];
      expect(next.profile).not.to.equal(defaults.profile);
      expect(next.untouched).to.equal(defaults.untouched);

      act(() => ref.current?.reset());
      expect(screen.getByRole('textbox')).to.have.value('Original');
      expect(onChange.mock.lastCall?.[0]).to.equal(defaults);
    }
  );

  it('keeps a controlled snapshot unchanged when its owner rejects an edit', () => {
    const value = { profile: { name: 'Original' } };
    const onChange = vi.fn();
    render(
      <Form nestedField formValue={value} onChange={onChange}>
        <FormControl name="profile.name" rule={StringType()} />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });

    expect(value.profile.name).to.equal('Original');
    expect(onChange.mock.calls[0][0].profile.name).to.equal('Edited');
    expect(onChange.mock.calls[0][0].profile).not.to.equal(value.profile);
    expect(screen.getByRole('textbox')).to.have.value('Original');
  });

  it('keeps previous controlled values when the owner accepts successive edits', () => {
    const original = { profile: { name: 'Original' } };
    const snapshots: Record<string, any>[] = [original];
    function App() {
      const [value, setValue] = React.useState<Record<string, any>>(original);
      return (
        <Form
          nestedField
          formValue={value}
          checkTrigger={null}
          onChange={next => {
            snapshots.push(next);
            setValue(next);
          }}
        >
          <FormControl name="profile.name" />
        </Form>
      );
    }
    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'First' } });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Second' } });

    expect(snapshots.map(value => value.profile.name)).to.deep.equal([
      'Original',
      'First',
      'Second'
    ]);
    expect(screen.getByRole('textbox')).to.have.value('Second');
  });

  it('edits frozen nested defaults without changing the supplied objects', () => {
    const defaults = Object.freeze({ profile: Object.freeze({ name: 'Original' }) });
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="profile.name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });

    expect(onChange.mock.calls[0][0].profile.name).to.equal('Edited');
    expect(screen.getByRole('textbox')).to.have.value('Edited');
    expect(defaults.profile.name).to.equal('Original');
  });

  it('copies an edited array and row while retaining other rows and branches', () => {
    const defaults = { products: [{ name: 'First' }, { name: 'Second' }], metadata: new Date(0) };
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="products[1].name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const next = onChange.mock.calls[0][0];

    expect(defaults.products[1].name).to.equal('Second');
    expect(next.products).not.to.equal(defaults.products);
    expect(next.products[1]).not.to.equal(defaults.products[1]);
    expect(next.products[0]).to.equal(defaults.products[0]);
    expect(next.metadata).to.equal(defaults.metadata);
  });

  it('keeps an array root and restores its initial item when reset', () => {
    const defaults = [{ name: 'Original' }];
    const onChange = vi.fn();
    const ref = React.createRef<FormInstance>();
    render(
      <Form
        ref={ref}
        nestedField
        formDefaultValue={defaults}
        checkTrigger={null}
        onChange={onChange}
      >
        <FormControl name="[0].name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    expect(onChange.mock.calls[0][0]).to.be.an('array');
    expect(defaults[0].name).to.equal('Original');
    act(() => ref.current?.reset());
    expect(screen.getByRole('textbox')).to.have.value('Original');
  });

  it('retains an existing numeric-key object as an object', () => {
    const defaults = { rows: { 0: { name: 'Original' } } };
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="rows.0.name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    expect(defaults.rows[0].name).to.equal('Original');
    expect(onChange.mock.calls[0][0].rows).not.to.be.an('array');
    expect(onChange.mock.calls[0][0].rows[0].name).to.equal('Edited');
  });

  it('retains an intermediate class prototype and methods while copying its fields', () => {
    class Profile {
      constructor(public name: string) {}
      label() {
        return this.name;
      }
    }
    const defaults = { profile: new Profile('Original') };
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="profile.name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const next = onChange.mock.calls[0][0];
    expect(next.profile).to.be.instanceOf(Profile);
    expect(next.profile.label()).to.equal('Edited');
    expect(defaults.profile.label()).to.equal('Original');
  });

  it('retains an intermediate Date and copies only its edited metadata branch', () => {
    const date = Object.assign(new Date(0), {
      metadata: { label: 'Original' },
      untouched: { enabled: true }
    });
    const defaults = { date };
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="date.metadata.label" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const next = onChange.mock.calls[0][0];
    expect(next.date).to.be.instanceOf(Date);
    expect(next.date.getTime()).to.equal(0);
    expect(next.date.metadata.label).to.equal('Edited');
    expect(next.date.untouched).to.equal(date.untouched);
    expect(date.metadata.label).to.equal('Original');
  });

  it('retains an intermediate Map, its entries, and unrelated metadata', () => {
    const entry = { enabled: true };
    const map = Object.assign(new Map([['key', entry]]), {
      metadata: { label: 'Original' },
      untouched: { enabled: true }
    });
    const defaults = { map };
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="map.metadata.label" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const next = onChange.mock.calls[0][0];
    expect(next.map).to.be.instanceOf(Map);
    expect(next.map.get('key')).to.equal(entry);
    expect(next.map.untouched).to.equal(map.untouched);
    expect(next.map.metadata.label).to.equal('Edited');
    expect(map.metadata.label).to.equal('Original');
  });

  it('preserves existing array holes while copying an edited row', () => {
    const rows: { name: string }[] = [];
    rows[2] = { name: 'Original' };
    const defaults = { rows };
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="rows[2].name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const next = onChange.mock.calls[0][0];
    expect(next.rows).to.have.length(3);
    expect(0 in next.rows).to.equal(false);
    expect(1 in next.rows).to.equal(false);
    expect(next.rows[2].name).to.equal('Edited');
    expect(rows[2].name).to.equal('Original');
  });

  it('retains string and symbol array metadata when editing and removing a field', () => {
    const metadata = { enabled: true };
    const key = Symbol('metadata');
    const rows = Object.assign([{ name: 'Original', quantity: 1 }], {
      metadata,
      [key]: metadata,
      slice: 'Application slice',
      constructor: 'Application constructor'
    });
    const defaults = { rows };
    const onChange = vi.fn();
    const form = (show: boolean) => (
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        {show && <FormControl name="rows[0].name" shouldResetWithUnmount />}
      </Form>
    );
    const { rerender } = render(form(true));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const edited = onChange.mock.calls[0][0];
    expect(edited.rows.metadata).to.equal(metadata);
    expect(edited.rows[key]).to.equal(metadata);
    expect(edited.rows.slice).to.equal('Application slice');
    expect(edited.rows.constructor).to.equal('Application constructor');
    expect(rows[0].name).to.equal('Original');

    rerender(form(false));
    const removed = onChange.mock.lastCall?.[0];
    expect(removed.rows.metadata).to.equal(metadata);
    expect(removed.rows[key]).to.equal(metadata);
    expect(removed.rows.slice).to.equal('Application slice');
    expect(removed.rows.constructor).to.equal('Application constructor');
    expect(removed.rows[0]).to.deep.equal({ quantity: 1 });
    expect(rows[0].name).to.equal('Original');
  });

  it('copies typed-array data before editing an item and restores defaults on reset', () => {
    const metadata = { enabled: true };
    const bytes = Object.assign(new Uint8Array([1, 2]), { metadata });
    const defaults = { bytes, untouched: { enabled: true } };
    const ref = React.createRef<FormInstance>();
    const onChange = vi.fn();
    render(
      <Form
        ref={ref}
        nestedField
        formDefaultValue={defaults}
        checkTrigger={null}
        onChange={onChange}
      >
        <FormControl name="bytes[0]" accepter={NumberInput} />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '9' } });
    const next = onChange.mock.calls[0][0];
    expect(next.bytes).to.be.instanceOf(Uint8Array);
    expect(Array.from(next.bytes)).to.deep.equal([9, 2]);
    expect(Array.from(bytes)).to.deep.equal([1, 2]);
    expect(next.bytes.buffer).not.to.equal(bytes.buffer);
    expect(next.bytes.metadata).to.equal(metadata);
    expect(next.untouched).to.equal(defaults.untouched);

    act(() => ref.current?.reset());
    expect(screen.getByRole('textbox')).to.have.value('1');
  });

  it('retains DataView data and offsets when editing metadata', () => {
    const buffer = new ArrayBuffer(8);
    const view = Object.assign(new DataView(buffer, 2, 4), { metadata: { label: 'Original' } });
    Object.defineProperty(view, Symbol.toStringTag, { value: 'CustomView', enumerable: true });
    view.setUint8(0, 7);
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={{ view }} checkTrigger={null} onChange={onChange}>
        <FormControl name="view.metadata.label" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const next = onChange.mock.calls[0][0];
    expect(next.view).to.be.instanceOf(DataView);
    expect(next.view.byteOffset).to.equal(2);
    expect(next.view.byteLength).to.equal(4);
    expect(next.view.getUint8(0)).to.equal(7);
    expect(next.view.buffer).not.to.equal(buffer);
    expect(next.view[Symbol.toStringTag]).to.equal('CustomView');
    expect(view.metadata.label).to.equal('Original');
  });

  it('retains typed-array element lengths with a custom toStringTag', () => {
    const values = new Uint16Array([1, 2]);
    Object.defineProperty(values, Symbol.toStringTag, { value: 'DataView', enumerable: true });
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={{ values }} checkTrigger={null} onChange={onChange}>
        <FormControl name="values[0]" accepter={NumberInput} />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '9' } });
    const next = onChange.mock.calls[0][0];
    expect(next.values).to.be.instanceOf(Uint16Array);
    expect(Array.from(next.values)).to.deep.equal([9, 2]);
    expect(Array.from(values)).to.deep.equal([1, 2]);
    expect(next.values[Symbol.toStringTag]).to.equal('DataView');
  });

  it('preserves native view data when own metadata shadows structural properties', () => {
    const retained = { enabled: true };
    const key = Symbol('metadata');
    const values = new Uint16Array(new ArrayBuffer(8), 2, 2);
    values.set([1, 2]);
    const view = new DataView(new ArrayBuffer(8), 2, 4);
    view.setUint8(0, 7);
    for (const container of [values, view]) {
      for (const [property, value] of Object.entries({
        constructor: 'Application constructor',
        length: 1,
        byteOffset: 0,
        byteLength: 1,
        buffer: 'Application buffer',
        metadata: { label: 'Original', retained },
        other: retained
      })) {
        Object.defineProperty(container, property, { value, enumerable: true, configurable: true });
      }
      Object.defineProperty(container, key, { value: retained, enumerable: true });
    }
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={{ values, view }} checkTrigger={null} onChange={onChange}>
        <FormControl name="values.metadata.label" />
        <FormControl name="view.metadata.label" />
      </Form>
    );

    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Typed edit' } });
    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'View edit' } });
    const next = onChange.mock.lastCall?.[0];
    expect(Uint16Array.prototype.join.call(next.values)).to.equal('1,2');
    expect(DataView.prototype.getUint8.call(next.view, 0)).to.equal(7);
    expect(
      Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength')?.get?.call(next.view)
    ).to.equal(4);
    for (const container of [next.values, next.view]) {
      expect(container.constructor).to.equal('Application constructor');
      expect(container.length).to.equal(1);
      expect(container.byteOffset).to.equal(0);
      expect(container.byteLength).to.equal(1);
      expect(container.buffer).to.equal('Application buffer');
      expect(container.metadata.retained).to.equal(retained);
      expect(container.other).to.equal(retained);
      expect(container[key]).to.equal(retained);
    }
    expect(next.values.metadata.label).to.equal('Typed edit');
    expect(next.view.metadata.label).to.equal('View edit');
    expect((values as any).metadata.label).to.equal('Original');
    expect((view as any).metadata.label).to.equal('Original');
  });

  it('retains BigInt typed-array items when editing metadata', () => {
    const values = Object.assign(new BigInt64Array([1n, 2n]), { metadata: { label: 'Original' } });
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={{ values }} checkTrigger={null} onChange={onChange}>
        <FormControl name="values.metadata.label" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const next = onChange.mock.calls[0][0];
    expect(next.values).to.be.instanceOf(BigInt64Array);
    expect(Array.from(next.values)).to.deep.equal([1n, 2n]);
    expect(next.values.buffer).not.to.equal(values.buffer);
    expect(values.metadata.label).to.equal('Original');
  });

  it('passes a replacement Date leaf through unchanged', () => {
    const originalDate = new Date(0);
    const replacement = new Date(1);
    const defaults = { profile: { date: originalDate } };
    const onChange = vi.fn();
    function DateControl({ onChange: change }) {
      return (
        <button type="button" onClick={event => change(replacement, event)}>
          Change date
        </button>
      );
    }
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="profile.date" accepter={DateControl} />
      </Form>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Change date' }));
    expect(onChange.mock.calls[0][0].profile.date).to.equal(replacement);
    expect(defaults.profile.date).to.equal(originalDate);
  });

  it('retains literal dotted keys already present in a nested form', () => {
    const defaults = { 'profile.name': 'Literal', profile: { name: 'Nested' } };
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="profile.name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    const next = onChange.mock.calls[0][0];
    expect(next['profile.name']).to.equal('Edited');
    expect(next.profile).to.equal(defaults.profile);
    expect(defaults['profile.name']).to.equal('Literal');
  });

  it('supports quoted bracket keys containing dots', () => {
    const defaults = { profile: { 'given.name': 'Original' } };
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name={'profile["given.name"]'} />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    expect(defaults.profile['given.name']).to.equal('Original');
    expect(onChange.mock.calls[0][0].profile['given.name']).to.equal('Edited');
  });

  it('creates missing array containers without adding them to defaults', () => {
    const defaults = {};
    const onChange = vi.fn();
    render(
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="products[2].name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New' } });
    const next = onChange.mock.calls[0][0];
    expect(defaults).to.deep.equal({});
    expect(next.products).to.be.an('array');
    expect(next.products).to.have.length(3);
    expect(0 in next.products).to.equal(false);
    expect(next.products[2].name).to.equal('New');
  });

  it('preserves array snapshots when a control resets its value on unmount', () => {
    const defaults = {
      products: [{ name: 'Original', quantity: 1 }, { name: 'Other' }],
      untouched: { enabled: true }
    };
    const onChange = vi.fn();
    const form = (show: boolean) => (
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        {show && <FormControl name="products[0].name" shouldResetWithUnmount />}
      </Form>
    );
    const { rerender } = render(form(true));

    rerender(form(false));

    const next = onChange.mock.calls[0][0];
    expect(defaults.products[0].name).to.equal('Original');
    expect(next.products[0]).to.deep.equal({ quantity: 1 });
    expect(next.products).not.to.equal(defaults.products);
    expect(next.products[1]).to.equal(defaults.products[1]);
    expect(next.untouched).to.equal(defaults.untouched);
  });

  it('keeps dotted names literal when nestedField is disabled', () => {
    const defaults = { 'profile.name': 'Original', profile: { name: 'Nested' } };
    const onChange = vi.fn();
    render(
      <Form formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        <FormControl name="profile.name" />
      </Form>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited' } });
    expect(onChange.mock.calls[0][0]['profile.name']).to.equal('Edited');
    expect(onChange.mock.calls[0][0].profile).to.equal(defaults.profile);
  });

  it('keeps an application-owned prototype property when a nested control unmounts', () => {
    class Profile {}
    Object.assign(Profile.prototype, { sentinel: 'Retained' });
    const defaults = { profile: new Profile() };
    const onChange = vi.fn();
    const form = (show: boolean) => (
      <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
        {show && (
          <FormControl name="profile.constructor.prototype.sentinel" shouldResetWithUnmount />
        )}
      </Form>
    );
    const { rerender } = render(form(true));

    rerender(form(false));

    expect(Profile.prototype).to.have.property('sentinel', 'Retained');
    expect(onChange.mock.calls[0][0].profile).to.equal(defaults.profile);
  });

  it.each(['__proto__.rsuiteSnapshotProbe', 'constructor.prototype.rsuiteSnapshotProbe'])(
    'rejects prototype writes through %s',
    name => {
      const defaults = {};
      const onChange = vi.fn();
      render(
        <Form nestedField formDefaultValue={defaults} checkTrigger={null} onChange={onChange}>
          <FormControl name={name} />
        </Form>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Unsafe' } });
      expect(Object.prototype).not.to.have.property('rsuiteSnapshotProbe');
      expect(defaults).to.deep.equal({});
      expect(onChange.mock.calls[0][0]).to.deep.equal({});
    }
  );
});
