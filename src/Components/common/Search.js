import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import { Colors, Images } from 'src/Theme';
import { Input } from 'antd';

class Search extends React.Component {
  static propTypes = {
    handleSearch: PropTypes.func,
    placeholder: PropTypes.string,
    searchStyle: PropTypes.object,
    value: PropTypes.string,
  };

  static defaultProps = {
    handleSearch: () => { },
    placeholder: '搜尋',
    searchStyle: {},
    value: '',
  };

  render() {
    const {
      handleSearch,
      placeholder,
      searchStyle,
      value,
    } = this.props;

    return (
      <Input
        onChange={handleSearch}
        placeholder={placeholder}
        className="searchInput"
        suffix={<img src={Images.search} style={{ width: '18px', height: '18px' }} />}
        style={{
          // width: '456px',
          height: '36px',
          backgroundColor: 'white',
          color: 'black',
          borderRadius: '2px',
          border: '1px solid #C6DB9E',
          ...searchStyle,
        }} />
    );
  }
}

export default Search;
