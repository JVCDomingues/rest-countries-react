import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Countries}/>
                <Route path="/detail/:country" component={CountryDetail}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;