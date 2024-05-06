import React from 'react';
import { Component } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from "./components/TransactionsStatistics";

import  TransactionsBarChart from "./components/TransactionsBarChart";
import TransactionsPieChart from "./components/TransactionsPieChart"

import "./App.css"

class App extends Component{
  state = {
    transactions: [],
    selectedMonth: 3,
    searchText: '',
    currentPage: 1,
    formattedMonth: '03'
};

months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

componentDidMount() {
    this.fetchTransactions();
}

componentDidUpdate(prevProps, prevState) {
    const { selectedMonth, currentPage} = this.state;
    if (
        prevState.selectedMonth !== selectedMonth ||
        prevState.currentPage !== currentPage ||
        prevState.searchText !== this.state.searchText
    ) {
      this.updateFormattedMonth();
        this.fetchTransactions();
    }
}

updateFormattedMonth = () => {
  const { selectedMonth } = this.state;
  const formattedMonth = selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth;
  this.setState({ formattedMonth }, this.fetchTransactions);
}

fetchTransactions = async () => {
    try {
        const { formattedMonth, currentPage, searchText } = this.state;
        const response = await fetch(`https://roxiler-project-4.onrender.com/transactions/${formattedMonth}?search_q=${searchText}&page=${currentPage}&per_page=10`);
        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        console.log(data)
        this.setState({ transactions: data });
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
};

handleMonthChange = (e) => {
    this.setState({ selectedMonth: e.target.value }, this.updateFormattedMonth);
};

handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
};

handlePreviousPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
};

handleNextPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
};

  render(){
    const { transactions, selectedMonth, searchText, currentPage, formattedMonth } = this.state;
    console.log(formattedMonth, selectedMonth)
    return(
      <div className="container">
        <div className="section">
          <div className="table-container">
            <TransactionsTable
              transactions={transactions}
              selectedMonth={selectedMonth}
              searchText={searchText}
              currentPage={currentPage}
              onMonthChange={this.handleMonthChange}
              onSearchChange={this.handleSearchChange}
              onPreviousPage={this.handlePreviousPage}
              onNextPage={this.handleNextPage}
              formattedMonth={formattedMonth}
            />
          </div>
        </div>

        <div className="section">
          <div className="stats-container">
            <TransactionsStatistics formattedMonth={formattedMonth} selectedMonth={selectedMonth} />
          </div>
        </div>

        <div className="section">
          <div className="chart-container">
            <TransactionsBarChart formattedMonth={formattedMonth} />
          </div>
        </div>

        <div className="section">
          <div className="chart-container">
            <TransactionsPieChart formattedMonth={formattedMonth} />
          </div>
        </div>
      </div>

    )
  }
}

export default App;
