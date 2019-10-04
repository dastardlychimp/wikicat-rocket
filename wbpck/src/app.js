import React, { useState } from 'react'
import {AddButton, CategorySelection, ArticleContainer} from './components/index'
import {postRequest} from './helpers/index'

const App = () => {
    const [articles, setArticles] = useState([])
    const [category, setCategory] = useState("")

    const getRandomArticle = (category) => {
        const request_body = {"category": category}
        
        postRequest("api/1/random_article", request_body, (data) => {
            let article = data
            setArticles([article].concat(articles))
        })
    }

    const onSelection = (category) => {
        getRandomArticle(category)
        setCategory(category)
    }

    const onClick = () => getRandomArticle(category)

    const disabled = category == ""

    return (
        <div>
            <CategorySelection
                onSelection={onSelection}
            />
            <div id="add-button-wrapper">
                <AddButton
                    id="add-button"
                    size={50}
                    onClick={onClick}
                    disabled={disabled}
                />
            </div>
            <ArticleContainer articles={articles} />
        </div>
    )
}

export default App