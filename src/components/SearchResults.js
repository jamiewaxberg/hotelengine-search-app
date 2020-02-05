import React from "react";

function SearchResults(props) {
    const { repos } = props;
    return (
        <div className="searchResultsWrapper">
            <div className={repos ? 'resultRow headers show' : 'resultRow headers'}>
                <div>Name</div>
                <div>Description</div>
                <div>Stars</div>
                <div>Owner</div>
                <div>Language</div>
                <div>Score</div>
            </div>
            {repos ? repos.map(repo => {
                    const {
                        id,
                        name,
                        description,
                        stargazers_count,
                        owner,
                        language,
                        score
                    } = repo;
                    return (
                        <div className="resultRow" key={id}>
                            <div>{name}</div>
                            <div>{description}</div>
                            <div>{stargazers_count}</div>
                            <div>{owner.login}</div>
                            <div>{language}</div>
                            <div>{score}</div>
                        </div>
                    )
                }
            ) : null}
        </div>
    );
}

export default SearchResults;