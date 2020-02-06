import React, {Component, Fragment} from 'react';
import SearchResults from "./SearchResults";

const dbReference = 'https://api.github.com/search/repositories?q=';

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            githubData: {},
            filterBy: 'score'
        };
        this.queryApi = this.queryApi.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    queryApi(query) {
        const sortByParam = this.state.filterBy ? `&sort=${this.state.filterBy}` : null;
        fetch(dbReference + query + sortByParam)
            .then(response => response.json())
            .then(data => this.setState({githubData: data}));
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSearch() {
        // let query = 'tetris+language:assembly&order=desc';
        const query = this.state.value;
        this.queryApi(query);
    }

    handleFilter(filter) {
        this.setState({filterBy: filter})
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div className="searchFieldWrapper">
                        <input type="text" className="searchField" value={this.state.value} onChange={(e) => this.handleChange(e)} placeholder="Type your GitHub search query here" />
                        <button onClick={this.handleSearch}>Search</button>
                    </div>
                    <div className="filters">
                        <span className="sortBy">Sort by</span>
                        <label value="Relevance" className={this.state.filterBy === 'score' ? 'active' : 'inactive'} onClick={() => this.handleFilter('score')}><input type="radio" name="sortBy" value="Relevance" defaultChecked/>Relevance</label>
                        <label value="Stars" className={this.state.filterBy === 'stars' ? 'active' : 'inactive'}  onClick={() => this.handleFilter('stars')}><input type="radio" name="sortBy" value="Stars" />Stars</label>
                    </div>
                </div>
                <SearchResults repos={this.state.githubData.items ? this.state.githubData.items : null} />
            </Fragment>

        )
    }
};

export default Search;
