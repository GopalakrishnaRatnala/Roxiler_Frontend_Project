import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import './index.css'; 

class TransactionsPieChart extends Component {
    state = {
        chartData: {}
    };

    componentDidMount() {
        this.fetchChartData();
    }

    componentDidUpdate(prevProps) {
        const { formattedMonth } = this.props;
        if (prevProps.formattedMonth !== formattedMonth) {
            this.fetchChartData();
        }
    }

    fetchChartData = async () => {
        try {
            const { formattedMonth } = this.props;
            const response = await fetch(`https://roxiler-project-4.onrender.com/pie-chart/${formattedMonth}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const chartData = this.processData(data);
            this.setState({ chartData }, this.createChart);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    processData = (data) => {
        const labels = data.map(item => item.category);
        const counts = data.map(item => item.itemCount);
        const colors = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
        ];

        return {
            labels: labels,
            datasets: [{
                label: 'Number of Items',
                data: counts,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }]
        };
    };

    createChart = () => {
        const { chartData } = this.state;
        const ctx = document.getElementById('pieChart');
        
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Transactions by Category'
                    }
                }
            }
        });
    };

    render() {
        return (
            <div className="pie-chart-container">
                <h2>Transactions Pie Chart</h2>
                <div className="canvas-container">
                    <canvas id="pieChart"></canvas>
                </div>
            </div>
        );
    }
}

export default TransactionsPieChart;
