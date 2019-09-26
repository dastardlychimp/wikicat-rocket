import React from 'react'

const ArticleContainer = (props) => {
    let key = 0

    return (
        <div>
            {
                props.articles.slice(0, 10).map((article) => <Article article={article} key={key++} />)
            }
        </div>
    )
}

const Article = (props) => {
    return (
        <div className="article">
            <a 
                className="article-link"
                href={props.article.link}
                target="_blank"
            >
                {props.article.link}
            </a>
        </div>
    )
}

export default ArticleContainer