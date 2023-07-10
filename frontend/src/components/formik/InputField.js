import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import { Input } from '@rebass/forms';
import Field from './Field';

const InputField = ({
  field,
  form,
  label,
  sublabel,
  rightIcon,
  helpText,
  labelProps,
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
        <Box css={{ position: 'relative' }}>
          <Input
            variant={hasError ? 'invalidInput' : 'input'}
            {...field}
            {...otherProps}
          />
          {rightIcon && (
            <Box css={{ position: 'absolute', right: 16, top: 12 }}>
              {rightIcon}
            </Box>
          )}
        </Box>
      )}
    />
  );
};

InputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  rightIcon: PropTypes.node,
  label: PropTypes.string,
  sublabel: PropTypes.string,
  helpText: PropTypes.string,
  labelProps: PropTypes.object,
  submitCount: PropTypes.number
};

export default InputField;
