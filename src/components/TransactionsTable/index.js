import React, { Component } from 'react';

import "./index.css"


class TransactionsTable extends Component {
    render() {
        const { 
            transactions,
            selectedMonth,
            searchText,
            onMonthChange,
            onSearchChange,
            onPreviousPage,
            onNextPage,
            
        } = this.props;

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return (
            <div className="container">
                <h2>Transactions Table</h2>
                <div className='inner-container'>
                    <label htmlFor="month-select">Select Month: </label>
                    <select 
                        id="month-select" 
                        value={selectedMonth} 
                        onChange={onMonthChange}
                    >
                        {months.map((month, index) => (
                            <option key={index + 1} value={index + 1}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={searchText}
                        onChange={onSearchChange}
                        placeholder="Search Transaction"
                    />
                </div>
                <table id="transactions-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold}</td>
                                <td><img src={transaction.image} alt="Product" style={{ width: '100px' }}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='button-group'>
                    <button id="previous-btn" onClick={onPreviousPage}>Previous</button>
                    <button id="next-btn" onClick={onNextPage}>Next</button>
                </div>
            </div>
        );
    }
}

export default TransactionsTable;
