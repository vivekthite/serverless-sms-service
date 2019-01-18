const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const from = process.env.TWILIO_NUMBER
const client = require('twilio')(accountSid, authToken);

const send = async (event, context) => {    
    //console.log('accountSid',accountSid); 
    let smsDetails = JSON.parse(event.body);  
    console.log('smsDetails',smsDetails);
    let message =  await client.messages
                            .create({
                                body: smsDetails.text,
                                from,
                                mediaUrl: smsDetails.media,
                                to: smsDetails.to
                            });

    console.log("Message sent to",message.to);  
    
    return {
        statusCode: 200,
        body: JSON.stringify("Message sent to"+message.to),
        headers: {
            "Content-Type": "application/json"
        }
    };
    
};

module.exports = {
    send
}