/*
 * @Author: TinsFox
 * @Date: 2020-12-15 15:40:18
 * @LastEditors: TinsFox
 * @LastEditTime: 2020-12-15 16:43:11
 * @Description: 
 */
export const postOrder = (data) => {
    return wx.$http._fetch({
        url: `/repair_item`,
        method: "POST",
        data: data
    })
}
export const orderDetail = (id) => {
    return wx.$http._fetch({
        url: `/repair_item/actions/search?repair_item_id=${id}`,
    })
}