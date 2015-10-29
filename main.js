var $ = require('jquery');
var foundation = require('foundation');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var TimerMixin = require('react-timer-mixin');

var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link

var App = React.createClass({
	mixins: [TimerMixin],
	getInitialState: function() {
		return {'time' : Date.now(),'stoppedtime' : '00:00:00','timelist':[],'milies':''};
	},
	componentDidMount: function() {
		{this.get_time()}
		this.setInterval(
			() => { this.get_time() },
			 1 )
		;
	},
	get_time: function() {
		var dt = new Date();
		this.setState({'time' : dt.getHours() + " : " + dt.getMinutes() + " : " + dt.getSeconds() + " : " + dt.getMilliseconds()});
	},
	get: function() {
		this.setState({'stoppedtime' : $('.timenow').html()});
		var time = $('.timenow').html();
		var res = time.match(/\d{1,3}$/);
		var text = '';
		if( res < 100 || (res < 999 && res > 900) ){
			text = 'You were sooo close (need to do better though)';
		}else if( res == 0 ){
			text = 'Congratulations!! Nothing will happen as promised!';
		}
		else{
			text = 'So far away...';
		}		
		
		if(this.state.timelist.length > 4){
			this.state.timelist = [];
		}
		this.state.timelist.unshift($('.timenow').html() + ' ' + text);
	},
	render: function(){
		return (
			<div>
				<div className="row">
					<div className="text-centered large-12 columns large-centered">					
						<h1 className="timenow">{this.state.time}</h1>
					</div>
				</div>
				<div className="row">
					<div className="large-12 columns large-centered text-centered">
						<button onClick={this.get}>Stop!!</button>
					</div>
				</div>
				<div className="row">
					<div className="large-12 columns large-centered text-centered">
						<h2>{this.state.stoppedtime}</h2>
					</div>
				</div>
				<TimeList timelist={this.state.timelist}></TimeList>
			</div>
		)
	}
});

var TimeList = React.createClass({
	render: function() {
    var commentNodes = this.props.timelist.map(function (comment) {
			return (
				<div>
					<Time timelist = {comment}></Time>
				</div>
			);
		});
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
	
});

var Time = React.createClass({
	render: function(){
		return (
			<div className="row">
				<div className="large-12 columns text-centered">
					<p>{this.props.timelist}</p>
				</div>
			</div>
		);
	}
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('content'))
