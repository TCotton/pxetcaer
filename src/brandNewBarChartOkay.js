import React, { Component } from 'react';
import dummyData from './dummy-data.json';
import * as d3 from 'd3';
import './Barchart.css';

class BrandNewBarChartOkay extends Component {

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

		var margin = {top: 10, right: 25, bottom: 35, left: 40 }
		var width = 425 - margin.left - margin.right
		var height = 625 - margin.top - margin.bottom
		var svg = d3.select('.chart')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.call(responsivefy)
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		svg.append('rect')
			.attr('width', width)
			.attr('height', height)
			.attr('fill', 'lightblue')
			.attr('stroke', 'lightgreen')

		// draw xAxis
		var xScale = d3.scaleTime()
			.domain([new Date(2017,8,21,9,0), new Date(2017,8,21,10,0)])
			.range([0, width]);
		var xAxis = d3.axisBottom(xScale)
			.ticks(5)
			.tickSize(10)
			.tickPadding(5);
		svg.append('g')
			.attr('transform', `translate(${0}, ${height})`)
			.call(xAxis);

		// draw yAxis
		var yScale = d3.scaleLinear()
			.domain([0, 100])
			.range([height, 0])
		var yAxis = d3.axisLeft(yScale)
			.ticks(10)
			.tickSize(10)
			.tickPadding(10)
		svg.append('g')
			.attr('transform', `transform(${margin.left}, ${margin.top})`)
			.call(yAxis)


		function responsivefy(svg) {
			console.log('responsivy');
			// get container + svg aspect ratio
			var container = d3.select(svg.node().parentNode),
				width = parseInt(svg.style("width")),
				height = parseInt(svg.style("height")),
				aspect = width / height;

			// add viewBox and preserveAspectRatio properties,
			// and call resize so that svg resizes on inital page load
			svg.attr("viewBox", "0 0 " + width + " " + height)
				.attr("perserveAspectRatio", "xMinYMid")
				.call(resize);

			// to register multiple listeners for same event type,
			// you need to add namespace, i.e., 'click.foo'
			// necessary if you call invoke this function for multiple svgs
			// api docs: https://github.com/mbostock/d3/wiki/Selections#on
			d3.select(window).on("resize." + container.attr("id"), resize);

			// get width of container and resize svg to fit it
			function resize() {
				console.log('resize');
				var targetWidth = parseInt(container.style("width"));
				svg.attr("width", targetWidth);
				svg.attr("height", Math.round(targetWidth / aspect));
			}
		}

	}

	render () {

		return (
			<div className="chart" />
		);
	}
}

export default BrandNewBarChartOkay;
