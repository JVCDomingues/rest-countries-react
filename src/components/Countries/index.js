import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

const Countries = () => {
    const [countries, setCountries] = useState([]); //all countries
    const [inputCountry, setInputCountry] = useState(''); 
    const [filteredCountry, setFilteredCountry] = useState([]); //one country
    const [region, setRegion] = useState(''); //selected regions
    const [countriesByRegion, setCountriesByRegion] = useState([]); //all countries by region

    //states to control whether to show or not the components depending on the request
    const [showAll, setShowAll] = useState(true);
    const [showFiltered, setShowFiltered] = useState(false);
    const [showByRegion, setShowByRegion] = useState(false);

    const history = useHistory();

    const delayedQuery = useRef(
        debounce(e => {
            setInputCountry(e);
        }, 1000)
    ).current;  

    useEffect(() => {
        async function loadCountries() {
            const response = await api.get('all');
            console.log(response.data);
            setCountries(response.data);
        }

        loadCountries();
        setShowAll(true);
        setShowFiltered(false);
        setShowByRegion(false);
    }, []);

    useEffect(() => {
        async function getCountry() {
            const response = await api.get(`name/${inputCountry}`);

            console.log(response.data);
            setFilteredCountry(response.data);

        }
        
        getCountry();
        setShowFiltered(true);
        setShowAll(false);
        setShowByRegion(false);
    }, [inputCountry]);

    useEffect(() => {
        async function getCountriesByRegion() {
            const response = await api.get(`region/${region}`);

            setCountriesByRegion(response.data);
        } 

        getCountriesByRegion();
        setShowByRegion(true);
        setShowFiltered(false);
        setShowAll(false);
    }, [region]);

    function handleInputChange(event) {
        delayedQuery(event.target.value);
    }

    function handleSelect(event) {
        const region = event.target.value;
        setRegion(region);
    }

    function handleFlagClick(country) {
        history.push(`detail/${country.toLowerCase()}`);
    }

    return (
        <div className="container">
            <div className="fields">
                <input 
                    type="text" 
                    name="country" 
                    id="country" 
                    placeholder="Search for a country..."
                    onChange={handleInputChange}
                />
                <select name="region" id="region" onChange={handleSelect}>
                    <option value="all">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>

            {showAll ? (
                <div className="countries">
                    {countries.map(country => (
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
            ) : null}

            {showFiltered ? (
                <div className="filtered-country">
                    {filteredCountry.map(country => (
                        <article key={country.name} className="country">
                        <img src={country.flag} alt="Country flag" onClick={() => handleFlagClick(country.name)}/>
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
            ) : null}

            {showByRegion ? (
                <div className="filtered-country">
                    {countriesByRegion.map(country => (
                        <article key={country.name} className="country">
                        <img src={country.flag} alt="Country flag" onClick={() => handleFlagClick(country.name)}/>
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
            ) : null}
        </div>
    )
}

export default Countries;