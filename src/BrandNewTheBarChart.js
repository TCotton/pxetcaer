import React, { Component } from 'react';
import dummyData from './dummy-data.json';
import * as d3 from 'd3';
import './Barchart.css';

class BrandNewTheBarChart extends Component {

	constructor ( props ) {
		super( props );
		this.createBarChart = this.createBarChart.bind( this );
	}

	componentDidMount () {
		this.createBarChart();
	}

	componentDidUpdate () {
		this.createBarChart();
	}

	createBarChart() {
		// create the SVG
		const node = this.node;
		const dataset = dummyData.barData;

		const margin = 60;
		const width = 530 - 2 * margin;
		const height = 225 - 2 * margin;
		const barPadding = 20;
		const hours = 24;

		const chart = d3.select(node).append('g')
			.attr('transform', `translate(${margin}, ${margin})`);

		const xScale = d3.scaleLinear()
			.domain([0, hours])
			.range([0, width]);

		const yScale = d3.scaleLinear()
			.domain([0, 25])
			.range([height, 0]);

		const xAxis = d3.axisTop(xScale)
			.ticks(hours)
			.tickFormat( function( hour, index ) {
				let now = new Date();
				now.setHours( hour, 0, 0, 0 );
				if(!(index % 6)) {
					return d3.timeFormat( "%H:%M" )( now );
				}
			});

		chart.append('g')
			.attr('transform', `translate(0, 0)`)
			.call(xAxis);

		const yAxis = d3.axisLeft(yScale)
			.ticks(5);

		chart.append('g')
			.call(yAxis);

		const makeYLines = () => d3.axisLeft()
			.scale(yScale);

		chart.append('g')
			.attr('class', 'grid')
			.call(makeYLines()
				.tickSize(-width, 0, 0)
				.tickFormat('')
				.ticks(5)
			);

		const makeXLines = () => d3.axisBottom()
			.scale(xScale)

		// vertical grid lines
		chart.append('g')
			.attr('class', 'grid')
			.attr('transform', `translate(0, ${height})`)
			.call(makeXLines()
				.tickSize(-height, 0, 0)
				.tickFormat('')
				.ticks(24)
			)

		const barGroups = chart.selectAll()
			.data(dataset)
			.enter()
			.append('g');

		barGroups
			.append('rect')
			.attr('class', 'bar')
			.attr('x', function(d, i) {
				return i * (width / hours);
			})
			.attr('y', function(d) {
				return height - (d * 4);
			})
			.attr('width', width / dataset.length - barPadding)
			.attr('height', function(d) {
				return d * 4;
			}).on('mouseover', function (d) {

			const xPosition = parseFloat(d3.select(this).attr('x'));
			const yPosition = parseFloat(d3.select(this).attr('y'));

			d3.select('#tooltip')
				.style('left', xPosition + 'px')
				.style('top', yPosition + 'px')
				.select('#value')
				.text(d);

			//Show the tooltip
			d3.select('#tooltip').classed('hidden', false);

		}).on('mouseout', function() {
			d3.select('#tooltip').classed('hidden', true);
		});
	}


	render () {
		const margin = 60;
		const width = 530 - 2 * margin;
		const height = 225 - 2 * margin;
		console.log(width);
		console.log(height);

		return (
			<React.Fragment>
				<svg
					height={height}
					width={width}
					xmlns='http://www.w3.org/2000/svg'
					version='1.1'
					ref={node => ( this.node = node )}
					/>
			</React.Fragment>
		);
	}
}

export default BrandNewTheBarChart;
// 410
// 105

/**
 * 		<svg className="svg-content-responsive" preserveAspectRatio="xMidYMid meet" viewBox="0 0 600 400">
 </svg>
 */
