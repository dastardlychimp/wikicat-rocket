#![feature(proc_macro_hygiene)]
#![feature(decl_macro)]

use rocket::{routes};
use simplelog;

mod api;
mod state;
mod static_files;

use api::api_v1;
use state::AsyncClient;

use std::fs::File;

fn main() {
    init_logging();
    
    let rt = tokio::runtime::Runtime::new().unwrap();
    let client = wikicat::conn::client::new();

    rocket::ignite()
        .mount("/", routes![static_files::index, static_files::main])
        .mount("/api/1/", routes![api_v1::all_categories, api_v1::random_article])
        .manage(AsyncClient { runtime: rt, client: client })
        .launch();
}

fn init_logging()
{
    simplelog::WriteLogger::init(
        simplelog::LevelFilter::Trace,
        simplelog::Config::default(),
        File::create("./logs/log-001.log").unwrap()
    ).unwrap();
}