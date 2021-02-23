import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

/* import './app.css'; */
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 50px auto;
    max-width: 800px;
`;

//inheritance from component "AppBlock"
/* const StyledAppBlock = styled(AppBlock)`
    background-color: skyblue;
`; */

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: "Going to learn React", important: true, like: false, key: 1},
                {label: "That is so good!", important: false, like: false, key: 2},
                {label: "I need a break...", important: false, like: false, key: 3},
            ],
            term: '',
            filter: 'all'
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxKey = 4;
    }

    deleteItem(id) {
       this.setState(({data}) => {
           const index = data.findIndex((element) => element.key === id);

           const before = data.slice(0, index);
           const after = data.slice(index + 1);

           const newArr = [...before, ...after];
           
           return {
               data: newArr
           }
       }); 
    }

    addItem(body) {
      const newItem = {
          label: body,
          important: false,
          key: this.maxKey++ 
      }

      this.setState(({data}) => {
          const newArr = [...data, newItem];
          return {
              data: newArr
          }
      })
    }

    onToggle(key, strAct) {
        this.setState(({data}) => {
           const index = data.findIndex(elem => elem.key === key);

           const old = data[index];
           const newItem = {...old, [strAct]: !old[strAct]};
           
           const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

           return {
               data: newArr
           }
        })
    }

    searchPost(items, term) {
       if(term.length === 0){
           return items;
       }

       return items.filter((item) => {
           return item.label.indexOf(term) > -1;
       })
    }

    onUpdateSearch(term) {
        this.setState({term: term});
    }

    filterPosts(items, filter) {
        if(filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }

    onFilterSelect(filter) {
        this.setState({filter: filter});
    }

    render () {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPosts(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader 
                    liked={liked}
                    allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter 
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggle={this.onToggle}/>
                <PostAddForm 
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}