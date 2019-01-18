const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const from = process.env.TWILIO_NUMBER
const client = require('twilio')(accountSid, authToken);

const send = async (event, context) => {    
    //console.log('accountSid',accountSid); 
    let voiceDetails = JSON.parse(event.body);  
    console.log('voiceDetails',voiceDetails);
    let call =  await client.calls
                            .create({
                                url: voiceDetails.url,
                                to: voiceDetails.to,
                                from
                            });

    console.log("Voice sent to",call.to);  
    
    return {
        statusCode: 200,
        body: JSON.stringify("Voice sent to"+call.to),
        headers: {
            "Content-Type": "application/json"
        }
    };
    
};

module.exports = {
    send
}