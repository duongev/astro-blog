export function getDes(content: string, count: number = 150) {
    if (!content || content.length === 0) {
        return "";
    }
    const contentArr = content.split(" ");
    let description = "";
    for (let el of contentArr) {
        const addDes = description + " " + el;
        if (addDes.length < count) {
            description = addDes;
        }
    }

    return description.replace(new RegExp(/<p>/, 'ig'), '').replace(new RegExp(/<\/p>/, 'ig'), '') + "...";
}