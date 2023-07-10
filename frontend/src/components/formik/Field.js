import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { FormGroup, Label, InvalidFeedback, HelpText } from 'components/form';

const Field = ({
  form,
  name,
  render,
  label,
  sublabel,
  labelProps,
  helpText,
  hideError,
  submitCount
}) => {
  const submitted = submitCount > 0;
  const touched = submitted || getIn(form.touched, name);
  let error = getIn(form.errors, name);
  const hasError = !!(touched && error);
  if (typeof error === 'object') {
    [error] = Object.values(error);
  }

  return (
    <FormGroup>
      {label && (
        <Label {...labelProps}>
          {label}
          {sublabel && (
            <Label variant="sublabel" mb={0} ml={3}>
              {sublabel}
            </Label>
          )}
        </Label>
      )}
      {render({ hasError, error })}
      {!hideError && (
        <InvalidFeedback>{hasError ? error : null}</InvalidFeedback>
      )}
      {helpText && <HelpText>{helpText}</HelpText>}
    </FormGroup>
  );
};

Field.propTypes = {
  render: PropTypes.func,
  name: PropTypes.string,
  form: PropTypes.object,
  hideError: PropTypes.bool,
  labelProps: PropTypes.object,
  label: PropTypes.string,
  sublabel: PropTypes.string,
  helpText: PropTypes.any,
  submitCount: PropTypes.number
};

Field.defaultProps = {
  labelProps: {}
};

export default Field;
