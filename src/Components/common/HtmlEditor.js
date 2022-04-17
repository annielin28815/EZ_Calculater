/* eslint-disable react/prop-types */
import React from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import { Form, Input } from 'antd';

class HtmlEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editValue: BraftEditor.createEditorState(props.value),
    };
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      editValue: BraftEditor.createEditorState(value),
    });
  }
  onChangeValue = (value) => {
    const { onEditorStateChange } = this.props;
    this.setState({
      editValue: value,
    });
    onEditorStateChange(value);
  };

  render() {
    const { editValue } = this.state;
    const {
      title,
      value,
      error,
      required,
      requiredErrorMessage,
      propName,
      editorStyle = {},
    } = this.props;

    return (
      <Form.Item
        label={title}
        name={propName}
        rules={[
          {
            required: true,
            message: "請輸入內容！",
          },
        ]}
        required
      >
        <BraftEditor
          value={editValue}
          language="zh-hant"
          defaultValue={editValue}
          onChange={this.onChangeValue}
          contentStyle={{
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '10px',
            zIndex: '-1',
            backgroundColor: '#ffffff',
            minHeight: '300px',
            maxHeight: '800px',
            width: '100%',
            ...editorStyle,
          }}
          style={{
            height: '100%',
            padding: '10px',
            zIndex: '0',
            backgroundColor: '#ffffff',
            border: error ? `1px solid red` : `1px solid #7D9EB5`,
            minHeight: '300px',
            width: '100%',
            borderRadius: '5px',
            ...editorStyle,
          }}
        />
      </Form.Item>
    );
  }
}
export default HtmlEditor;