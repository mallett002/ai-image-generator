import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateImage = async (req, res) => {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "polar bear on ice skates",
            n: 1,
            size: "1024x1792",
        });

        const imageUrl = response.data[0].url;

        res.status(200).json({data: imageUrl});
    } catch (error) {
        console.log({error});
        res.status(500).json({error: error.message, success: false});
    }
    
};

export {
    generateImage,
}