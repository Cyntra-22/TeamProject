class Post {
    constructor({ title, description, taggedTopic, postImage, userId, _id }) {
        this.title = title;
        this.description = description;
        this.taggedTopic = taggedTopic || [];
        this.postImage = postImage;
        this.userId = userId;
        this.id = _id;
    }
}

module.exports = Post;
