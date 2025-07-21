import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import CountryList from './CountryList';
import { store } from '../redux/store';
import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_COUNTRIES,
    },
    result: {
      data: {
        countries: [
          { code: 'IN', name: 'India', emoji: '🇮🇳' },
          { code: 'US', name: 'United States', emoji: '🇺🇸' },
        ],
      },
    },
  },
];

test('renders loading state initially', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Provider store={store}>
        <CountryList />
      </Provider>
    </MockedProvider>
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
