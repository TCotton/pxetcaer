// set the dimensions and margins of the graph
var margin = {
		top: 70,
		right: 50,
		bottom: 100,
		left: 80
	},
	width = 1400 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

var parseTime = d3.timeParse( "%M:%S" );
var timeformat = d3.timeFormat( "%M:%S" );

// set the domains and ranges
var x = d3.scaleBand()
	.range( [ 0, width ] )
	.padding( [ 0.6 ] );

// temporal y-scale
var y = d3.scaleTime()
	.range( [ height, 0 ] );

var xAxis = d3.axisBottom( x );

var yAxis = d3.axisLeft( y )
	.ticks( 7 )
	.tickFormat( d3.timeFormat( "%M:%S" ) );

// Add main graph svg
var svg = d3.select( "#race_graph" )
	.append( "svg" )
	.attr( "width", width + margin.left + margin.right )
	.attr( "height", height + margin.top + margin.bottom );

// Add groups for main bar chart
var g0 = svg.append( "g" )
	.attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

function defaultFunction () {
	d3.json( "https://raw.githubusercontent.com/shanegibney/d3-Draft-Update-Data/master/data1.json", function( error, newdata ) {
		if( error ) throw error;
		data = newdata;

		data.forEach( function( d ) {
			d.racetime = parseTime( d.racetime );
			d.handicap = parseTime( d.handicap );
			d.clocktime = parseTime( d.clocktime );
			d.place = +d.place;
			d.points = +d.points;
			d.raceplace = +d.raceplace;
			d.timeplace = +d.timeplace;
		} )
		update();
	} );
}

function updateFunction () {
	d3.json( "https://raw.githubusercontent.com/shanegibney/d3-Draft-Update-Data/master/data2.json", function( error, newdata ) {
		if( error ) throw error;
		data = newdata;
		data.forEach( function( d ) {
			d.racetime = parseTime( d.racetime );
			d.handicap = parseTime( d.handicap );
			d.clocktime = parseTime( d.clocktime );
			d.place = +d.place;
			d.points = +d.points;
			d.raceplace = +d.raceplace;
			d.timeplace = +d.timeplace;
		} )
		update( data );
	} );
}

function update ( err, newdata ) {

	// set the domains
	x.domain( data.map( function( d ) {
		return d.name
	} ) );

	// set domain temporal y-scale
	y.domain( [ parseTime( '00:00' ), d3.max( data, function( d ) {
		return d.clocktime
	} ) ] );

	// Add the X Axis
	svg.select( ".x.axis" ).call( xAxis );
	svg.select( ".x.axis" ).remove();
	svg.append( "g" )
		.attr( "class", "x axis" )
		.attr( "transform", "translate(" + ( margin.left ) + "," + ( height + margin.top ) + ")" )
		.call( xAxis )
		.selectAll( "text" )
		.attr( "transform", "translate(-100,0)" )
		.style( "text-anchor", "end" )
		.style( "font", "7px times" )
		.attr( "class", function( d, i ) {
			return "groupText" + i + " xAxisText"
		} )
		.attr( "dx", "-.8em" )
		.attr( "dy", ".15em" )
		.attr( "transform", "rotate(-75)" );

	// Add the y axis on left
	svg.select( ".y.axis" ).remove();
	svg.append( "g" )
		.attr( "class", "y axis" )
		.attr( "transform", "translate(" + ( margin.left ) + "," + margin.top + ")" )
		.call( yAxis );

	var t = d3.transition()
		.duration( 4000 );

	// JOIN new data with old elements
	var newRects0 = g0.selectAll( ".bar" )
		.data( data, function( d ) {
			return d;
		} );

	// EXIT old elements not present in new data
	newRects0.exit()
		.transition( t )
		.attr( "x", function( d ) {
			return x( d.name );
		} )
		.attr( "y", function( d, i ) {
			return y( d.clocktime );
		} )
		.attr( "height", function( d, i ) {
			return height - y( d.clocktime )
		} )
		// .attr("width", x.bandwidth())
		.remove();

	// UPDATE old elements present in new data
	newRects0.attr( "x", function( d ) {
		return x( d.name );
	} )
		.attr( "y", function( d, i ) {
			return y( d.clocktime );
		} )
		.attr( "height", function( d, i ) {
			return height - y( d.clocktime )
		} )
		// .attr("width", x.bandwidth())
		.style( 'fill', 'gray' );

	// ENTER new elements present in new data
	newRects0.enter()
		.append( 'rect' )
		.attr( "x", function( d ) {
			return x( d.name );
		} )
		.attr( "y", function( d, i ) {
			return y( d.clocktime );
		} )
		.attr( "height", function( d, i ) {
			return height - y( d.clocktime )
		} )
		.attr( "width", x.bandwidth() )
		.style( 'fill', 'gray' )
		.attr( "class", function( d, i ) {
			return "group" + i + " bar"
		} );

}; //closes update() function

document.getElementById( "defaultInput" )
	.onclick = defaultFunction;
document.getElementById( "updateInput" )
	.onclick = updateFunction;
defaultFunction();

