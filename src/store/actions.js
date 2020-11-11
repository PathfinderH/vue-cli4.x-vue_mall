import $axios from 'axios'

const actions = {
    //更新数据库中用户数据
    async updateDatabaseInfo(context, field) {
        let info = {
            id: context.state.currentUser[0].id,
            field: field
        }
        info.data = JSON.stringify(context.state[field])

        const { data: res } = await $axios.post("/updateDatabaseInfo", info);

        return res



    },

    //登录的时候获取用户信息
    async getDatabaseInfo(context, field) {


        let info = {
            id: context.state.currentUser[0].id,
            field: field
        }
        const { data: res } = await $axios.post("/getUserInfo", info);

        context.commit('getUserInfo', { data: JSON.parse(res.data[0][field]), field: field })
            // console.log(res);
        context.commit('updateAllSelected', false)
        context.commit('updateCollAllSelected', false)
    }

}

export default actions;