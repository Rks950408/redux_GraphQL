import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/favoriteSlice';

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`;

const CountryList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p className="text-primary">Loading...</p>;
  if (error) return <p className="text-danger">Error loading countries</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🌍 Country List</h2>
      <ul className="list-group mb-4">
        {data.countries.slice(0, 10).map(country => (
          <li key={country.code} className="list-group-item d-flex justify-content-between">
            <span>{country.name} {country.emoji}</span>
            <button className="btn btn-sm btn-primary" onClick={() => dispatch(addFavorite(country))}>
              ➕ Add to Favorites
            </button>
          </li>
        ))}
      </ul>

      <h3>⭐ Favorite Countries</h3>
      <ul className="list-group">
        {favorites.map(fav => (
          <li key={fav.code} className="list-group-item">
            {fav.name} {fav.emoji}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
