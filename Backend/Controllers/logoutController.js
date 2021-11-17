exports.logout = (req, res) => {
    req.logOut();
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end();
}