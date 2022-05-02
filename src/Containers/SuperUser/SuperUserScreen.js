import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, Breadcrumb, Form, Popconfirm, Steps, Divider } from 'antd';
import { DataTable, Search } from 'src/Components';
import { Images, Colors } from 'src/Theme';

import "./SuperUserScreen.css"

const { Step } = Steps;
const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
};

class SuperUserScreen extends React.Component {
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

  componentDidMount() {
    const { getSuperUserList, paging } = this.props;
    const { searchValue } = this.state;

    // this.setState({
    //   isLoading: true
    // })
    // const callback = () => {
    //   this.setState({
    //     isLoading: false,
    //   });
    // }

  }

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };


  render() {
    const {
      userList,
      superUserList,
      paging,
      user_id,
    } = this.props;

    const { current } = this.state;


    return (
      <div style={{ width: '100%', height: '100%', padding: '0px 50px'}}>

        <Steps current={current} onChange={this.onChange}>
          <Step title="Step 1" description="This is a description." />
          <Step title="Step 2" description="This is a description." />
          <Step title="Step 3" description="This is a description." />
        </Steps>

      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    // superUserList: state.superUser.list,
    // paging: state.superUser.paging,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        // getSuperUserList: SuperUserActions.getSuperUserList,
        // createSuperUser: SuperUserActions.createSuperUser,
        // updateSuperUser: SuperUserActions.updateSuperUser,
        // deleteSuperUser: SuperUserActions.deleteSuperUser,
      },
      dispatch,
    ),
)(SuperUserScreen);