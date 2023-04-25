module.exports.path = {
    dest: './dist',
    destJs: './app.js',
    destCss: 'app.css',
    destVendor: 'vendor.js',
    srcJs: [
        './src/model/UsersListAPI.js',
        './src/model/Collection.js',
        './src/view/ContactFormView.js',
        './src/view/ContactListView.js',
        './src/Controller.js',
        './src/index.js'
    ],
    srcHtml: './src/index.html',
    srcCss: './src/**/*.css',
    srcJsAll: './src/**/*.css',
    jsVendorSrc: './node_modules/jquery/dist/jquery.min.js'
}