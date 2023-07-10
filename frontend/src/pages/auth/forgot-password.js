import React, { useState } from 'react';
import { Box, Text } from 'rebass';
import ForgotPasswordForm from 'containers/auth/ForgotPasswordForm';
import { AuthLayout } from 'containers/layout';
import request from 'api/request';

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const handleForgot = async values => {
    const resp = await request('auth', 'requestResetPassword', [values.email]);

    if (!resp.ok) {
      throw new Error(resp.data.message);
    }

    setEmail(values.email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box maxWidth={630} mx="auto">
        <Text variant="h2" mb={20} textAlign="center">
          Reset link sent!
        </Text>
        <Text variant="h4" mb={20} textAlign="center">
          Now, please check your email for link to reset your password.
        </Text>
        <Text textAlign="center" variant="helper">
          {'Didn’t get an email at '}
          <Text fontWeight="bold" as="span">
            {email}
          </Text>
          {'? Check your spam folder or contact us at '}
          <Text
            variant="link"
            fontWeight={3}
            as="a"
            href="mailto:feedback@rembrance.com"
          >
            feedback@rembrance.com
          </Text>
        </Text>
      </Box>
    );
  }

  return (
    <AuthLayout>
      <Text variant="pagetitle" mb={35}>
        Reset Password
      </Text>
      <ForgotPasswordForm onSubmit={handleForgot} />
      <Text textAlign="center" mt={15} variant="helper">
        We’ll send you a link if we found your email address in our system.
      </Text>
    </AuthLayout>
  );
}

export default ForgotPassword;
