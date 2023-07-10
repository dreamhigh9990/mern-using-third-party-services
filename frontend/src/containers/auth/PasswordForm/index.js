import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Box } from 'rebass';
import { Button, AlertPanel } from 'components/common';
import { InputField } from 'components/formik';
import schema from './schema';

class PasswordForm extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }

  handleSubmit = async (values, actions) => {
    const { onSubmit } = this.props;

    this.setState({ error: null });
    try {
      await onSubmit(values);
    } catch (e) {
      console.error(e);
      this.setState({ error: 'Password is wrong' });
    }
    actions.setSubmitting(false);
  };

  renderForm = ({ isValid, isSubmitting }) => {
    const { buttonText, formProps } = this.props;
    const { error } = this.state;

    return (
      <Box as={Form} {...formProps}>
        <AlertPanel children={error} />
        <Field
          component={InputField}
          name="password"
          type="password"
          label="Password"
        />
        <Button loading={isSubmitting} disabled={!isValid} type="submit">
          {buttonText}
        </Button>
      </Box>
    );
  };

  render() {
    const { initialValues } = this.props;

    return (
      <Formik
        initialValues={{ password: '', ...initialValues }}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
        render={this.renderForm}
      />
    );
  }
}

PasswordForm.propTypes = {
  formProps: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  buttonText: PropTypes.string
};

PasswordForm.defaultProps = {
  buttonText: 'Submit'
};

export default PasswordForm;
