import React from 'react';
import { Breadcrumb } from 'antd';

import { Images, Colors } from 'src/Theme';

const styles = {
    root: {
      flexGrow: 1,
      height: '100%',
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    pageHeader: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 28px',
      border: '1px solid #ddd',
      boxShadow: '0px 2px 2px 0px #ddd',
      margin: '0px 0px 10px 0px'
    },
};


class PageHeader extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        {/* page 標題與麵包屑 */}
        <div style={styles.pageHeader}>
          <h2 style={{fontSize: '24px'}}>公司管理</h2>
          <div style={{fontSize: '16px'}}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="">首頁</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>公司管理</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div >
    );
  }
}

export default PageHeader;
