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

const formatExtract = (extract) => {
    let extract_size = 200;
    let clean_extract = extract.slice(0, extract.length - 3).split("\n")[0]
    let slice = clean_extract.length > extract_size
        ? clean_extract.slice(0, extract_size + 1)
        : clean_extract

    return slice.concat('...')
}

const Article = (props) => {
    return (
        <div className="article">
            <a 
                className="article-link"
                href={props.article.link}
                target="_blank"
            >
                {props.article.title}
            </a>
            <p className="article-description">
                {formatExtract(props.article.extract)}
            </p>
        </div>
    )
}

export default ArticleContainer