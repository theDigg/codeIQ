import React from 'react';
import styled from 'styled-components';

export default function AccountPage({ user }) {
  return (
    <Container>
      <h1> Account Page </h1>
      <h2> {user?.profile?.name} </h2>
    </Container>
  );
}

const Container = styled.div`
  height: 80vh;
`;
