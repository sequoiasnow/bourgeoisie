/// The routes define a simple api spec, currently the data is stored in a small
/// mongodb server.
module.exports = {
    siteinfo: {
        title: {
            type: 'string',
            title: 'Title',
            description: 'The title of the site which is used **on every page**',
            default: 'Site Title', 
        },
        description: {
            type: 'string',
            title: 'Description',
            description: 'Must be less than threehundred characters',
            maxLength: 300
            default: ''
        },
        // This field is static, meaning it can not be changed, and does not show an
        // editable field.
        email: 'example@mysite.com'
    }, 
    // By making an array, this enpoint provides unique id's and works out of the rest
    // mutliple data format.
    posts: [{
        title: {
            type: 'string',
            title: 'Title',
            description: 'A simple post title',
            default: 'First Post!',
            // Because there are multiple posts, the title is shown on the screen where
            // you can edit the mutliple parts.
            identifier: true
        },
        // A computed property, meaning there is no field provided.
        url: (post) => post.title.toLowerCase().replace(' ', '-'),
        excerpt: {
            type: 'string',
            title: 'Excerpt',
            description: 'A simple description of the post',
            // In this case the default is a function based on the other data from the
            // post. So if nothing is entered into this field, this function will run
            // from the remaining data.
            default: (post) => post.body.length > 300 ?
                             post.body.substr(0, 300) + '...' : post.body 
        },
        body: {
            type: 'text',
            title: 'Post Body',
            description: `The acutal postbody, if all goes as planned you should be able
            to type this as markdown`,
            default: ''
        }
    }]
} 
