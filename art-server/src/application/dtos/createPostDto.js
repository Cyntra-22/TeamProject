class createPostDto {
    constructor({ title, description, taggedTopic, postImage, userId }) {
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

        this.title = title;
        this.description = description;
        this.taggedTopic = Array.isArray(taggedTopic) ? taggedTopic : [];
        this.postImage = postImage;
        this.userId = userId;
    }
}

module.exports = createPostDto;
