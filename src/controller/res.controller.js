
import dayjs from "dayjs";
import { sequelize } from "../models/connec.js";
import initModels from "../models/init-models.js";




const model = initModels(sequelize);
 const getListByUserIdAndResId = async(req,res)=>{
    try {
        const {user_id,res_id} = req.params;
        console.log(user_id)
        if(!user_id || !res_id ){
            return res.status(500).json({message:"thông tin id user hoặc id res  chưa đầy đủ"})
        }
      
        const result =await model.like_res.findOne({
            where:{
                id_user:Number(user_id),
                id_res:Number(res_id)
            }
        })
       
        if(!result){
            return res.status(200).json({message:"người dùng này không tương tác với nhà hàng"})
        }
        
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message:"lỗi like" + error})
    }
}

const updateStatusLikeByUserIdAndResId = async(req,res)=>{
    try {
        
        const {id_user,id_res,status} = req.body;
        if(!id_user || !id_res || !status){
            return res.status(500).json({message:"thông tin id user hoặc id res hoặc  đánh giá chưa đầy đủ"})
        }
      
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
       
        const result =await model.like_res.findOne({
            where:{
                id_user:Number(id_user),
                id_res:Number(id_res)
            }
        })
        if(!result){
            const data = await model.like_res.create({
                id_user:id_user,
                id_res:id_res,
                status:status,
                date_like:now
            })
            return res.status(200).json(data)
        }
        if(result.status !== status){
            const data = await model.like_res.update({
           status:status,
           date_like:now 
        },{
            where:{
                id_res:Number(id_res),
                id_user:Number(id_user)
            }
           })
           
        }
        
        res.status(200).json({message:"update susseccfully"})
      
    } catch (error) {
        res.status(500).json({message:"lỗi update "+error})
    }
}


export  {getListByUserIdAndResId,updateStatusLikeByUserIdAndResId}