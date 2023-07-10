import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { Box } from 'rebass';
import { Button, AlertPanel } from 'components/common';
import { InputField } from 'components/formik';
import schema from './schema';

class ForgotPasswordForm extends Component {
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
      this.setState({ error: e.message });
    }
    actions.setSubmitting(false);
  };

  renderForm = ({ isValid, isSubmitting }) => {
    const { formProps } = this.props;
    const { error } = this.state;

    return (
      <Box as={Form} {...formProps}>
        <AlertPanel children={error} />
        <Field
          component={InputField}
          name="email"
          label="Enter the email address you used to sign up for Rembrance."
          rightIcon={<i className="fal fa-envelope" />}
        />
        <Button
          my={15}
          variant="primarySquare"
          width={[1, 1]}
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
        >
          Send Link
        </Button>
      </Box>
    );
  };

  render() {
    const { initialValues } = this.props;

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          ...initialValues
        }}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
        render={this.renderForm}
      />
    );
  }
}

ForgotPasswordForm.propTypes = {
  formProps: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
};

export default ForgotPasswordForm;
