pub struct AsyncClient
{
    pub runtime: tokio::runtime::Runtime,
    pub client: wikicat::conn::AlpnClient,
}
