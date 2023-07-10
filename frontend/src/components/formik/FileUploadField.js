import React from 'react';
import PropTypes from 'prop-types';
import { Uploader } from 'components/form';
import Field from './Field';

const FileUploadField = ({
  field,
  form,
  label,
  sublabel,
  rightIcon,
  helpText,
  labelProps,
  onChangeFile,
  ...otherProps
}) => {
  const handleChange = v => {
    form.setFieldValue(field.name, v.cdnUrl);

    if (onChangeFile) {
      onChangeFile(v);
    }
  };

  return (
    <Field
      form={form}
      name={field.name}
      label={label}
      sublabel={sublabel}
      helpText={helpText}
      labelProps={labelProps}
      render={() => (
        <Uploader onChange={handleChange} value={field.value} {...otherProps} />
      )}
    />
  );
};

FileUploadField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  rightIcon: PropTypes.node,
  label: PropTypes.string,
  sublabel: PropTypes.string,
  helpText: PropTypes.string,
  labelProps: PropTypes.object,
  onChangeFile: PropTypes.func
};

export default FileUploadField;
