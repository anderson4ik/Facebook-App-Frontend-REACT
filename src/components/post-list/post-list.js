import React from 'react';
import { ListGroup } from 'reactstrap';


import './post-list.css';

import PostListItem from '../post-list-item';

const PostList = ({posts, onDelete, onToggle}) => {

    const elements = posts.map((item) => {
        const {key, ...itemProps} = item,
              strLike = 'like',
              strImportant = 'important';
        return (
            <li key={key} className="list-group-item">
              <PostListItem 
              /* label={itemProps.label} 
              important={itemProps.important}
              like={itemProps.like} */
              //Anything above is equivalent to this line 20
              {...itemProps}
              onDelete={() => onDelete(key)}
              onToggleLiked={() => onToggle(key, strLike)}
              onToggleImportant={() => onToggle(key, strImportant)}/>
            </li>
        )
    })

    return (
        /*using components from reactstrap*/
       <ListGroup className="app-list">
           {elements}
       </ListGroup>
    )
}

export default PostList;