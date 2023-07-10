import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Box } from 'rebass';
import { Button, AlertPanel } from 'components/common';
import { InputField } from 'components/formik';
import request from 'api/request';
import schema from './schema';

class EmailForm extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }

  handleSubmit = async (values, actions) => {
    const { onSubmit, ignoreUserCheck } = this.props;

    this.setState({ error: null });
    actions.setSubmitting(true);
    const resp = await request('auth', 'checkEmail', [values.email]);
    actions.setSubmitting(false);

    if (ignoreUserCheck || resp.ok) {
      return onSubmit(values, resp.ok);
    }

    this.setState({ error: 'User does not exist' });
  };

  renderForm = ({ isValid, isSubmitting }) => {
    const { buttonText, formProps } = this.props;
    const { error } = this.state;

    return (
      <Box as={Form} {...formProps}>
        <AlertPanel children={error} />
        <Field component={InputField} name="email" type="email" label="Email" />
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
        initialValues={{ email: '', ...initialValues }}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
        render={this.renderForm}
      />
    );
  }
}

EmailForm.propTypes = {
  formProps: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  ignoreUserCheck: PropTypes.bool,
  buttonText: PropTypes.string
};

EmailForm.defaultProps = {
  buttonText: 'Submit'
};

export default EmailForm;
