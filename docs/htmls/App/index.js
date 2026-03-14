const { ref } = Zipaper
import urlFormat from "../../libs/modules/services/urlFormat.js"

export default {
    template: "index.html",
    data() {
        return {
            currentTag: ref("")
        }
    },
    created() {
        let match = urlFormat().router.match(/^\/[^/]+/)
        this.currentTag = match ? match[0] : "/welcome"
    },
    style: {
        content: "index.scss",
    }
}