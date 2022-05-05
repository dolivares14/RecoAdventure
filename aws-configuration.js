aws= require('aws-sdk')
require('dotenv').config()

aws.config.update({
    accessKeyId:process.env.AWSKEYID,
    secretAccessKey:process.env.AWSSECRETACCESSKEY,
    AWSREGION:process.env.AWSREGION
 })


 exports.aws = aws
