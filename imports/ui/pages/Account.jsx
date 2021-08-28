import React from 'react';
import styled from 'styled-components';
import Button from '@material-tailwind/react/Button';

export default function AccountPage({ user }) {
  return (
    <Container>
      <h1> Account Page </h1>
      <h2> {user?.profile?.name} </h2>
      <Button color="lightBlue" ripple="light">
        Sup Bitches
      </Button>
    </Container>
  );
}

const Container = styled.div`
  height: 80vh;
`;
