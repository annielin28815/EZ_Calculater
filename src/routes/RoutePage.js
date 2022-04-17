import React, { Fragment } from 'react';
import { Switch, Redirect, Route, HashRouter } from 'react-router-dom';

import HomeLayout from 'src/Layout/HomeLayout';
import SuperUserScreen from 'src/Containers/SuperUser/SuperUserScreen';


class RouterPage extends React.Component {
  render() {
    const { role_id } = this.props;
    
    return (
      <HomeLayout>
        <HashRouter>
          <Switch>
            <Route exact path="/superUser" component={SuperUserScreen} />
            <Redirect from="/" to="/superUser" />
          </Switch>
        </HashRouter>
      </HomeLayout>
    )
  }
}

class LoginRoutes extends React.Component {
  render() {    
    return (
      <Fragment>
        <RouterPage />
      </Fragment>
    );
  }
}

export default LoginRoutes;