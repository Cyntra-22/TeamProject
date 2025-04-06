class Post {
    constructor({ title, description, taggedTopic, postImage, userId, _id, likeAmount }) {
        this.title = title;
        this.description = description;
        this.taggedTopic = taggedTopic || [];
        this.postImage = postImage;
        this.userId = userId;
        this.id = _id;
        this.likeAmount = likeAmount;
    }
}

module.exports = Post;
