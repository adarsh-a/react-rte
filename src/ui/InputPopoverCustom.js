/* @flow */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import IconButton from './IconButton';
import ButtonGroup from './ButtonGroup';
import autobind from 'class-autobind';
import cx from 'classnames';

import styles from './InputPopover.css';

type Props = {
  className?: string;
  defaultValue?: string;
  defaultValue1?: string;
  defaultValue2?: string;
  onCancel: () => any;
  onSubmit: (value: string,value2: string,value3 : string) => any;
};

export default class InputPopoverCustom extends Component {
  props: Props;
  _inputRef: ?Object;
  _inputRef1:?Object;
  _inputRef2:?Object;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this._onDocumentClick);
    document.addEventListener('keydown', this._onDocumentKeydown);
    if (this._inputRef) {
      this._inputRef.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('keydown', this._onDocumentKeydown);
  }

  render() {
    let {props} = this;
    let className = cx(props.className, styles.root);
    return (
      <div className={className}>
        <div className={styles.inner}>
          <input
            ref={this._setInputRef}
            defaultValue={props.defaultValue}
            type="text"
            placeholder="https://example.com/"
            className={styles.input}
            onKeyPress={this._onInputKeyPress}
          />
           <input
            ref={this._setInputRef1}
            defaultValue={props.defaultValue1}
            type="text"
            placeholder="class name"
            className={styles.input}
            onKeyPress={this._onInputKeyPress}
          />
           <input
            ref={this._setInputRef2}
            defaultValue={props.defaultValue2}
            type="text"
            placeholder="target"
            className={styles.input}
            onKeyPress={this._onInputKeyPress}
          />
          <ButtonGroup className={styles.buttonGroup}>
            <IconButton
              label="Cancel"
              iconName="cancel"
              onClick={props.onCancel}
            />
            <IconButton
              label="Submit"
              iconName="accept"
              onClick={this._onSubmit}
            />
          </ButtonGroup>
        </div>
      </div>
    );
  }

  _setInputRef(inputElement: Object) {
    this._inputRef = inputElement;    
  }

  _setInputRef1(inputElement: Object) {    
    this._inputRef1 = inputElement;
  }

  _setInputRef2(inputElement: Object) {    
    this._inputRef2 = inputElement;
  }

  _onInputKeyPress(event: Object) {
    if (event.which === 13) {
      // Avoid submitting a <form> somewhere up the element tree.
      event.preventDefault();
      this._onSubmit();
    }
  }

  _onSubmit() {
    let value = this._inputRef ? this._inputRef.value : '';
    console.log("log adarsh",value);
    let value2 = this._inputRef1 ? this._inputRef1.value : '';
    console.log("log adarsh",value2);
    let value3 = this._inputRef2 ? this._inputRef2.value : '';
    console.log("log adarsh",value3);
    this.props.onSubmit(value,value2,value3);
  }

  _onDocumentClick(event: Object) {
    let rootNode = ReactDOM.findDOMNode(this);
    if (!rootNode.contains(event.target)) {
      // Here we pass the event so the parent can manage focus.
      this.props.onCancel(event);
    }
  }

  _onDocumentKeydown(event: Object) {
    if (event.keyCode === 27) {
      this.props.onCancel();
    }
  }
}
