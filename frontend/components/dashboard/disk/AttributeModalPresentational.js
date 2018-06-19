import React from 'react';
import PropTypes from 'prop-types';

import { DiskTimeFormat } from '../../../helpers/dates';

const AttributeModalPresentational = (p) => {
  const attributeName = p.attribute.name || '';
  const attributeThresh = p.attribute.thresh || '';

  const attributeDataList = p.data[0] === 0 ? [] : p.data;
  const dataListPointer = p.dataListPointer;

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
            {p.children}
            <hr />
            <div className="table-responsive">
              <table className="table table-hover table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th>Time</th>
                    <th>Value</th>
                    <th>Raw</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    attributeDataList
                      .slice(dataListPointer, dataListPointer + p.dataListViewLength)
                      .map((v) => {
                        return (
                          <tr key={v.time}>
                            <td>{DiskTimeFormat(v.time)}</td>
                            <td>{v.value}</td>
                            <td>{v.raw}</td>
                          </tr>
                        );
                      })
                  }
                </tbody>
              </table>
            </div>
            <div className="text-center">
              <div className="btn-group" role="group" aria-label="Navigate table">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => { p.changeDataListPointer(false); }}
                  disabled={dataListPointer === 0}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => { p.changeDataListPointer(true); }}
                  disabled={dataListPointer + p.dataListViewLength > attributeDataList.length - 1}
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
};

AttributeModalPresentational.propTypes = {
  attribute: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  dataListPointer: PropTypes.number.isRequired,
  dataListViewLength: PropTypes.number.isRequired,
  changeDataListPointer: PropTypes.func.isRequired,
};

export default AttributeModalPresentational;
