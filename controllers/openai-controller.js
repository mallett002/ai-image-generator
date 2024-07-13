import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateImage = async (req, res) => {
    const { prompt, size } = req.body;

    // Dall-e-3:
    const imageSize = size === 'small' 
        ? '1024x1024' 
        : size === 'medium' 
            ? '1792x1024' : '1024x1792';
    // Dall-e-2:
    // const imageSize = size === 'small' 
    //     ? '256x256' 
    //     : size === 'medium' 
    //         ? '512x512' : '1024x1024';

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: imageSize,
        });

        const imageUrl = response.data[0].url;

        res.status(200).json({data: imageUrl});
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({error: error.message, success: false});
    }
    
};

export {
    generateImage,
}