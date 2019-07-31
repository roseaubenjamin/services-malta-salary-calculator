import './counter.css';

import calculate from './calculate';
import Tableaux from './Tableaux';
import Charts from './Charts';
import { Range } from 'react-range';
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
			values: [1000] ,
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
    	let checked = event.target.checked ; 
    	if ( checked ) 
			return this.setState({ isBornBefore: true }, () => {
			    this.setState({ isAdult: true }, () => {
				    this.calculate();
				});
			});
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
		let checked = event.target.checked ; 
    	if ( ! checked ) 
			return this.setState({ isBornBefore: false }, () => {
			    this.setState({ isAdult: false }, () => {
				    this.calculate();
				});
			});
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

	handleSliderChange( values ){
		
		this.setState({ values }, () => {
		    this.setState({ slary: values }, () => {
			    this.calculate();
			})
		})

	}

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
	                <div className="col-12">
		                <div>
		                	<div className="salary-input">
		                		<div className="salary-input-content">
		                			<input min="1000" type="number" name="slary" value={this.state.slary} onChange={this.handleInputChange.bind(this)} />
		                		</div>
		                		<div className="salary-input-uniter">Euro</div>
		                	</div>
		               		<div className="ranger-calculator">
		               			<Range
							        step={100}
							        min={1000}
							        max={300000}
							        values={this.state.values}
							        onChange={this.handleSliderChange.bind(this)}
							        renderTrack={({ props, children }) => (
							          <div
							            {...props}
							            style={{
							              ...props.style,
							              height: '6px',
							              width: '100%',
							              backgroundColor: '#ccc'
							            }}
							          >
							            {children}
							          </div>
							        )}
							        renderThumb={({ props }) => (
							          <div
							            {...props}
							            style={{
							              ...props.style,
							              height: '42px',
							              width: '42px',
							              backgroundColor: '#999'
							            }}
							          />
							        )}
							    />
		               		</div>
		                </div>
					</div>
                </div>
                <div className="separator"></div>
                <div className="calculator-focused row">
                	<div className="col-12 col-sm-7">
						<div className="calculator-filter">
							<div className="">
								<label className="container-input">
							        <input
							        	type="checkbox"
							            checked={this.state.isStudent}
							            onChange={this.handleStudentChange.bind(this)}
							        />
							        <span className="checkmark"></span>
							        <span>Are you a student?</span>
						        </label>
						        <label className="container-input">
							        <input
							        	type="checkbox"
							            checked={this.state.isAdult}
							            onChange={this.handleAdultChange.bind(this)}
							        />
							        <span className="checkmark"></span>
							        <span>Are you over 18 years old?</span>
						        </label>
						        <label className="container-input">
							        <input
							        	type="checkbox"
							            checked={this.state.isBornBefore}
							            onChange={this.handleBornBeforeChange.bind(this)}
							        />
							        <span className="checkmark"></span>
							        <span>Were you born before 31st December 1961?</span>
						        </label>
							</div>
							<div className="checkStatus genre-radio btn-group btn-group-toggle">
								<label className={this.state.selectedOption === 'single' ?  `btn btn-secondary `+ "active" :  `btn btn-secondary `+ ""}>
						            <input onChange={this.handleStatusChange.bind(this)} type="radio" value="single" checked={this.state.selectedOption === 'single'} />
						            Single
						        </label>
						        <label className={this.state.selectedOption === 'married' ?  `btn btn-secondary `+ "active" :  `btn btn-secondary `+ ""}>
						            <input onChange={this.handleStatusChange.bind(this)} type="radio" value="married" checked={this.state.selectedOption === 'married'} />
						            Married
						        </label>
						        <label className={this.state.selectedOption === 'parent' ?  `btn btn-secondary `+ "active" :  `btn btn-secondary `+ ""}>
						            <input onChange={this.handleStatusChange.bind(this)} type="radio" value="parent" checked={this.state.selectedOption === 'parent'}/>
						            Parent
						        </label>
							</div>
						</div>
				    </div>
				    <div className="col-12 col-sm-5">
						<div className="calculator-chart" >
							{this.readyValue( <Charts data={ this.state.resultat } /> )}
						</div>
					</div>
                </div>
                <div className="separator"></div>
                <div className="row">
                	<div className="col-12">
		                <div className="calculator-tableaux">
		                	{this.readyValue( <Tableaux data={ this.state.resultat } /> )}
		                </div>
                	</div>	
				</div>
                <div className="separator"></div>
            </div>
        );
    }
}


export default Calculator;
