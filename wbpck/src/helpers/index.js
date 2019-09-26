function postRequest(uri, body, cb)
{
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4)
        {
            let data = JSON.parse(this.responseText)
            cb(data)
        }
    }
    xhttp.open("POST", uri, true)
    xhttp.setRequestHeader('Content-Type', 'application/json')

    xhttp.send(JSON.stringify(body))
}

export {postRequest}