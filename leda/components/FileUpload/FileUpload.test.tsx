// @ts-nocheck
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { FileUpload } from './index';
import { Span } from '../Span';

let files;
let firstFile;
let secondFile;

beforeEach(() => {
  files = [
    {
      name: 'file1.pdf',
      size: 19000000,
      type: 'application/pdf',
    },
    {
      name: 'cats.gif',
      size: 21000000,
      type: 'image/gif',
    },
  ];
  [firstFile, secondFile] = files;
});

describe('FileUpload SNAPSHOTS', () => {
  it('should render', () => {
    const wrapper = mount(<FileUpload onFileLoad={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('should render different component states', () => {
    it('should render isLoading', () => {
      const wrapper = mount(<FileUpload isLoading infoRender={({ componentProps: { isLoading }, Element }) => (isLoading ? 'WAIT FOR ETERNITY' : <Element />)} onFileLoad={jest.fn()} />);

      expect(wrapper.text()).toEqual('WAIT FOR ETERNITY');

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});

describe('FileUpload HANDLERS', () => {
  it.skip('should call onFileLoad handler', () => {
    // TODO: не работает из-за эвента дропзоны, починить
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({ target: { acceptedFiles: [firstFile], rejectedFiles: [] } });
  });

  it('should call onClick handler', () => {
    const onClick = jest.fn();
    const wrapper = mount(<FileUpload onFileLoad={jest.fn()} onClick={onClick} />);

    act(() => {
      wrapper.find('a').props().onClick({ currentTarget: { value: 'blah-blah-blah' }, preventDefault: () => {} });
    });

    expect(onClick).toHaveBeenCalled();
  });

  it('should have correct event format', () => {
    const onClick = jest.fn();
    const wrapper = mount(<FileUpload onFileLoad={jest.fn()} onClick={onClick} />);

    act(() => {
      wrapper.find('a').props().onClick({ currentTarget: { value: 'blah-blah-blah' }, preventDefault: () => {} });
    });

    expect(onClick).toHaveBeenCalled();

    const [[event]] = onClick.mock.calls;

    expect(event.currentTarget).toEqual({ value: 'blah-blah-blah' });

    expect(event.defaultPrevented).toBeFalsy();
  });
});

describe('FileUpload ATTRIBUTES', () => {
  it.skip('should accept only certain type of files', () => {
    // TODO: не работает из-за эвента дропзоны, починить
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload allowedFiles="image/*" onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 3,
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
      },
    });

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [secondFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [{
          name: 'cats.gif',
          size: 21000000,
          type: 'image/gif',
        }],
        rejectedFiles: [],
      },
    });
  });

  it('should have className, change classes through props and className should not change prop-classes', () => {
    const wrapper = mount(<FileUpload _box onFileLoad={jest.fn()} />);

    expect(wrapper.find('Wrapper').first().hasClass('box')).toBeTruthy();

    wrapper.setProps({ _active: true, _box: false });


    expect(wrapper.find('Wrapper').first().hasClass('box')).toBeFalsy();

    expect(wrapper.find('Wrapper').first().hasClass('active')).toBeTruthy();
  });

  it('should render FileUpload in custom wrapper', () => {
    const wrapper = mount(<FileUpload _active onFileLoad={jest.fn()} wrapperRender={({ elementProps }) => <Span {...elementProps} />} />);

    expect(wrapper.find('span')).toHaveLength(2);

    expect(wrapper.find('span').first().hasClass('active')).toBeTruthy();
  });

  it('should render descriptionText', () => {
    const wrapper = mount(<FileUpload infoRender={() => 'LETS DESCRIBE!'} onFileLoad={jest.fn()} />);

    expect(wrapper.find('a').text()).toEqual('LETS DESCRIBE!');
  });
  // TODO: не работает из-за эвента дропзоны, починить (все ниже)
  it.skip('should reject file if its size is bigger than maxFileSize', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload maxFileSize={20} onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [secondFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 2,
          name: 'cats.gif',
          size: 21000000,
          type: 'image/gif',
        }],
      },
    });
  });

  it.skip('should reject file if its size is smaller than minFileSize', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload minFileSize={200000000} onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 1,
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
      },
    });
  });

  it.skip('should reject file if its size is larger than maxFileSize with default fileSizeUnit defined', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload maxFileSize={1} fileSizeUnit="MB" onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 2,
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
      },
    });
  });

  it.skip('should reject file if its size is smaller than minFileSize with default fileSizeUnit defined', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload minFileSize={500000000} onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 1,
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
      },
    });
  });
  it.skip('should reject file if its size is larger than maxFileSize with fileSizeUnit defined as kB', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload maxFileSize={1000} fileSizeUnit="kB" onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });


    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 2,
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
      },
    });
  });

  it.skip('should reject file if its size is smaller than minFileSize with fileSizeUnit defined as kB', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload minFileSize={50000000} fileSizeUnit="kB" onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 1,
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
      },
    });
  });

  it.skip('should reject file if its size is larger than maxFileSize with fileSizeUnit defined as byte', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload maxFileSize={1000} fileSizeUnit="byte" onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 2,
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
      },
    });
  });

  it.skip('should reject file if its size is smaller than minFileSize with fileSizeUnit defined as byte', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload minFileSize={50000000} fileSizeUnit="byte" onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [],
        rejectedFiles: [{
          errorCode: 1,
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
      },
    });
  });

  it.skip('should accept file with proper size when fileSizeUnit defined as byte', () => {
    const onFileLoad = jest.fn();
    const wrapper = mount(<FileUpload minFileSize={5000} maxFileSize={30000000} fileSizeUnit="byte" onFileLoad={onFileLoad} />);

    act(() => {
      wrapper.find('div').props().onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => {} });
    });

    expect(onFileLoad).toHaveBeenCalledWith({
      target: {
        acceptedFiles: [{
          name: 'file1.pdf',
          size: 19000000,
          type: 'application/pdf',
        }],
        rejectedFiles: [],
      },
    });
  });
});
