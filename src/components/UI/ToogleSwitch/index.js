import React from "react";
import PropTypes from "prop-types";
import s from './styles.module.scss';

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function.
The props name, small, disabled and optionLabels are optional.
Usage: <ToggleSwitch id={id} checked={value} onChange={checked => setValue(checked)}} />
*/

const ToggleSwitch = ({ id, name, checked, onChange, optionLabels, disabled }) => {
  function handleKeyPress(e){
    if (e.keyCode !== 32) return;

    e.preventDefault();
    onChange(!checked)
  }

  return (
    <div className={s.toggleSwitch}>
      <input
        type="checkbox"
        name={name}
        className={s.toggleSwitchCheckbox}
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        />
        {id ? (
          <label className={s.toggleSwitchLabel}
                 htmlFor={id}
                 tabIndex={ disabled ? -1 : 1 }
                 onKeyDown={ (e) => { handleKeyPress(e) }}>
            <span
              className={
                disabled
                  ? `${s.toggleSwitchInner} ${s.toggleSwitchDisabled}`
                  : s.toggleSwitchInner
              }
              data-yes={optionLabels[0]}
              data-no={optionLabels[1]}
              tabIndex={-1}
            />
            <span
              className={
              disabled
              ? `${s.toggleSwitchSwitch} ${s.toggleSwitchDisabled}`
              : s.toggleSwitchSwitch
              }
              tabIndex={-1}
            />
          </label>
        ) : null}
      </div>
    );
}

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ["Yes", "No"],
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  disabled: PropTypes.bool
};

export default ToggleSwitch;