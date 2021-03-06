import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Barchart from './Barchart';
import BrandNewBarChartOkay from './brandNewBarChartOkay';
import TestingFauxReact from './TestingFauxReact';
import NewTestingFauxReact from './NewTestingFauxReact';
import BrandNewTheBarChart from './BrandNewTheBarChart';

class App extends Component {

	constructor ( props ) {
		super( props );
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
					<div className="svg-container">
						<BrandNewTheBarChart />
					</div>
        </header>
      </div>
    );
  }
}

export default App;
