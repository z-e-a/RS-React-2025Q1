import React from 'react';

// import styles from "./App.module.scss";
import { IPeople } from '../SWApi';
import Header from '../widgets/Header';
import PeopleList from '../widgets/PeopleList';
import Loader from '../shared/Loader';

interface IAppState {
  searchText: string;
  apiUrl: string;
  people: IPeople[];
  isLoading: boolean;
}

class App extends React.Component<object, IAppState> {
  declare state: IAppState;

  constructor(props: object) {
    super(props);
    const storedSearchText = localStorage.getItem('rss-react_searchText');

    this.state = {
      searchText: storedSearchText ?? '',
      apiUrl: import.meta.env.VITE_API_URL,
      people: [],
      isLoading: true,
    };
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: false });
    this.fetchData();
  }

  async search(text: string) {
    const trimmedText = text.trim();
    await this.setState({ searchText: trimmedText });
    localStorage.setItem('rss-react_searchText', trimmedText);
    this.fetchData();
  }

  fetchData() {
    this.setState({ isLoading: true });
    fetch(`${this.state.apiUrl}?search=${this.state.searchText.trim()}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ people: data.results });
        this.setState({ isLoading: false });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <>
        {this.state.isLoading && <Loader />}
        <Header
          searchText={this.state.searchText}
          searchCallback={this.search}
        ></Header>
        <PeopleList people={this.state.people}></PeopleList>
      </>
    );
  }
}

export default App;
