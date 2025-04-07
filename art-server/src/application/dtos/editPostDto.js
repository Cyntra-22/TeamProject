class editPostDto {
    constructor({ _id, title, description, taggedTopic, postImage, userId }) {
        if (!_id) {
            throw new Error("Post ID is required");
        }
        if (!title) {
            throw new Error("Title is required");
        }
        if (!description) {
            throw new Error("Description is required");
        }
        if (!postImage) {
            throw new Error("Post image is required");
        }
        if (!userId) {
            throw new Error("User ID is required");
        }

        this._id = _id;
        this.title = title;
        this.description = description;
        this.taggedTopic = Array.isArray(taggedTopic) ? taggedTopic : [];
        this.postImage = postImage;
        this.userId = userId;
    }
}

module.exports = editPostDto;
