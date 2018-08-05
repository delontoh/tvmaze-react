// ** Home function to render Search Container; no states involved **
function Home(props) {
    return(
        <div className= 'home'>
            <h1>TV Maze React</h1>
            <SearchContainer/>
        </div>
    );
};

    
// ** Container Component to store states **
class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.onSubmitQuery = this.onSubmitQuery.bind(this);

    };

    state = {
        movies : [],    // results to display; movie name and image
        query : "",
        hasSearched : false
    };


    handleSearchInput(event) {
        this.setState({query: event.target.value.toLowerCase()}); 
        console.log("searching", event.target.value);  
        console.log("results" , results);
    }


    onSubmitQuery(event) {
        var queryString = this.state.query;
        var moviesResult = [];

        for(var i = 0; i < results.length; i++) {
           if(results[i].show.name.toLowerCase().includes(queryString)) {  // returns a boolean; true if name contains query
            moviesResult.push(results[i].show);
           }
        };

        this.setState({movies: moviesResult});   // array within array
        console.log('searched movies:', this.state.movies);

        this.setState(hasSearched: true);
    }

    // onSearchAgain(event) {
    //     if(this.state.hasSearched === true) {

    //     }
    // }


    render() {
        // const SEARCHEDMOVIES = this.state.movies.map((element,index) => {
        //     return(
        //         <li key={index}>
        //             <img src={element.image.medium} />
        //             <p>{element.name}</p>
        //         </li>
        //     )
        // });

        return(     
        <div className = 'search'>   
            <Search 
                onChange = {this.handleSearchInput}
                value = {this.state.query.toLowerCase()}
                onClick = {this.onSubmitQuery}
                searchedMovies = {this.state.movies}   // pass on state.movies from SearchContainer to Search Presentational Component
            />

            {/* <input 
            onChange={this.handleSearchInput}
            value={this.state.query.toLowerCase()}
            /><br/>

            <button 
            onClick= {this.onSubmitQuery}
            >Search
            </button><br/>

            <ul>
             {SEARCHEDMOVIES}
            </ul> */}

        </div>
        );
    };
};


// ** Presentation Container for render; no states involved **
// class Search extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     render() {

    function Search(props) {
        return(
            <div className = 'searchResult'>
                <input 
                className= 'searchbar'
                onChange= {props.onChange}
                value={props.value}
                /><br/>    

                <button 
                onClick= {props.onClick}
                >Search
                </button><br/>                

                <Results 
                searchedResult= {props.searchedMovies}  // pass searchedMovies as searchedResult fo Results Container
                />
                
            </div>
        );
    };


// ** Container to hold logic of Results
class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const SEARCHEDMOVIES = this.props.searchedResult.map((element,index) => {   // searchedResult pass on all the way from SearchContainer
            return(
                <li key={index}>
                    <img src={element.image.medium} />
                    <p>{element.name}</p>
                </li>
            );
        });
        console.log(SEARCHEDMOVIES);
        return(
            <div>
                <Result
                displayResult= {SEARCHEDMOVIES} // pass props to Result Presentation Component
                />
            </div>
        );
    };
};


// ** Presentational Component to render Result; no logic involved **
function Result(props) {
    return(
        <div>
            <ul>{props.displayResult}</ul>
        </div>
    );
};


ReactDOM.render(
    <Home/>,
    document.getElementById('root')
);