import React from 'react';
import PropTypes from 'prop-types';

import ajax from '../../../helpers/ajax';

import AttributeModalPresentational from './AttributeModalPresentational';
import AttributeChart from './AttributeChart';

class AttributeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [0], dataListPointer: 0 };
    this.dataListViewLength = 20;

    this.fetchData = this.fetchData.bind(this);
    this.changeDataListPointer = this.changeDataListPointer.bind(this);
  }

  componentWillMount() {
    this.fetchData(this.props.attributeId);
  }

  componentWillReceiveProps(newProps) {
    this.fetchData(newProps.attributeId);
  }

  fetchData(attributeId) {
    if (attributeId === 0) {
      this.setState(() => {
        return { data: [0] };
      });

      return false;
    }

    const diskId = this.props.diskId;

    ajax.getJson({
      url: `/api/v1/disk/${diskId}/attribute/${attributeId}/all`,
      successCallback: (json) => {
        this.setState({ data: json.sort((a, b) => { return b.time - a.time; }) });
      },
    });

    return true;
  }

  changeDataListPointer(moveForward) {
    if (moveForward === true) {
      this.setState((prevState) => {
        if (prevState.dataListPointer + this.dataListViewLength > prevState.data.length - 1) {
          return { dataListPointer: prevState.data.length - 1 - this.dataListViewLength };
        }
        return { dataListPointer: prevState.dataListPointer + this.dataListViewLength };
      });
    } else {
      this.setState((prevState) => {
        if (prevState.dataListPointer - this.dataListViewLength < 0) {
          return { dataListPointer: 0 };
        }
        return { dataListPointer: prevState.dataListPointer - this.dataListViewLength };
      });
    }
  }

  render() {
    const attributeIndex = this.props.attributeId === 0 ? -1 : this.props.attributes.findIndex((attribute) => {
      if (attribute.attr_id === this.props.attributeId) {
        return true;
      }

      return false;
    });

    const data = this.state.data;
    const attribute = attributeIndex === -1 ? {} : this.props.attributes[attributeIndex];

    return (
      <AttributeModalPresentational
        attribute={attribute}
        data={data}
        dataListPointer={this.state.dataListPointer}
        dataListViewLength={this.dataListViewLength}
        changeDataListPointer={this.changeDataListPointer}
      >
        <AttributeChart data={data} />
      </AttributeModalPresentational>
    );
  }
}

AttributeModal.propTypes = {
  diskId: PropTypes.string.isRequired,
  attributeId: PropTypes.number.isRequired,
  attributes: PropTypes.array.isRequired,
};

export default AttributeModal;
