import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './styles.css';

const CountryDetail = ({ match }) => {
    const [country, setCountry] = useState([]);
    const params = match.params.country;

    useEffect(() => {
        async function getCountry() {
            const response = await api.get(`name/${params}`)
            setCountry(response.data);
        }

        getCountry();
    }, [params])

    return (
         <div className="country">
             {country.map(country => (
                <article key={country.name} className="country">
                  <img src={country.flag} alt="Country flag"/>
                  <section className="content">
                      <span className="country_name">{country.name}</span>
                      <div className="info">
                          <p>Population: {country.population.toLocaleString('pt-BR')}</p>
                          <p>Region: {country.region}</p>
                          <p>Capital: {country.capital}</p>
                      </div>
                  </section>
                </article>
             ))}
         </div>
    );
}

export default CountryDetail;