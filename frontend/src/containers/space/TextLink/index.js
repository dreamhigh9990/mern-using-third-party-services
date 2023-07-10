import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import { Input, Select } from '@rebass/forms';
import { Button } from 'components/common';
import { FormGroup, Label, InvalidFeedback, HelpText } from 'components/form';
import COUNTRY_CODES from 'constants/country-code.json';
import request from 'api/request';

const COUNTRIES = COUNTRY_CODES.map(c => ({
  label: `${c.name} ${c.dial_code}`,
  value: `${c.code}#${c.dial_code}`
}));

function TextLink({ space }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('US#+1');
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!phone) {
      setError('Phone number is required');
      return;
    }

    const phoneNumber = phone.replace(/[^0-9]/g, '');

    if (phone.length !== 9) {
      setError('Invalid phone number');
    }

    const countryCode = code.split('#')[1];

    setError(null);
    setLoading(true);
    const resp = await request('space', 'sendSms', [
      space._id,
      `${countryCode}${phoneNumber}`
    ]);
    if (resp.ok) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
      }, 3000);
    } else {
      setError('There was problem sending link');
    }
    setLoading(false);
  };

  return (
    <FormGroup>
      <Label>Need this link on your phone? We’ll text it to you.</Label>
      <Flex
        alignItems={['stretch', 'center']}
        flexDirection={['column', 'row']}
      >
        <Select
          mr={[0, 10]}
          mb={[10, 0]}
          width={[1, 200]}
          variant="input"
          value={code}
          onChange={e => setCode(e.target.value)}
        >
          {COUNTRIES.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Input
          mr={[0, 10]}
          mb={[10, 0]}
          flex={1}
          width={[1, 'initial']}
          placeholder="(201) 555-5555"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <Button
          width={[1, 160]}
          px={15}
          icon="far fa-mobile"
          variant="secondarySquareSm"
          loading={loading}
          onClick={handleSend}
        >
          {sent ? 'Sent!' : 'Get Link'}
        </Button>
      </Flex>
      <HelpText>We'll send you a text containing the link.</HelpText>
      {error && <InvalidFeedback>{error}</InvalidFeedback>}
    </FormGroup>
  );
}

TextLink.propTypes = {
  space: PropTypes.object
};

export default TextLink;
