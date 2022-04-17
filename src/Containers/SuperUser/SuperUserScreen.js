import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, Breadcrumb, Form, Popconfirm } from 'antd';
import { DataTable, Search } from 'src/Components';
import { Images, Colors } from 'src/Theme';

import "./SuperUserScreen.css"
import { UserActions, SuperUserActions } from 'src/Stores';
import FormInput from '../../Components/common/FormInput';


let timer = null;
const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  pageHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    border: '1px solid #ddd',
    boxShadow: '0px 2px 2px 0px #ddd',
    margin: '0px'
  },
  contentHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '16px',
    padding: '0 16px'
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
  settingBtnStyle: {
    backgroundColor: Colors.main,
    height: '36px',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '4px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    minHeight: 'calc(100vh - 36px)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '20px',
    fontWeight: 'bold',
    overflowY: 'hidden'
  },
  contentTitle: {
    marginLeft: '5px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  spaceStyle: {
    width: '100%',
    height: '65px',
    backgroundColor: '#fff',
    boxShadow: '0px 5px 20px rgba(176,195,211,0.16)',
    borderRadius: '4px',
    padding: '0px',
    // marginTop: '30px',
  },
  searchArea: {
    width: '456px',
    height: '36px',
    borderRadius: '2px',
    border: '1px solid #C6DB9E',
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchInputStyle: {
    border: 'none'
  },
  searchBtnStyle: {
    background: '#fff',
    border: 'none'
  },
  contentHeaderDetail: {
    backgroundColor: Colors.green200,
    padding: '36px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center',
  }
};

class SuperUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
      searchValue: '',
      userId: '',
      nowPaging: 1,
      currentSuperUser: '',
      createModalVisible: false,
      updateModalVisible: false,
      updatePasswordModalVisible: false,
      bordered: false,
      currentData: {},
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    const { getSuperUserList, paging } = this.props;
    const { searchValue } = this.state;

    

    this.setState({
      isLoading: true
    })
    const callback = () => {
      this.setState({
        isLoading: false,
      });
    }

    getSuperUserList(callback, paging, searchValue);
  }

  // 新增的modal
  createModal() {
    this.setState({
      createModalVisible: true,
      isLoading: false,
    });
  }

  // 編輯(update)的modal
  updateModal(record) {
    this.setState({
      updateModalVisible: true,
      currentData: record,
      isLoading: false,
    });
  }

  handleChange = (pagination, filters, sorter) => {
    const { getSuperUserList, paging } = this.props;
    const { searchValue, currentCard, currentAction } = this.state;
    if (paging.now_page !== pagination.current) {
      this.setState({
        isLoading: true,
      });
      const callback = () => {
        this.setState({
          isLoading: false,
        });
      }
      getSuperUserList(callback, { now_page: pagination.current, page_size: 10 }, searchValue,)
    }
  };

  handleSearch = (e) => {
    const { getSuperUserList, paging } = this.props;
    const { currentSwipeRecord, searchValue } = this.state;

    let value = e.target.value;

    const handleGetSuperUserList = (data) => {

      this.setState({
        isLoading: true,
      });
      const callback = () => {
        this.setState({
          isLoading: false,
        });
      }
      
      if (value === '') {
        getSuperUserList(callback, { now_page: 1, page_size: 10 }, '');
        this.setState({
          searchValue: '',
        });
      } else {
        getSuperUserList(callback, { now_page: 1, page_size: 10 }, data);
        this.setState({
          searchValue: data,
        });
      }
    }
    function debounce(func, delay = 250) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, delay)
    }
    debounce(handleGetSuperUserList, 500);

  }

  handleDelete = (record) => {
    const { getSuperUserList, deleteSuperUser, paging } = this.props;
    const { searchValue } = this.state;

    // let current = Math.floor(paging.total / paging.page_size) + 1;

    const callback = () => {
      this.setState({
        isLoading: false,
      })
    }

    let current = ((paging.total -1) / 10 ) +1 === paging.now_page              ? paging.now_page - 1 : paging.now_page   ||
                  Math.ceil(paging.total / paging.page_size) >= paging.now_page ? paging.now_page     : paging.now_page -1;

    this.setState({
      isLoading: true,
    }, () => {
      deleteSuperUser(
        [record.user_id], callback, { ...paging, now_page: current,}, searchValue
      );
    });
  }

  onCreateFinish = (values) => {
    const { getSuperUserList, createSuperUser, paging } = this.props;
    const { searchValue } = this.state;

    this.setState({
      isLoading: true,
    });
    const callback = () => {
      this.setState({
        createModalVisible: false,
        isLoading: false,
        searchValue: '',
      });
    };

    createSuperUser({...values, password: '0000'}, callback);
  };

  onUpdateFinish = (values) => {
    const { getSuperUserList, updateSuperUser, paging } = this.props;
    const { currentData, searchValue } = this.state;

    const callback = () => {
      this.setState({
        updateModalVisible: false,
        isLoading: false,
        // currentData: record,
      });
    };

    updateSuperUser({...values, user_id: currentData.user_id}, callback, {...paging, now_page: paging.now_page}, searchValue);
  }

  renderCreateModal = () => {
    return (
      <Modal
        title="基本資料"
        centered  // 垂直水平置中
        visible={this.state.createModalVisible}
        onCancel={() => this.setState({ isLoading: false, createModalVisible: false })}
        footer={null}
      >
        <Form
          initialValues={{
            account: '',
            name: '',
            cellPhone: '',
            email: '',
          }}
          onFinish={this.onCreateFinish}
        >
          <FormInput 
            title= "帳號"
            propName='account'
            placeholder="請輸入帳號"
            rule={[
              { required: true, message: '請輸入帳號' },
              { max: 100, message: '最大值為100' },
              { min: 3, message: '最小值為3' },
            ]}
          />
          <div style={{marginTop: '-8px',marginBottom: '8px', color: '#035A18'}}>※預設密碼為0000</div>
          <FormInput 
            title= "姓名"
            propName='user_name'
            placeholder="請輸入姓名"
            // required 這種會提示「後端」的錯誤訊息
            // requiredErrorMessage="請輸入姓名"
            rule={[ // 記得公司的是用rule 非rules
              { required: true, message: '請輸入姓名' }, // 這種會提示「前端」的錯誤訊息
              { max: 50, message: '最大值為50' }
            ]}
          />
          <FormInput 
            title= "E-mail"
            propName='user_email'
            placeholder="請輸入E-mail"
            rule={[
              { required: true, message: '請輸入E-mail' },
              { max: 100, message: '最大值為100' },
              { type: 'email', message: '格式錯誤！'  },
            ]}
          />
          <FormInput 
            title= "手機"
            propName='user_phone'
            placeholder="請輸入手機"
            rule={[
              { required: true, message: '請輸入手機' },
              { max: 15, message: '最大值為15' }
            ]}
          />
        <Form.Item>
            <div style={styles.modalFooter}>
            <Button 
              key="submit" 
              onClick={this.handleOk} 
              style={{
                ...styles.successBtnStyle,
                marginRight: '16px'
              }} 
              htmlType="submit"
            >
              確認
            </Button>
            <Button 
              key="back" 
              onClick={() => this.setState({ isLoading: false,createModalVisible: false })} 
              style={styles.cancelBtnStyle} 
            >
              取消
            </Button>
          </div>
        </Form.Item>
        </Form>
      </Modal>
    )
  }

  renderUpdateModal = () => {
    const { currentData } = this.state;
    return(
      <Modal
        title="基本資料"
        centered  // 垂直水平置中
        visible={this.state.updateModalVisible}
        onCancel={() => this.setState({ isLoading: false, updateModalVisible: false })}
        footer={null}
      >
        <Form
          initialValues={{
            ...currentData,
          }}
          onFinish={this.onUpdateFinish}
        >
          <FormInput 
            title= "帳號"
            propName='account'
            placeholder="record.account"
            disabled
          />
          <FormInput 
            title= "姓名"
            propName='user_name'
            placeholder="record.user_name"
            rule={[
              { required: true, message: '請輸入姓名' },
              { max: 50, message: '最大值為50' }
            ]}
          />
          <FormInput 
            title= "E-mail"
            propName='user_email'
            placeholder="record.user_email"
            rule={[
              { required: true, message: '請輸入E-mail' },
              { max: 100, message: '最大值為100' },
              { type: 'email', message: '格式錯誤！'  },
            ]}
          />
          <FormInput 
            title= "手機"
            propName='user_phone'
            placeholder=""
            rule={[
              { required: true, message: '請輸入手機' },
              { max: 15, message: '最大值為15' }
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
            <Button key="back" onClick={() => this.setState({ isLoading: false,updateModalVisible: false })} style={styles.cancelBtnStyle} >
              取消
            </Button>
          </div>
        </Form.Item>
        </Form>
      </Modal>
    )
  }

  renderCustomChildren = () => {
    const { superUserList } = this.props;
    const { searchValue } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{width: '458px'}}>
              <Search handleSearch={this.handleSearch} value={searchValue} style={{width: '458px'}}  />
            </div>

            <div>
              <Button style={styles.successBtnStyle} onClick={() => this.createModal()}>
                新增
              </Button>
            </div>

        </div>
      </div>
    )
  }

  render() {
    const {
      userList,
      superUserList,
      paging,
      user_id,
    } = this.props;

    const {
      currentData,
      isLoading,
      searchValue,
      createModalVisible,
      updateModalVisible,
      updatePasswordModalVisible,
    } = this.state;
    
    const columns = [
      {
        width: '335px',
        title: '帳號',
        dataIndex: 'account',
        key: 'account',
        align: 'center',
        render: (value)=>
          <div style={{lineHeight: '67px'}}>{value}</div>
      },
      {
        width: '335px',
        title: '姓名',
        dataIndex: 'user_name',
        key: 'user_name',
        align: 'center',
      },
      ,
      {
        width: '335px',
        title: '手機',
        dataIndex: 'user_phone',
        key: 'user_phone',
        align: 'center',
      },
      {
        width: '335px',
        title: 'E-mail',
        dataIndex: 'user_email',
        key: 'user_email',
        align: 'center',
      },
      {
        width: '247px',
        title: '操作',
        dataIndex: 'setting',
        key: 'setting',
        align: 'center',
        render: (value, record) =>
          <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center',}}>
            <Button 
              onClick={() => this.updateModal(record)}
              style={{...styles.settingBtnStyle, marginLeft: '15px', cursor: 'pointer'}} 
            >
              <img
                src={Images.editIcon}
                style={{marginRight: '8px'}}
              />
              <div>編輯</div>
            </Button>
           
            {/* 如果是本人就可點刪除的btn(原則上不可刪自己) */}
            <Popconfirm 
              title="確定要刪除?" 
              okText="確認"
              cancelText="取消"
              icon={<img src={Images.warningIcon} />}
              onConfirm={() => this.handleDelete(record)}
            >
              <Button 
                style={{
                  ...styles.settingBtnStyle, 
                  marginLeft: '15px', 
                  background: 'red',
                  cursor: (user_id === record.user_id) ? 'not-allowed' : 'pointer' 
                }} 
              >
                <img
                  src={Images.deleteIcon}
                  style={{
                    marginRight: '8px',
                    cursor: (user_id === record.user_id) ? 'not-allowed' : 'pointer'
                  }}
                />
                <div>刪除</div>
              </Button>
            </Popconfirm>
          </div>
      },
    ];

    {/* page 標題與麵包屑 */}
    const PageHeader = () => (
      <div style={styles.pageHeader}>
        <div style={{fontSize: '24px'}}>管理員</div>
        <div style={{fontSize: '16px'}}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="">首頁</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>管理員</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    )

    return (
      <div style={{ width: '100%', height: '100%'}}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            {/* page 標題與麵包屑 */}
            <PageHeader />

            {/* content 內容表格 */}
            <div style={styles.content}>
              <DataTable
                column={columns}
                data={superUserList}
                isRowSelection={false}
                showCreateButton={false}
                showDeleteButton={false}
                showSearch={false}
                hasPagination={true}
                scroll={{
                  y: document.documentElement.clientHeight - 368,
                }}
                hasCustomChildren
                customChildren={this.renderCustomChildren()}
                searchValue={searchValue}
                isLoading={isLoading}
                handleSearch={this.handleSearch}
                handleChange={this.handleChange}
                paging={paging}
              />
            </div>
          </div>
        </div>

        {/* 新增的modal */}
        {createModalVisible && this.renderCreateModal()}

        {/* 編輯密碼的modal */}
        {updatePasswordModalVisible && this.renderUpdatePasswordModal()}

        {/* 編輯的modal */}
        {updateModalVisible && this.renderUpdateModal()}

      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    userList: state.user.userList,
    superUserList: state.superUser.list,
    paging: state.superUser.paging,
    user_id: state.user.user_id,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getUserList: UserActions.getUserList,
        deleteUser: UserActions.deleteUser,
        getSuperUserList: SuperUserActions.getSuperUserList,
        createSuperUser: SuperUserActions.createSuperUser,
        updateSuperUser: SuperUserActions.updateSuperUser,
        deleteSuperUser: SuperUserActions.deleteSuperUser,
      },
      dispatch,
    ),
)(SuperUserScreen);