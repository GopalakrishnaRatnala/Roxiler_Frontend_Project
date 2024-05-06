import React, { Component } from 'react';

import "./index.css"

class TransactionsStatistics extends Component {
    state = {
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
    };

    componentDidMount() {
        this.fetchStatistics();
    }

    componentDidUpdate(prevProps) {
        const { formattedMonth } = this.props;
        if (prevProps.formattedMonth !== formattedMonth) {
            this.fetchStatistics();
        }
    }

    fetchStatistics = async () => {
        try {
            const { formattedMonth } = this.props;
            const response = await fetch(`https://roxiler-project-4.onrender.com/statistics/${formattedMonth}`);
            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }
            const data = await response.json();
            console.log(data)
            this.setState({
                totalSaleAmount: data.totalSaleAmount,
                totalSoldItems: data.totalSoldItems,
                totalNotSoldItems: data.totalNotSoldItems
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    render() {
        const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = this.state;

        return (
            <div className="statistics-container">
                <h2>Transactions Statistics</h2>
                <div className="statistics-box">
                    <div className="statistics-item">
                        <h3>Total Sale Amount</h3>
                        <p>Rs: {totalSaleAmount.toFixed(2)}/-</p>
                    </div>
                    <div className="statistics-item">
                        <h3>Total Sold Items</h3>
                        <p>{totalSoldItems}</p>
                    </div>
                    <div className="statistics-item">
                        <h3>Total Unsold Items</h3>
                        <p>{totalNotSoldItems}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransactionsStatistics;
