const {
    getLinkPreview
} = require('link-preview-js');

const preview = (url) => {
    return new Promise((res, rej) => {
        getLinkPreview(url)
            .then((data) => {
                res(data);
            }).catch(e => {
                rej(e)
            })
    })
}
module.exports = {
    preview
}