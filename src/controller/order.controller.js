import { sequelize } from "../models/connec.js";
import initModels from "../models/init-models.js";


const model = initModels(sequelize)

const createOrderByUserIdAndFoodId= async(req,res)=>{
    try {
        const {id_user,id_food,amount,code,arr_sub,quantity}= req.body;
        const body = req.body
      
        if(!id_user || !id_food ||!quantity){
            return res.status(500).json({message:"thông tin id user hoặc id res hoặc số lượng chưa đầy đủ"})
        }
        const result  = await model.orders.findOne({
            where:{
                id_user:Number(id_user),
                id_food:Number(id_food)
            }
        })
        console.log(result)
        if(!result){
            const data = await model.orders.create({
                id_user:id_user,
                id_food:id_food,
                amount:amount?amount:null,
                code:code?code:null,
                arr_sub:arr_sub?arr_sub.toString():null,
                quantity:quantity
            })
            return res.status(201).json(data)
        }
        await model.orders.update({
            quantity:result.quantity+quantity
        },{
            where:{
                id_user:Number(id_user),
                id_food:Number(id_food)
            }
        })
        return res.status(200).json({message:"update successfully"})
    } catch (error) {
        return res.status(500).json({message:"lỗi order "+error})
    }
}

export {createOrderByUserIdAndFoodId}