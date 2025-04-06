class Post {
    constructor({ title, description, taggedTopic, postImage, userId, likeAmount, aiTag, _id }) {
        this.title = title;
        this.description = description;
        this.taggedTopic = taggedTopic || [];
        this.postImage = postImage;
        this.userId = userId;
        this.likeAmount = likeAmount;
        this.aiTag = aiTag
        this.id = _id;
        this.likeAmount = likeAmount;
    }
}

module.exports = Post;
