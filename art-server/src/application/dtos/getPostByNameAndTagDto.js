class getPostByNameAndTagDto {
    constructor({title = null, taggedTopic = []}) {
        this.title = title;
        this.taggedTopic = taggedTopic;
    }
}

module.exports = getPostByNameAndTagDto;