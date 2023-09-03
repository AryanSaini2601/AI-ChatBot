//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
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const configuration = new Configuration({
    organization: "org-jZxo6BtnAoYz5W2cr7KIUJ17",
    // apiKey: "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",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);


// create a simple express api that calls the function above

const app = express();

app.use(express.json());
app.use(cors());

const port = 3080;

app.post('/', async(req, res)=>{
    const {message, currentModel, currentTemp} = req.body;
    console.log(req.body)
    console.log(currentModel, "currentModel")
    console.log(currentTemp, "currentTemp")
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 1000,
        temperature: 0.5,
        // temperature: `${currentTemp}`,
        frequency_penalty: 0.5,
        top_p: 1
      }); 
      
      res.json({
        message: response.data.choices[0].text,
        
      })
});

app.get('/models', async(req, res)=>{
    
    const response = await openai.listEngines();
    //console.log(response.data.data);
    res.json({
        models: response.data.data
    })
    
});

app.listen(3080, ()=>{
    console.log(`Example app listening at https://localhost:${port}`);
});