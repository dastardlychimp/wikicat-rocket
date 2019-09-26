use rocket::{post, State};
use rocket_contrib::json::{Json};

use serde::{Deserialize, Serialize};

use crate::state::{AsyncClient};

pub mod api_v1
{
    use super::*;
    
    #[derive(Deserialize)]
    pub struct AllCategories
    {
        prefix: String
    }

    #[derive(Serialize)]
    pub struct AllCategoriesResponse
    {
        data: Vec<String>
    }

    #[derive(Deserialize)]
    pub struct RandomArticle
    {
        category: String
    }

    #[derive(Serialize)]
    pub struct RandomArticleResponse
    {
        link: String
    }

    #[post("/all_categories", format = "json", data = "<data>")]
    pub fn all_categories(data: Json<AllCategories>, state: State<AsyncClient>) -> Json<AllCategoriesResponse>
    {
        let client = &state.client;
        let rt = &state.runtime;

        let fut = wikicat::conn::api::all_categories(client, data.prefix.clone());
        let resp = rt.block_on(fut);
        let (_head, body) = resp.unwrap().into_parts();

        let categories = body
            .query
            .all_categories
            .unwrap()
            .iter()
            .map(|data| data.category.clone())
            .collect::<Vec<String>>();

        let response = AllCategoriesResponse { data: categories };
        Json(response)
    }

    #[post("/random_article", format = "json", data = "<data>")]
    pub fn random_article(data: Json<RandomArticle>, state: State<AsyncClient>) -> Json<RandomArticleResponse>
    {
        let client = &state.client;
        let rt = &state.runtime;

        let fut = wikicat::conn::api::random_article(client, data.category.clone());
        let resp = rt.block_on(fut);
        let link = resp.unwrap();

        let response = RandomArticleResponse {
            link
        };

        Json(response)
    }
}