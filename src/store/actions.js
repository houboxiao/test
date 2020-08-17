export default {
    addCartGoodsList(context, payload){
        //可以返回一个Promise,在异步操作完成后进行回调
        return new Promise((resolve, reject) => {
            let oldGood = null
            //方法一:
            //1.判断购物车中是否已经存在该商品
            // for (let item of state.cartGoodsList){
            //   if(item.iid === payload.iid){
            //     oldGood = item
            //   }
            // }
            //2.如果存在则该商品数量+1，不存在则设置商品数量为1
            // if (oldGood){
            //   oldGood.count += 1
            // }else{
            //   payload.count = 1
            //   state.cartGoodsList.push(payload)
            // }

            //方法二:
            //indexOf()返回某个元素在数组中首次出现的位置，
            // 某个指定的字符串值在字符串中首次出现的位置。
            //如果不存在则返回 -1
            // let index = state.cartGoodsList.indexOf(payload)
            //
            // if (index !== -1){
            //   oldGood = state.cartGoodsList[index]
            //   oldGood.count += 1
            // }else{
            //   payload.count = 0
            //   state.cartGoodsList.push(payload)
            // }

            //方法三:
            //数组常用方法: push(),pop(),shift(),unshift(),sort(),reverse(),map(),reduce()
            //            filter(),splice(开始位置， 删除的个数，元素),find()
            //判断数组里有没有符合条件的元素，如果由将该元素返回
            oldGood = context.state.cartGoodsList.find(item => item.iid === payload.iid)

            if (oldGood){
                // oldGood.count += 1
                context.commit('addCount',oldGood)
                resolve('商品数量+1')
            }else{
                // payload.count = 1
                // state.cartGoodsList.push(payload)
                context.commit('addGoods',payload)
                resolve('添加了新商品')
            }
        })
    }
}