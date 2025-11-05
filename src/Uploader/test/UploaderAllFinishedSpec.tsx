import React from 'react';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import Uploader from '../Uploader';

describe('Uploader onAllUploadComplete', () => {
  let requests: any[] = [];
  let XHR: any;

  beforeEach(() => {
    requests = [];
    XHR = sinon.useFakeXMLHttpRequest();
    XHR.onCreate = function (xhr: any) {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Should call onAllUploadComplete after all started uploads finish', () => {
    const onAllUploadComplete = sinon.spy();
    const ref = React.createRef<any>();

    render(
      <Uploader ref={ref} name="file" action="/upload" onAllUploadComplete={onAllUploadComplete} />
    );

    // start two uploads
    ref.current.start({ blobFile: new File(['a'], 'a.txt') });
    ref.current.start({ blobFile: new File(['b'], 'b.txt') });

    // two XHRs created
    expect(requests.length).to.equal(2);

    // respond first success
    requests[0].respond(200, { 'Content-Type': 'application/json' }, '{"ok":true}');
    expect(onAllUploadComplete).to.not.have.been.called;

    // respond second success - now all finished
    requests[1].respond(200, { 'Content-Type': 'application/json' }, '{"ok":true}');
    expect(onAllUploadComplete).to.have.been.calledOnce;
  });
});
