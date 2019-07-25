
import Chart from 'chart.js/dist/Chart.min.js';

const { Component } = wp.element;

let data = {
    datasets: [{
        data: [ 0 , 0 , 0 ], 
        backgroundColor: [
            "#ff6384",
            "#4bc0c0",
            "#ffcd56",
        ]
    }],
    labels: [
        'N.I',
        'Tax',
        'Salary'
    ]
} ;

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pie : null ,
            
        };
    }

    drawPie(){

        let { yearly } = this.props.data ; 
        let NI = (( yearly.ni * 100 ) / yearly.gross).toFixed(2); 
        let TAX = (( yearly.tax * 100 ) / yearly.gross).toFixed(2); 
        let SALARY = (( yearly.net * 100 ) / yearly.gross).toFixed(2); 

        this.setData( NI , TAX , SALARY ) ;  

    }

    setData( NI , TAX , SALARY ){

        data.datasets.forEach(function(dataset) {
            dataset.data = dataset.data = [ NI , TAX , SALARY ] ;
        });

        if ( this.state.pie ) return this.state.pie.update();
        this.setDraw();

    }

    setDraw () {

        let options = { 
            legend: { 
                labels: { 
                    usePointStyle: true  
                } 
            }
        } 

        var ctx = document.getElementById('myChart');
        if ( !ctx ) return !1 ; 
        
        var myChart = new Chart(ctx, {
            type: 'pie',
            data ,
            options
        });

        this.setState({ pie: myChart }, () => {
            this.state.pie.update();
        });

    }

    componentDidMount(){
        this.drawPie() ; 
    }

    componentDidUpdate() {
      this.drawPie();
    }

    render() {

        return (
            <div>
                <canvas id="myChart" width="90" height="90"></canvas>
            </div>
        );
    }

}


export default Charts;