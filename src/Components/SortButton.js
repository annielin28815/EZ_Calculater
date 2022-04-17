import React from 'react';
import PropTypes from 'prop-types';
import { Colors, Images } from 'src/Theme';
import { Button } from 'antd';

class SortButton extends React.Component {
  static propTypes = {
    handleSearch: PropTypes.func,
    placeholder: PropTypes.string,
    src: PropTypes.string,
    buttonText: PropTypes.string,
    handleClick: PropTypes.func,
    htmlType: PropTypes.string,
    style: PropTypes.object,
    currentIndex: PropTypes.number,
    length: PropTypes.number,
    handleClickUp: PropTypes.func,
    handleClickDown: PropTypes.func,
  };

  static defaultProps = {
    handleClick: () => { },
    buttonText: '新增',
    src: Images.btnFlower,
    htmlType: '',
    style: {},
    currentIndex: 0,
    length: 0,
    handleClickUp: () => { },
    handleClickDown: () => { },
  };

  render() {
    const {
      src, // Button 圖片位址
      buttonText, // 按鈕文字
      handleClick,
      htmlType,
      style,
      currentIndex,
      length,
      handleClickUp,
      handleClickDown,
    } = this.props;

    return (
      <div
        style={{
          // width: '20px',
          height: '24px',
          borderRadius: '5px',
          letterSpacing: '2px',
          backgroundColor: 'transparent',
          border: '0px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          ...style,
        }}
      >
        <img
          src={Images.upIcon}
          onClick={(currentIndex === length - 1 && currentIndex === 0) || currentIndex === 0 ? () => { } : handleClickUp}
          style={{
            width: '10px',
            height: '8px',
            marginBottom: '4px',
            cursor: (currentIndex === length - 1 && currentIndex === 0) || currentIndex === 0 ? 'not-allowed' : 'pointer',
            display: 'block',
            // margin: 'auto',

          }} />
        <img
          src={Images.downIcon}
          onClick={currentIndex === length - 1 ? () => { } : handleClickDown}
          style={{
            width: '10px',
            height: '8px',
            cursor: (currentIndex === length - 1) ? 'not-allowed' : 'pointer',
            margin: 'auto',
          }}
        />
      </div>
    );
  }
}

export default SortButton;