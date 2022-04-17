import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Badge, Dropdown, Form, Button, Modal, Input } from 'antd';
import { MenuOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2';
import './HomeLayout.css';
import { UserActions } from 'src/Stores';
import { Images, Colors,  } from 'src/Theme';
import hashHistory from 'src/utils/HashHistory';
import { removeUserInformation } from 'src/utils/localStorage';
import FormInput from '../Components/common/FormInput';
import _ from 'lodash';


const { Header, Sider, Content, Footer } = Layout;

let menuList = [
  {
    key: '/carousel',
    img: Images.company,
    title: '儀表板',
    isShow: true
  },
  {
    key: '/maintainer',
    img: Images.dashboard,
    title: '儀表板',
    isShow: true
  },
  {
    key: '/company',
    img: Images.company,
    title: '公司管理',
    isShow: true
  },
  {
    key: '/superUser',
    img: Images.superUser,
    title: '管理員',
    isShow: true
  },
  {
    key: '/card',
    img: Images.ticketCard,
    title: '票卡管理',
    isShow: true
  },
  {
    key: '/cardMember',
    img: Images.member,
    title: '會員管理',
    isShow: true
  },
  {
    key: '/swipeRecord',
    img: Images.swipeRecord,
    title: '刷卡記錄',
    isShow: true
  },
  {
    key: '/user',
    img: Images.personal,
    title: '個人設置',
    isShow: false
  },
];

const styles = {
  infoStyle: {
    width: '250px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  iconStyle: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  logoArea: {
    background: '#3D3D3B',
    display: 'flex',
    justifyContent: 'space-between',
    height: '65px',
    padding: '16px 0 0 24px',
  },
  logo: {
    height: '37px',
  },
  menu: {
    width: '250px',
    height: 'calc(100vh - 65px - 38px)',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center',
  },
  successBtnStyle: {
    backgroundColor: Colors.main,
    height: '36px',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '4px',
  },
  cancelBtnStyle: {
    backgroundColor: '#fff',
    border: '1px solid #0D902C',
    height: '36px',
    color: '#0D902C',
    fontSize: '16px',
    borderRadius: '4px',
  },
  inputStyle: {
    width: '470px',
    height: '40px',
    borderRadius: '5px'
  },
  click_menu: {
    background: '#c59d00',
  },
  normal_menu: {
    background: 'transparent',
  },
};

class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      collapsed: false,
      currentKey: '',
      updateModalVisible: false,
      updatePasswordModalVisible: false,
      currentKey: '',
    };
  }

  static propTypes = {
    children: PropTypes.object,
  };

  componentDidMount = () => {
    const { history, getUserInfo, user, userInfo } = this.props;

    const callback = (value) => {
      this.setState({
        isLoading: false,
      });
    }

    if (window.location.hash.indexOf('carousel') > -1) {
      this.setState({
        currentKey: '/carousel',
      });
    } else if (window.location.hash.indexOf('maintainer') > -1) {
      this.setState({
        currentKey: '/maintainer',
      });
    } else if (window.location.hash.indexOf('company') > -1) {
      this.setState({
        currentKey: '/company',
      });
    } else if (window.location.hash.indexOf('superUser') > -1) {
      this.setState({
        currentKey: '/superUser',
      });
    } else if (window.location.hash.indexOf('cardMember') > -1 || window.location.hash.indexOf('cardMember/detail') > -1) {
      this.setState({
        currentKey: '/cardMember',
      });
    } else if (window.location.hash.indexOf('card') > -1) {
      this.setState({
        currentKey: '/card',
      });
    } else if (window.location.hash.indexOf('swipeRecord') > -1) {
      this.setState({
        currentKey: '/swipeRecord',
      });
    }

    getUserInfo(user.user_id, callback);

  }

  handleClick = () => {
    const {
      setToken,
    } = this.props;
    Swal.fire({
      title: '是否要登出',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '確定',
    }).then((result) => {
      if (result.value) {
        removeUserInformation();
        window.location.reload()
      }
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleMenuClick = (item) => {
    this.setState({ currentKey: item.key });
    hashHistory.push(item.key);
  }

  // 基本資料 state
  updateModal() {
    this.setState({
      updateModalVisible: true,
      isLoading: true,
    });
  }
  // 基本資料 modal
  renderUpdateModal = () => {
    const { user } = this.props;
    return(
      <Modal
        title="基本資料"
        centered  // 垂直水平置中
        visible={this.state.updateModalVisible}
        onCancel={() => this.setState({ updateModalVisible: false })}
        footer={null}
      >
        <Form
          initialValues={{
            ...user,
          }}
          onFinish={this.onUpdateFinish}
        >
          <FormInput 
            title= "帳號"
            propName='account'
            placeholder="請輸入帳號"
            disabled
          />
          <FormInput 
            title= "姓名"
            propName='user_name'
            placeholder="請輸入姓名"
            required
            requiredErrorMessage="請輸入姓名"
            rules={[
              { required: true, message: '請輸入姓名' },
              { max: 50, message: '最大值為50' }
            ]}
          />
          <FormInput 
            title= "手機"
            propName='user_phone'
            placeholder="請輸入手機"
            rules={[
              { required: true, message: '請輸入手機' },
              { max: 15, message: '最大值為15' }
            ]}
          />
          <FormInput 
            title= "E-mail"
            propName='user_email'
            placeholder="請輸入E-mail"
            required
            requiredErrorMessage="請輸入E-mail"
            rules={[
              { required: true, message: '請輸入E-mail' },
              { max: 100, message: '最大值為100' },
              { type: 'email', message: '格式錯誤！'  },
            ]}
          />
        <Form.Item>
          <div style={styles.modalFooter}>
            <Button key="submit" onClick={this.handleOk} 
              style={{
                ...styles.successBtnStyle,
                marginRight: '16px'
              }} 
              htmlType="submit"
            >
              確認
            </Button>
            <Button key="back" onClick={() => this.setState({ updateModalVisible: false })} style={styles.cancelBtnStyle} >
              取消
            </Button>
          </div>
        </Form.Item>
        </Form>
      </Modal>
    )
  }
  // click 基本資料的確認btn
  onUpdateFinish = (values) => {
    const { user, updateUser, getUserInfo } = this.props;
    const { userId } = this.state;

    const callback = (value) => {
      this.setState({
        updateModalVisible: false,
        userId: user.user_id,
      });
    };

    const callback2 = (value) => {
      this.setState({
        isLoading: false,
        userId: value.user_id,
        // areaData: this.props.user.area
      });
      // this.handleAreaList(value.country)
    }

    this.setState({
      isLoading: true,
    }, () => {
      updateUser({...values, user_id: user.user_id}, callback);
      getUserInfo(user.user_id, callback2);
    });
  }


  // 變更密碼 state
  updatePasswordModal() {
    this.setState({
      updatePasswordModalVisible: true,
      isLoading: true,
    });
  }
  // 變更密碼 modal
  renderUpdatePasswordModal = () => {
    const { user } = this.props;
    return (
      <Modal
        title="安全設置"
        centered  // 垂直水平置中
        visible={this.state.updatePasswordModalVisible}
        onOk={() => this.setState({ updatePasswordModalVisible: false }) }
        onCancel={() => this.setState({ updatePasswordModalVisible: false }) }
        footer={null}
      >
        <Form
          initialValues={{
            ...user,
          }}
          onFinish={this.onUpdatePasswordFinish}
        >
          <Form.Item
            name="old_password"
            colon={false}
            label="舊密碼"
            rules={[{ required: true, message: '請輸入舊密碼！' }]}
          >
            <Input.Password
              placeholder='請輸入舊密碼'
              style={styles.inputStyle}
            />
          </Form.Item>

          <Form.Item
            name="new_password"
            colon={false}
            label="新密碼"
            rules={[{ required: true, message: '請輸入新密碼！' }]}
          >
            <Input.Password
              placeholder='請輸入新密碼'
              style={styles.inputStyle}
            />
          </Form.Item>

          <Form.Item
            name="new_password_confirm"
            colon={false}
            label="密碼確認"
            rules={[{ required: true, message: '請輸入密碼確認' }]}
          >
            <Input.Password
              placeholder='請輸入密碼確認'
              style={styles.inputStyle}
            />
          </Form.Item>

          <Form.Item>
              <div style={styles.modalFooter}>
              <Button key="submit" onClick={this.handleOk} 
                style={{
                  ...styles.successBtnStyle,
                  marginRight: '16px'
                }} 
                htmlType="submit"
              >
                確認
              </Button>
              <Button key="back" onClick={() => this.setState({ updatePasswordModal: false })} style={styles.cancelBtnStyle} >
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
  // click 變更密碼的確認btn
  onUpdatePasswordFinish = (values) => {
    const { user, updateUserPassword } = this.props;
    const callback = () => {
      this.setState({
        updatePasswordModalVisible: false,
      });
    };
    updateUserPassword({...values, user_id: user.user_id}, callback);
  }


  render() {
    const { children, user, } = this.props;

    const {
      updateModalVisible,
      updatePasswordModalVisible,
      currentKey,
    } = this.state;

    if (user.role_id !== 'M001') {
      if(user.role_id === 'M003' || user.role_id === 'M004') {
        menuList = menuList.filter((item) => item.key !== '/superUser');
      }
      menuList = menuList.filter((item) => item.key !== '/carousel');
    }

    let menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={() => this.updateModal()}>
            <span style={{ display: 'flex', justifyContent: 'center' }} >
              基本資料
            </span>
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <a onClick={() => this.updatePasswordModal()}>
            <span style={{ display: 'flex', justifyContent: 'center' }}>變更密碼</span>
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.handleClick} >
          <span style={{ display: 'flex', justifyContent: 'center' }}>登出</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{ width: '100vw', height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={250} style={{ overflowY: 'hidden' }}>
          <div className="logo" style={styles.logoArea} >
            <div
              onClick={
                user.role_id === 'M001' ?
                () => hashHistory.push(`/carousel`) :
                () => hashHistory.push(`/maintainer`)
              }
              style={{cursor: 'pointer'}}
            >
              <img src={require('../Assets/Image/logo.png')} alt="Logo" style={styles.logo}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'end'}}>
              <img src={require('../Assets/Image/side-bg-top.png')} alt="side-bg-top" 
                style={{ width: '75px'}}
              />
            </div>

          </div>
          <div style={styles.menu}>
            {/* menu */}
            <div style={{overflow: 'hidden'}}>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                {menuList.map((item) => {
                  if (item.isShow) {
                    return (
                      // <Menu.Item 
                      //   key={item.key} 
                      //   onClick={() => this.handleMenuClick(item)} 
                      // >
                      //     <img src={item.img} style={{ width: '30px', marginRight: '20px' }} />
                      //     <span style={{ fontSize: '22px'}}>{item.title}</span>
                      // </Menu.Item>

                      <Menu.Item
                        onClick={() => this.handleMenuClick(item)}
                        key={item.key}
                        icon={
                          <img src={item.img} 
                               style={{ width: '30px', marginRight: '16px' }
                        }/>}
                        style={currentKey === item.key ? styles.click_menu : styles.normal_menu}
                      >
                        <span style={{ fontSize: '22px'}}>{item.title}</span>
                      </Menu.Item>
                    )
                  }
                })}
              </Menu>
            </div>
            {/* menu's img */}
            <div>
              <img src={require('../Assets/Image/side-bg.png')} alt="side-bg" 
                style={{
                  width: '75px',
                  height: '100%',
                }}
              />
            </div>
          </div>
          <Footer style={{backgroundColor: '#3A3A38',
                          padding: '0px',
                          display: 'flex',
                          alignItems: 'center',
                          height: '38px'}}>
            <div style={{width: '100%'}}></div>
          </Footer>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background-top">
            {React.createElement(MenuOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <div style={styles.infoStyle}>
              {/* <Badge dot>
                <img src={Images.notify}
                  style={styles.iconStyle} />
              </Badge>
              <img src={Images.setting} style={styles.iconStyle} /> */}
              <Dropdown overlay={menu} trigger={['click']} >
                <a className="ant-dropdown-link" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={Images.avatar} style={{ width: '35px', height: '35px', marginRight: '5px' }} />
                  {user.user_name}
                  <DownOutlined style={{ marginLeft: '10px' }} />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content
            className="site-layout-background-content"
            style={{
              // minHeight: 280,
              overflowY: 'auto'
            }}
          >
            {children}
          </Content>
          <Footer style={{backgroundColor: '#3A3A38',
                          padding: '0px',
                          display: 'flex',
                          alignItems: 'center',
                          height: '38px'}}
          >
            <div style={{
                          textAlign: 'center',
                          color: 'white',
                          width: '100%', 
                        }}
            >
              Copyright 2021 證知道了
            </div>
          </Footer>
        </Layout>

        {/* 基本資料 modal 觸發條件 */}
        {updateModalVisible && this.renderUpdateModal()}
 
        {/* 變更密碼 modal 觸發條件 */}
        {updatePasswordModalVisible && this.renderUpdatePasswordModal()}

      </Layout>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    userList: state.user.setUser,
    userInfo: state.user.userInfo,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        setToken: UserActions.setToken,
        getUserInfo: UserActions.getUserInfo,
        updateUser: UserActions.updateUser,
        updateUserPassword: UserActions.changePassword,
      },
      dispatch,
    ),
)(HomeLayout);
