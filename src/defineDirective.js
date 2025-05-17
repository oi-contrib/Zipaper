export default function defineDirective(option) {
    return {
        lifecycle: {
            created: option.created,
            update: option.update
        }
    }
}