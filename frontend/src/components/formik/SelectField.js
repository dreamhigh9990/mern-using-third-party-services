import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@rebass/forms';
import Field from './Field';

const SelectField = ({
  field,
  form,
  label,
  sublabel,
  helpText,
  labelProps,
  options,
  ...otherProps
}) => {
  return (
    <Field
      form={form}
      name={field.name}
      label={label}
      sublabel={sublabel}
      helpText={helpText}
      labelProps={labelProps}
      render={({ hasError }) => (
        <Select
          variant={hasError ? 'invalidSelect' : 'input'}
          {...field}
          {...otherProps}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
    />
  );
};

SelectField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  label: PropTypes.string,
  sublabel: PropTypes.string,
  helpText: PropTypes.string,
  options: PropTypes.array,
  labelProps: PropTypes.object,
  submitCount: PropTypes.number
};

export default SelectField;
