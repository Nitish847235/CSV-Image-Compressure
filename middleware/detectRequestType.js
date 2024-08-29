function detectRequestType(req, res, next) {
    const acceptHeader = req.headers['accept'];
    if (acceptHeader && acceptHeader.includes('text/html')) {
        req.isBrowser = true;
    } else {
        req.isBrowser = false;
    }
    next();
}

module.exports = detectRequestType;