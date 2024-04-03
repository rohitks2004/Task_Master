import Task from "../Models/task.js";
import User from "../Models/user.js";

export const createTask = async (req,res)=>{
    try {
        const {title,team,stage,date,priority,assets}=req.body;
        const task=await Task.create({
            title,team,stage :stage.toLowerCase(),date,
            priority :priority.toLowerCase(),
            assets
        })

        let text = "New task has been assigned to you";    
    
        if(task.team.length >1)
    {
        text =text+`and ${task.team.length - 1} others`;
    }
text+=text+`The Task priority is set a ${task.priority} priority,so check and act accordingly. The task date is ${task.date.toDateString()}.Thank you !!!`;

    await Notice.create({
        team,team,task:task._id,
    });

    res.status(200)
    .json({status:true,message:"Task created successfully."});


    } catch (error) {
        return res.status(400),json({status:false,message:error.message});

    }
   
}

export const duplicateTask = async (req,res)=>{
    try {
        const { id } = req.params;
        const task =await Task.findById(id);
        const newTask = await Task.create({ ...task, title: task.title + " - Duplicate" });
        newTask.team = task.team;
newTask.subTasks = task.subTasks;
newTask.assets = task.assets;
newTask.priority = task.priority;
newTask.stage = task.stage;
await newTask.save();

//alert the users of task
let text = "New task has been assigned to you";
if (task.team.length > 1) {
    text = text + ' and ${task.team.length - 1} others.';
}

text = 
    text + 
    ` The task priority is set a ${
        task.priority
    } priority, so check and act accordingly. The task date is ${task.date.toDateString()}.
Thank you!!!`;

await Notice.create({
    team:task.team,
    text,
    task:newTask._id,
})


    } catch (error) {
        return res.status(400),json({status:false,message:error.message});

    }
}

export const postTaskActivity= async (req,res)=>{
    try {
        const { id } = req.params;
const { userId } = req.user;
const { type, activity } = req.body;

const task = await Task.findById(id);

const data = {
    type,
    activity,
    by: userId,
};

task.activities.push(data);

await task.save();

res.status(200)
.json({status:true,message:"Activity posted successfully."})

    } catch (error) {
        return res.status(400),json({status:false,message:error.message});

    }
}

export const dashboardStatistics = async (req,res)=>{
    try {
        const {
            userId,isAdmin
        }=req.user;
        const allTasks = isAdmin?
        await Task.find({
            isTrashed:false,
        })
        .populate({
            path:"team",
            select:"name role title email",
            
        })
        .sort({_id:-1})
        : await Task.find({
            isTrashed:false,
            team:{$all:[userId]},

        })
        .populate({
            path:"team",
            select:"name role title email",
            
        })
        .sort({_id:-1})

        const users = await User.find({isActive:true})
        .select("name title role isAdmin createAt")
        .limit(10)
        .sort({_id:-1})

        //group tasks
        const groupTasks=allTasks.reduce((result,task)=>{
            const stage= task.stage;
            if(!result[stage]){
                result[stage]=1;

            }
            else{
                result[stage]+=1;
            }

            return result
        },{});
        
//Group tasks by priority
const groupData = Object.entries(
    allTasks.reduce((result,task)=>{
        const {priority}=task;

        result[priority]=(result[priority] || 0)+1;
        return result;


    },{})
    .map(([name,total])=>({name,total})));
    //calculate tasks
    const totalTasks = allTasks ?.length;
    const last10Task=allTasks?.slice(0,10);
const summary ={
    totalTasks,
    last10Task,
    users:isAdmin?users:[],
    tasks:groupTasks,
    groupData:groupData,
}
   res.status(200).json({
    status:true,...summary,message:"Successfully"
   })

    } catch (error) {
        return res.status(400),json({status:false,message:error.message});

    }
}

// export const  = async (req,res)=>{
//     try {
        
//     } catch (error) {
//         return res.status(400),json({status:false,message:error.message});

//     }
// }

// export const  = async (req,res)=>{
//     try {
        
//     } catch (error) {
//         return res.status(400),json({status:false,message:error.message});

//     }
// }

// export const  = async (req,res)=>{
//     try {
        
//     } catch (error) {
//         return res.status(400),json({status:false,message:error.message});

//     }
// }