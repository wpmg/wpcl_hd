import React from 'react';
import PropTypes from 'prop-types';

import ajax from '../../../helpers/ajax';
import { DiskTimeFormat } from '../../../helpers/dates';
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
    this.fetchData(this.props.attribute);
  }

  componentWillReceiveProps(newProps) {
    this.fetchData(newProps.attribute);
  }

  fetchData(attribute) {
    if (attribute.attr_id === 0) {
      this.setState(() => {
        return { data: [0] };
      });

      return false;
    }

    const diskId = this.props.diskId;
    const attributeId = attribute.attr_id;

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
    const data = this.state.data;
    const attribute = this.props.attribute;
    // console.log(attribute);

    const attributeName = attribute.name || '';
    const attributeThresh = attribute.thresh || '';

    const attributeDataList = data[0] === 0 ? [] : data;
    const dataListPointer = this.state.dataListPointer;

    return (
      <div className="modal" id="attributeModal">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{attributeName} <small>Thresh: {attributeThresh}</small></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <AttributeChart data={data} />
              <hr />
              <table className="table table-hover table-sm table-responsive">
                <thead className="thead-inverse">
                  <tr>
                    <th>Time</th>
                    <th>Value</th>
                    <th>Raw</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    attributeDataList
                      .slice(dataListPointer, dataListPointer + this.dataListViewLength)
                      .map((p) => {
                        return (
                          <tr key={p.time}>
                            <td>{DiskTimeFormat(p.time)}</td>
                            <td>{p.value}</td>
                            <td>{p.raw}</td>
                          </tr>
                        );
                      })
                  }
                </tbody>
              </table>
              <div className="text-center">
                <div className="btn-group" role="group" aria-label="Navigate table">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => { this.changeDataListPointer(false); }}
                    disabled={dataListPointer === 0}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => { this.changeDataListPointer(true); }}
                    disabled={dataListPointer + this.dataListViewLength > attributeDataList.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AttributeModal.propTypes = {
  diskId: PropTypes.string.isRequired,
  attribute: PropTypes.object.isRequired,
};

export default AttributeModal;
