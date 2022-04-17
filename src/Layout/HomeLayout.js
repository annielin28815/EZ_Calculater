import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb  } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './HomeLayout.css';
import { Images, Colors, } from 'src/Theme';


const { Header, Content, Footer } = Layout;



const styles = {

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

  }

  render() {
    const {} = this.props;

    const {} = this.state;

    let menuList = [
      {
        key: '1',
        img: Images.superUser,
        title: '功能介紹',
        isShow: true
      },
      {
        key: '2',
        img: Images.superUser,
        title: '響應式計算機',
        isShow: true
      },
      {
        key: '3',
        img: Images.superUser,
        title: '色碼轉換器',
        isShow: true
      },
    ];

    return (
      <Layout className="layout">
        <div
          style={{
            color: '#1C1C1C',
            margin: '0px 50px',
            padding: '20px 0px',
            fontSize: '30px',
            fontWeight: 'bolder',
            textAlign: 'center',
          }}
        >
          前端萬能計算機
        </div>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {menuList.map((item) => {
              return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
            })}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>功能介紹</Breadcrumb.Item>
            <Breadcrumb.Item>響應式尺寸換算器</Breadcrumb.Item>
            <Breadcrumb.Item>色碼轉換器</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content" style={{height: document.documentElement.clientHeight - 350}}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ling Design ©2022</Footer>
      </Layout>
    );
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) =>
    bindActionCreators(
      {

      },
      dispatch,
    ),
)(HomeLayout);
