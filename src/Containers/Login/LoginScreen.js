import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActions } from 'src/Stores';

import { LoginMiddleView } from 'src/Components';

const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '30px',
  },

};

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
    };
  }
  static propTypes = {
    class: PropTypes.object,
  };

  handleLogin = (value) => {
    const { login } = this.props;
    const { history } = this.props;
    // 2. callback function 將 isLoading 一開始的設定給關掉，讓使用者知道已有執行動作。
    const callback = () => {
      this.setState({
        isLoading: false,
      });
    }
    // 1. isLoading 一開始設定為打開、使用者發送請求後就執行api、執行完畢無論結果都會回傳是否成功、回到callback function(#45~49)。
    this.setState({
      isLoading: true,
    }, () => {
      login(value, callback);
    });
  };

  // 渲染的地方 
  render() {
    const { isLoading } = this.state;
    // 回傳
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {/* 目前用的有兩種，靠中LoginMiddleView、靠右LoginView，此專案是靠中。 */}
        <LoginMiddleView handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default connect(
  // 包store的東西
  (state) => ({
    class: state.class,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        setToken: UserActions.setToken,
        login: UserActions.login,
      },
      dispatch,
    ),
  // 再渲染上方定義好的畫面或元素
)(LoginScreen);
