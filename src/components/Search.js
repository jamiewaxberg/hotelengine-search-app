import React, {Component, Fragment} from 'react';

const dbReference = 'https://api.github.com/search/repositories?q=';

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            githubData: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.queryApi = this.queryApi.bind(this);
    }

    queryApi(query) {
        fetch(dbReference + query)
            .then(response => response.json())
            .then(data => this.setState({githubData: data}));
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSearch() {
        // let query = 'tetris+language:assembly&sort=stars&order=desc';
        const query = this.state.value;
        this.queryApi(query);
    }

    render() {
        return (
            <Fragment>
                <div className="searchFieldWrapper">
                    <input type="text" className="searchField" value={this.state.value} onChange={(e) => this.handleChange(e)} />
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                <div className="searchResultsWrapper">
                    <div className={this.state.githubData.items ? 'resultRow headers show' : 'resultRow headers'}>
                        <div>Name</div>
                        <div>Description</div>
                        <div>Stars</div>
                        <div>Owner</div>
                        <div>Language</div>
                    </div>
                    {this.state.githubData.items ? this.state.githubData.items.map(repo => {
                        const {
                            id,
                            name,
                            description,
                            stargazers_count,
                            owner,
                            language
                        } = repo;
                        return (
                            <div className="resultRow" key={id}>
                                <div>{name}</div>
                                <div>{description}</div>
                                <div>{stargazers_count}</div>
                                <div>{owner.login}</div>
                                <div>{language}</div>
                            </div>
                        )

                    }
                ) : null}
                </div>
            </Fragment>

        )
    }
};

export default Search;
