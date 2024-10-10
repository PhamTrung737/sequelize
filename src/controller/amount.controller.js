import dayjs from "dayjs";
import { sequelize } from "../models/connec.js";
import initModels from "../models/init-models.js";


const model = initModels(sequelize)

const getAmountByUserIdAndResId = async(req,res)=>{
    try {
        const {id_user,id_res}= req.params;
        if(!id_user || !id_res ){
            return res.status(500).json({message:"thông tin id user hoặc id res  chưa đầy đủ"})
        }
        const data = await model.rate_res.findOne({
            where:{
                id_res:id_res,
                id_user:id_user
            }
        })
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({message:"lỗi amount "+error})
    }
}

const createAmountByUserIdAndResId = async(req,res)=>{
    try {
        const {id_user,id_res,amount} = req.body;
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
        if(!id_user || !id_res || !amount){
            return res.status(500).json({message:"thông tin id user hoặc id res hoặc đánh giá chưa đầy đủ"})
        }
        const result =await model.rate_res.findOne({
            where:{
                id_user:Number(id_user),
                id_res:Number(id_res)
            }
        })
        if(!result){
            const data = await model.rate_res.create({
                id_user:id_user,
                id_res:id_res,
                amount:amount,
                date_rate:now
            })
            return res.status(200).json(data)
        }
        if(result.amount !== amount){
             await model.like_res.update({
             amount:amount,
             date_rate:now 
        },{
            where:{
                id_res:Number(id_res),
                id_user:Number(id_user)
            }
           })
           
        }
        
        res.status(200).json({message:"update susseccfully"})
    } catch (error) {
        res.status(500).json({message:"lỗi create amount "+error})
    }
}

export {getAmountByUserIdAndResId,createAmountByUserIdAndResId}