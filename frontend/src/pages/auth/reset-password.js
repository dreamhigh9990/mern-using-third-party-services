import React from 'react';
import { Text } from 'rebass';
import ResetPasswordForm from 'containers/auth/ResetPasswordForm';
import { AuthLayout } from 'containers/layout';
import request from 'api/request';
import history, { getQueryParam } from 'utils/history';

function ResetPassword() {
  const token = getQueryParam('token');
  const handleReset = async values => {
    const resp = await request('auth', 'resetPassword', [
      token,
      values.password
    ]);

    if (!resp.ok) {
      throw new Error(resp.data.message);
    }

    history.push('/auth/login');
  };

  return (
    <AuthLayout>
      <Text variant="pagetitle" mb={35}>
        Reset Password
      </Text>
      <ResetPasswordForm onSubmit={handleReset} />
    </AuthLayout>
  );
}

export default ResetPassword;
