// @ts-nocheck
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { DropZone } from './index';
import { Li } from '../Li';

let files;
let firstFile;
let secondFile;
let container;

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

  window.URL.createObjectURL = jest.fn();

  container = document.createElement('div');

  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);

  container = null;
});

describe('DropZone SNAPSHOTS', () => {
  it('should render', () => {
    const wrapper = mount(<DropZone onDrop={jest.fn()} onRemove={jest.fn()} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('DropZone HANDLERS', () => {

});

describe('DropZone ATTRIBUTES', () => {
  it('should have className, change classes through props and className should not change prop-classes', () => {
    const wrapper = mount(<DropZone _box onDrop={jest.fn()} onRemove={jest.fn()} />);

    expect(wrapper.find('Div').first().hasClass('box')).toBeTruthy();


    wrapper.setProps({ _active: true, _box: false });

    expect(wrapper.find('Div').first().hasClass('box')).toBeFalsy();

    expect(wrapper.find('Div').first().hasClass('active')).toBeTruthy();


    wrapper.setProps({ className: 'testClass' });

    expect(wrapper.find('Div').first().hasClass('box')).toBeFalsy();

    expect(wrapper.find('Div').first().hasClass('active')).toBeTruthy();

    expect(wrapper.find('Div').first().hasClass('testClass')).toBeTruthy();
  });

  it('should render files in custom HTMLElement', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(<DropZone dropZoneFilesNode={div} onDrop={jest.fn()} onRemove={jest.fn()} />);

    wrapper.setProps({ value: { acceptedFiles: files, rejectedFiles: [] } });

    expect(div.innerHTML.includes('file1.pdf')).toBeTruthy();
    expect(div.innerHTML.includes('cats.gif')).toBeTruthy();
  });

  it('should render descriptionText', () => {
    const wrapper = mount(<DropZone infoRender={() => <div className="dropzone-description">LETS DESCRIBE! Размер: до 100 Мб.</div>} onDrop={jest.fn()} onRemove={jest.fn()} />);

    expect(wrapper.find('div.dropzone-description').text()).toEqual('LETS DESCRIBE! Размер: до 100 Мб.');
  });

  it.skip('should not upload if maxFiles is reached', () => {
    // TODO: не работает из-за эвента дропзоны, починить
    const wrapper = mount(<DropZone maxFilesNumber={1} onDrop={jest.fn()} onRemove={jest.fn()} />);

    act(() => {
      (wrapper.find('div.dropzone-content').props()).onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => { } });
    });

    act(() => {
      (wrapper.find('div.dropzone-content').props()).onDrop({ dataTransfer: { files: [secondFile] }, preventDefault: () => { } });
    });
  });

  it.skip('should reject file if its size is bigger than maxSize', () => {
    const wrapper = mount(<DropZone maxFileSize={20971520} fileSizeUnit="byte" onChange={jest.fn()} />);

    (wrapper.find('div.dropzone-content').props()).onChange();

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it.skip('should reject file if its size is smaller than minSize', () => {
    const wrapper = mount(<DropZone minFileSize={20000000} onDrop={jest.fn()} onRemove={jest.fn()} />);

    (wrapper.find('div.dropzone-content').props()).onChange();
  });

  it.skip('should render dropped files', () => {
    const wrapper = mount(<DropZone files={files} acceptedFilesRender={({ elementProps: { files: accepted } }) => accepted.map((item) => <Li>{item.name}</Li>)} onDrop={jest.fn()} onRemove={jest.fn()} />);

    expect(wrapper.find('Li')).toHaveLength(2);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render width', () => {
    const wrapper = mount(<DropZone _width-20 onDrop={jest.fn()} onRemove={jest.fn()} />);

    expect(wrapper.find('div').first().getDOMNode().classList).toContain('width-20');
  });

  it.skip('should display error messages', () => {
    const wrapper = mount(<DropZone onDrop={jest.fn()} showDroppedFiles={false} onRemove={jest.fn()} />);

    wrapper.setProps({ minFileSize: 20000000 });

    (wrapper.find('div.dropzone-content').props()).onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => { } });

    wrapper.update();

    expect(wrapper.find('.txt-danger').last().text()).toEqual("'file1.pdf': - файл меньше допустимого размера");

    wrapper.setProps({ minFileSize: undefined, maxFileSize: 20000000 });

    (wrapper.find('div.dropzone-content').props()).onDrop({ dataTransfer: { files: [secondFile] }, preventDefault: () => { } });

    wrapper.update();

    expect(wrapper.find('.txt-danger').last().text()).toEqual("'cats.gif': - превышен максимальный размер файла");

    wrapper.setProps({ maxFileSize: undefined, allowedFiles: 'image/*' });

    (wrapper.find('div.dropzone-content').props()).onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => { } });

    wrapper.update();

    expect(wrapper.find('.txt-danger').last().text()).toEqual("'file1.pdf': - недопустимый формат файла");

    wrapper.setProps({ allowedFiles: undefined });

    wrapper.setProps({ files: [firstFile] });

    (wrapper.find('div.dropzone-content').props()).onDrop({ dataTransfer: { files: [firstFile] }, preventDefault: () => { } });

    wrapper.update();

    expect(wrapper.find('.txt-danger').last().text()).toEqual("'file1.pdf': - файл уже загружен");

    wrapper.setProps({ maxFilesNumber: 1 });

    (wrapper.find('div.dropzone-content').props()).onDrop({ dataTransfer: { files: [secondFile] }, preventDefault: () => { } });

    wrapper.update();

    expect(wrapper.find('.txt-danger').last().text()).toEqual('Превышено максимальное количество файлов. Максимум - 1. ');
  });

  it('should customize upload button', () => {
    const wrapper = mount(
      <DropZone
        onDrop={jest.fn()}
        onRemove={jest.fn()}
        uploadButtonRender={() => <span className="test-class">Drop me</span>}
      />,
    );

    expect(wrapper.find('.test-class').text()).toEqual('Drop me');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should customize description text', () => {
    const wrapper = mount(
      <DropZone
        onDrop={jest.fn()}
        onRemove={jest.fn()}
        infoRender={() => <span className="dropzone-description">Drop here</span>}
      />,
    );

    expect(wrapper.find('span.dropzone-description').text()).toEqual('Drop here');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
