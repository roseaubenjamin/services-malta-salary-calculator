import './counter.css';

import calculate from './calculate';
import Tableaux from './Tableaux';
import Charts from './Charts';

const { Component } = wp.element;

class Calculator extends Component {
    constructor(props) {

        super(props);

        this.state = {
            slary : 1000 ,
            isAdult : false,
			isBornBefore : false,
			isStudent : false,
			selectedOption : 'single',
			resultat : {} ,
        };

    }

    calculate(){

		var etat = {
			isAdult : this.state.isAdult  ,
			isBornBefore : this.state.isBornBefore ,
			isStudent : this.state.isStudent
		};
		let resultat = calculate( this.state.slary , etat , this.state.selectedOption ) ;
		this.setState({ resultat: { ...resultat } });
    }

    componentDidMount(){
    	this.calculate();
    }

    handleBornBeforeChange ( event ) {
    	this.setState({ isBornBefore: event.target.checked }, () => {
		    this.calculate();
		});
	}

    handleStudentChange ( event ) {
    	this.setState({ isStudent: event.target.checked }, () => {
		    this.calculate();
		});
    }

	handleAdultChange ( event ) {
    	this.setState({ isAdult: event.target.checked }, () => {
		    this.calculate();
		});
    }

    handleInputChange( event ) {
    	var result = 100 * Math.ceil(event.target.value / 100);
    	this.setState({slary: event.target.value}, () => {
		    this.calculate();
		});
	}

	handleStatusChange( event ) {
    	this.setState({selectedOption: event.target.value}, () => {
		    this.calculate();
		});
	}

	readyValue( html ){
		return this.state.resultat && this.state.resultat.yearly ? html : '' ; 
	}

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
	                <div className="col-12">
		                <div className="salary-input">
							<input type="number" name="slary" value={this.state.slary} onChange={this.handleInputChange.bind(this)} />
		                </div>
					</div>
                </div>
                <div className="calculator-focused row">
                	<div className="col-12 col-sm-6">
						<div className="calculator-filter">
							<div className="">
								<label>
							        <input
							        	type="checkbox"
							            checked={this.state.checked}
							            onChange={this.handleStudentChange.bind(this)}
							        />
							        <span>Are you a student?</span>
						        </label>
						        <label>
							        <input
							        	type="checkbox"
							            checked={this.state.checked}
							            onChange={this.handleAdultChange.bind(this)}
							        />
							        <span>Are you over 18 years old?</span>
						        </label>
						        <label>
							        <input
							        	type="checkbox"
							            checked={this.state.checked}
							            onChange={this.handleBornBeforeChange.bind(this)}
							        />
							        <span>Were you born before 31st December 1961?</span>
						        </label>
							</div>
							<div className="genre-radio">
								<div className="radio">
							        <label>
							            <input onChange={this.handleStatusChange.bind(this)} type="radio" value="single" checked={this.state.selectedOption === 'single'} />
							            Single
							        </label>
						        </div>
						        <div className="radio">
							        <label>
							            <input onChange={this.handleStatusChange.bind(this)} type="radio" value="married" checked={this.state.selectedOption === 'married'} />
							            Married
							        </label>
						        </div>
						        <div className="radio">
							        <label>
							            <input onChange={this.handleStatusChange.bind(this)} type="radio" value="parent" checked={this.state.selectedOption === 'parent'}/>
							            Parent
							        </label>
						        </div>
							</div>
						</div>
				    </div>
				    <div className="col-12 col-sm-6">
						<div className="calculator-chart" >
							{this.readyValue( <Charts data={ this.state.resultat } /> )}
						</div>
					</div>
                </div>
                <div className="row">
                	<div className="col-12">
		                <div className="calculator-tableaux">
		                	{this.readyValue( <Tableaux data={ this.state.resultat } /> )}
		                </div>
                	</div>	
				</div>
            </div>
        );
    }
}


export default Calculator;
