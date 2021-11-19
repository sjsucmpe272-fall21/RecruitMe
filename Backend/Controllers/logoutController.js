exports.logout = (req, res) => {
    console.log('in logout backend');
    req.logOut();
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end();
}