exports.sanitizeUser=(user )=>{
    return {_id:user._id,email:user.email,isVerified:user.isVerified,role:user.role,name:user.name}
}