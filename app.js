import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  organisation:"org-C2PzMSlDE5jCBWY9HKDuz9Jj",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true } ));


app.get("/", (req, res)=>{
                            res.status(200).json(`Welcome to ChatGPT Clone app`);
                          }
        );


app.post("/", async(req, res)=>{
                        let {message} = req.body;

                      try
                      {
                        const response = await openai.createCompletion({
                              model: "text-davinci-003",
                              prompt: `${message}`,
                              temperature: 0.5, // Higher values means the model will take more risks.
                              max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
                              top_p: 1, // alternative to sampling with temperature, called nucleus sampling
                              frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
                              presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
                            });

                        // console.log(response.data.choices[0].text);
                        res.status(200).json(response.data.choices[0].text);

                      }catch (e)
                       {
                         console.log(e);
                         res.status(500).json('Something went wrong');
                       }
});





let PORT = process.env.PORT||5001;
app.listen(PORT , () =>{
                                  console.log(`ChatGPT Clone app server is running on http://localhost:${PORT}`);
                               }
                  );
