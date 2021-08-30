import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const challengesQuery = gql`
  query Challenges {
    challenges {
      _id
      title
    }
  }
`;

export default function PracticePage() {
  const { data, loading, refetch } = useQuery(tasksQuery);
  return (
    <div>
      <h1> Practice Page </h1>
    </div>
  );
}
