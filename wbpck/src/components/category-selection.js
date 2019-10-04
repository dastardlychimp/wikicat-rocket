import React from 'react'
import Async from 'react-select/async'

import {postRequest} from '../helpers/index'

const CategorySelection = (props) => {
    const loadOptions = (input, callback) => {
        const request_body = {"prefix": input}
        
        postRequest("api/1/all_categories", request_body, (data) => {
            let category_options = data.data.map((c) => ({ value: c, label: c }));
            callback(category_options)
        })
    }

    return (
        <div id="category-selection">
            <Async
                cacheOptions
                placeholder="Category"
                autoFocus={true}
                loadOptions={loadOptions}
                onChange={category => props.onSelection(category.value)}
            />
        </div>
    )
}

export default CategorySelection