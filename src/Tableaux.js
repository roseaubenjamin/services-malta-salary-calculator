
const { Component } = wp.element;

class Tableaux extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

    	let {
    		weekly , 
			monthly , 
			yearly , 
    	} = this.props.data ; 
    	
    	if ( !weekly ) return ( <div></div> )
    		
        return (
            <div>
                <table class="table shadow-box">
				    <tbody>
				        <tr>
				            <th></th>
				            <th class="legend">Weekly</th>
				            <th class="legend">Monthly</th>
				            <th class="legend yearly">Yearly</th>
				        </tr>

				        <tr class="income">
				            <td class="legend">Gross Salary</td>
				            <td class="result">
				                £<span class="gross-weekly-result">{weekly.gross.toFixed(2)}</span>
				            </td>
				            <td class="result">
				                £<span class="gross-monthly-result">{monthly.gross.toFixed(2)}</span>
				            </td>
				            <td class="result yearly">
				                £<span class="gross-yearly-result">{yearly.gross.toFixed(2)}</span>
				            </td>
				        </tr>

				        <tr class="expense">
				            <td class="legend">National Insurance</td>
				            <td class="result">
				                £<span class="ni-weekly-result">{weekly.ni.toFixed(2)}</span>
				            </td>
				            <td class="result">
				                £<span class="ni-monthly-result">{monthly.ni.toFixed(2)}</span>
				            </td>
				            <td class="result yearly">
				                £<span class="ni-yearly-result">{yearly.ni.toFixed(2)}</span>
				            </td>
				        </tr>

				        <tr class="expense">
				            <td class="legend">Tax</td>
				            <td class="result">
				                £<span class="tax-weekly-result">{weekly.tax.toFixed(2)}</span>
				            </td>
				            <td class="result">
				                £<span class="tax-monthly-result">{monthly.tax.toFixed(2)}</span>
				            </td>
				            <td class="result yearly">
				                £<span class="tax-yearly-result">{yearly.tax.toFixed(2)}</span>
				            </td>
				        </tr>

				        <tr class="income income--mini">
				            <td class="legend"><span class="cola-bonus-label">COLA / Bonus</span></td>
				            <td class="result">
				                £<span class="bonus-weekly-result">{weekly.bonus.toFixed(2)}</span>
				            </td>
				            <td class="result">
				                £<span class="bonus-monthly-result">{monthly.bonus.toFixed(2)}</span>
				            </td>
				            <td class="result yearly">
				                <div>£<span class="bonus-yearly-result">{yearly.bonus.toFixed(2)}</span></div>
				            </td>
				        </tr>

				        <tr class="income net-salary">
				            <td class="legend">Net Salary</td>
				            <td class="result">
				                £<span class="net-weekly-result">{weekly.net.toFixed(2)}</span>
				            </td>
				            <td class="result">
				                £<span class="net-monthly-result">{monthly.net.toFixed(2)}</span>
				            </td>
				            <td class="result yearly">
				                £<span class="net-yearly-result">{yearly.net.toFixed(2)}</span>
				            </td>
				        </tr>

				    </tbody>
				</table>
            </div>
        );
    }

}


export default Tableaux;