import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
 
export default class SortTree extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      treeData: [
        { title: 'Comic Books', children: [{ title: 'Amazing Spider-Man' },{ title: 'The Incredible Hulk' },{ title: 'Action Comics' },{ title: 'Batman' },{ title: 'New Avengers' }] },
        { title: 'Historical Fiction', children: [{ title: 'The Help' },{ title: 'All the Light We Cannot See' },{ title: ' The Color Purple' },{ title: ' War and Peace' }] },
      ],
    };
  }
 
  render() {
    return (
      <div style={{ height: 800 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
