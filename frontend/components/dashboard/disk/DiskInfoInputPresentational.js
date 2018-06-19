import React from 'react';
import PropTypes from 'prop-types';

import octicons from 'octicons';

const DiskInfoInputPresentational = (p) => {
  // Check if authority-levels allow for editMode
  if (!p.authority || p.authority > 2 || p.editMode === false) {
    let pencil;
    // Check if authority-levels allow for entering editMode
    if (!(!p.authority || p.authority > 2)) {
      pencil = (
        <button
          type="button"
          className="btn btn-sm btn-secondary float-right"
          onClick={() => { p.enterEditMode(); }}
          dangerouslySetInnerHTML={{ __html: octicons.pencil.toSVG({ width: '1em', height: '1em' }) }}
        />
      );
    }

    return (
      <div>
        {p.customText}
        {pencil}
      </div>
    );
  }

  // Onclick save saveChanges
  // oninputchange setstate inputvalue

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        aria-label="Custom message"
        value={p.editText}
        onChange={p.setEditText}
        disabled={p.disabled}
      />
      <span className="input-group-btn">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => { p.exitEditMode(); }}
          dangerouslySetInnerHTML={{ __html: octicons.x.toSVG({ width: '1em', height: '1em' }) }}
          disabled={p.disabled}
        />
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => { p.saveCustomText(); }}
          dangerouslySetInnerHTML={{ __html: octicons.check.toSVG({ width: '1em', height: '1em' }) }}
          disabled={p.disabled}
        />
      </span>
    </div>
  );
};

DiskInfoInputPresentational.propTypes = {
  authority: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  enterEditMode: PropTypes.func.isRequired,
  exitEditMode: PropTypes.func.isRequired,
  customText: PropTypes.string.isRequired,
  editText: PropTypes.string.isRequired,
  setEditText: PropTypes.func.isRequired,
  saveCustomText: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DiskInfoInputPresentational;
