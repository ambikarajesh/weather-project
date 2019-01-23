export const updateObject = (oldState, updateValues)=>{
    return{
        ...oldState,
        ...updateValues
    }
}