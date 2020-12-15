/*
 * @Author: TinsFox
 * @Date: 2020-12-15 11:08:40
 * @LastEditors: TinsFox
 * @LastEditTime: 2020-12-15 15:40:08
 * @Description: 
 */
export const qaTypes = () => {
    return wx.$http._fetch({
        url: '/public/qa_types',
        method: "get"
    })
}
export const loadQa = (id) => {
    return wx.$http._fetch({
        url: `/qa_types/${id}/qa_answer`,
        method: "get"
    })
}