class getPostByIdDto {
    constructor({ _id }) {
        if (!_id) {
            throw new Error("Post ID is required");
        }
        this._id = _id;
    }
}

module.exports = getPostByIdDto;