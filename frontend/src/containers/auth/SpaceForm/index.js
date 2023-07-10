import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { Box } from 'rebass';
import { Button, AlertPanel } from 'components/common';
import { InputField, TextareaField, FileUploadField } from 'components/formik';
import schema from './schema';

class SpaceForm extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      photoFile: null
    };
  }

  handleSubmit = async (values, actions) => {
    const { onSubmit } = this.props;
    const { photoFile } = this.state;

    this.setState({ error: null });
    try {
      await onSubmit(values, photoFile);
    } catch (e) {
      console.error(e);
      this.setState({ error: e.message });
    }
    actions.setSubmitting(false);
  };

  renderForm = ({ isSubmitting }) => {
    const { buttonText, formProps } = this.props;
    const { error } = this.state;

    return (
      <Box as={Form} {...formProps}>
        <AlertPanel children={error} />
        <Field component={InputField} name="name" label="Memorial for" />
        <Field
          component={TextareaField}
          name="description"
          rows={3}
          maxLength={150}
          label="Tribute"
          sublabel="(Optional)"
          helpText="This will appear at the top of the memorial page. Limit 150 characters."
        />
        <Field
          component={FileUploadField}
          name="image"
          label="Photo"
          sublabel="(Optional)"
          onChangeFile={photoFile => this.setState({ photoFile })}
        />
        <Box mt={56}>
          <Button
            variant="primarySquare"
            loading={isSubmitting}
            type="submit"
            mr={[0, 8]}
            mb={[10, 0]}
          >
            {buttonText}
          </Button>
          <Button
            as={Link}
            to="/account-spaces"
            variant="cancel"
            disabled={isSubmitting}
            type="button"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  };

  render() {
    const { initialValues } = this.props;

    return (
      <Formik
        initialValues={{
          name: '',
          description: '',
          image: '',
          ...initialValues
        }}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
        render={this.renderForm}
      />
    );
  }
}

SpaceForm.propTypes = {
  formProps: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  buttonText: PropTypes.string
};

SpaceForm.defaultProps = {
  buttonText: 'Save'
};

export default SpaceForm;
