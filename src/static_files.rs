use rocket::{get, response::Stream};

use std::fs::File;
use std::io;

#[get("/main.js")]
pub fn main() -> io::Result<Stream<File>>
{
    File::open("./static/main.js").map(Stream::from)
}

#[get("/")]
pub fn index() -> io::Result<Stream<File>>
{
    File::open("./static/index.html").map(Stream::from)
}