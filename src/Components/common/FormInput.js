import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
// import './FormInput.css';


class FormInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    textBoxStyle: PropTypes.object,
    requiredErrorMessage: PropTypes.string,
    propName: PropTypes.string,
    style: PropTypes.object,
    rule: PropTypes.array,
    disabled: PropTypes.bool,
    inputStyle: PropTypes.object, // Input 樣式
    onKeyDown: PropTypes.func,
    inputProps: PropTypes.object,
    labelCol: PropTypes.number,
    wrapperCol: PropTypes.number,
    min: PropTypes.string,
    max: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    value: '',
    error: false,
    required: false,
    type: 'text',
    textBoxStyle: {},
    requiredErrorMessage: '此項目為必填',
    placeholder: '',
    style: {},
    rule: [],
    disabled: false,
    inputStyle: {},
    onKeyDown: () => { },
    inputProps: {},
    labelCol: 24,
    wrapperCol: 24,
    onChange: () => { },
    min: '',
    max: ''
  };

  render() {
    const {
      title,
      placeholder,
      required,
      type,
      requiredErrorMessage,
      propName,
      style,
      rule,
      disabled = false,
      inputStyle,
      onKeyDown,
      inputProps,
      labelCol,
      wrapperCol,
      value,
      onChange,
      min,
      max
    } = this.props;

    return (
      <Form.Item
        label={title}
        name={propName}
        rules={[
          {
            required: required,
            message: requiredErrorMessage,
          },
          ...rule,
        ]}
        style={style}
        colon={false}
        labelCol={{ span: labelCol }}
        wrapperCol={{ span: wrapperCol }}
      >
        <Input
          autoComplete="off" {...inputProps}
          id="formInput"
          onKeyDown={onKeyDown}
          style={{
            ...inputStyle,
            borderRadius: '5px',
            height: '40px',
            border: '1px solid #C6DB9E',
            color: '#C6DB9E'
          }}
          type={type ? type : 'text'}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
      </Form.Item>
    );
  }
}

export default FormInput;