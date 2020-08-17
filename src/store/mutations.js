export default {
    addCount(state, payload){
        payload.count++
    },
    addGoods(state, payload){
        payload.count = 1
        payload.checked = true
        state.cartGoodsList.push(payload)
    },
}