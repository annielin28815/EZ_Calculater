import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Image } from 'antd';

import { FormInput } from 'src/Components';
import { Images, Screen } from 'src/Theme';


const styles = {
  root: {
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
    background: `url(${Images.bg}) no-repeat`,
    backgroundSize: 'cover'
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: '36px',
    color: '#528872',
    letterSpacing: '5px',
    marginBottom: '50px',
    paddingTop: '20px',
    zIndex: '10',
  },
  logoArea: {
    height: '80px',
    marginBottom: '5px'
  },
  wrapperBox: {
    width: '550px',
    height: '500px',
    margin: 'auto',
    marginTop: `${(document.documentElement.clientHeight - 560) / 2}px`,
  },
  middleBox: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    position: 'relative',
    background:  `url(${Images.connerBg}) no-repeat center top` + '#fff',
    backgroundSize: 'cover',
  },
  btnStyle: {
    width: '456px',
    height: '40px',
    backgroundColor: '#3D3D3B',
    borderRadius: '5px',
    color: 'white'
  },
  inputLabel: {
    color: '#0D902C',
    textAlign: 'left',
    letterSpacing: '5px',
    paddingBottom: '5px'
  },
  inputStyle: {
    width: '456px',
    height: '40px',
    border: '1px solid #C6DB9E',
    borderRadius: '5px',
  }
};

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

class LoginMiddleView extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  static defaultProps = {};

  state = {
    text: '',
    password: '',
  };

  handleHeaderMarginTop = () => {
    let width = Screen.screenWidth;
    if (width > 1440) {
      return '160px';
    } else if (width > 1024 && width <= 1440) {
      return '80px';
    } else {
      return '0px';
    }
  }

  render() {
    const { handleLogin } = this.props;
    return (
      <div style={styles.root}>
        <div style={styles.wrapperBox}>
          <div style={styles.middleBox}>
            <div style={styles.header}>
              <img src={require('../Assets/Image/logo-active.png')} alt="Logo" style={styles.logoArea} />
              <h1 style={{ fontSize: '36px', fontFamily: 'Microsoft JhengHei'}}>會員卡系統</h1>
            </div>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                account: 'winhome',
                password: 'wh53043083',
              }}
              style={{ width: '456px', margin: 'auto', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',}}
              onFinish={value => handleLogin(value)}
            >
              
              {/* <label style={styles.inputLabel}><span style={ {color: 'red',} }>*</span>帳號</label> */}
              {/* 基於 Antdesign 的 form，公司寫了 FormInput 這個元件(src/Components/common/FormInput.js) */}
              <FormInput
                title="帳號"
                required
                // 用propName 命名
                propName='account'
                placeholder="請輸入帳號"
                requiredErrorMessage="請輸入帳號"
                inputStyle={{...styles.inputStyle}}
              />
              {/* <label style={styles.inputLabel}><span style={ {color: 'red',} }>*</span>密碼</label> */}
              <FormInput
                title="密碼"
                required
                propName='password'
                type="password"
                placeholder="請輸入密碼"
                inputStyle={{ ...styles.inputStyle }}
                requiredErrorMessage="請輸入密碼"
              />

              <Form.Item>
                <Button style={styles.btnStyle} htmlType="submit">
                  登入
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div style={{
            position: 'absolute',
            bottom: '0px',
            width: '100%',
        }}>
          <img 
            src={Images.bottomBg} 
            style={{
              width: '100%',
              fontSize: '14px',
              textAlign: 'center',
            }} 
            />

         <div style={{ textAlign: 'center', color: 'white', position: 'absolute', bottom: '10px', width: '100%'}}>
            Copyright 2022 前端萬能計算機
         </div>
        </div>
        
      </div >
    );
  }
}

export default LoginMiddleView;
