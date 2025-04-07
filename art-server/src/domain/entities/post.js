class Post {
    constructor({ title, description, taggedTopic, postImage, userId, likeAmount, aiTag, createdWhen, _id }) {
        this.title = title;
        this.description = description;
        this.taggedTopic = taggedTopic || [];
        this.postImage = postImage;
        this.userId = userId;
        this.likeAmount = likeAmount;
        this.aiTag = aiTag
        this.id = _id;
        this.likeAmount = likeAmount;
        this.createdWhen = createdWhen;
    }
}

module.exports = Post;
