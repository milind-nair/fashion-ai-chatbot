# AI Chatbot Readme

Welcome to the AI Chatbot project! This repository contains the code for an AI chatbot implemented in Python. The chatbot is designed to run on Google Colab using a T4 GPU for enhanced performance. It utilizes the power of deep learning to engage in conversations and provide responses based on the training data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Steps to run](#stepstorun)

## Prerequisites

Before you begin, ensure you have the following prerequisites:

1. Google Account: You will need a Google account to access Google Colab and use its resources.

2. Google Colab Account: Ensure you have a Google Colab account set up.

3. GPU Support: Make sure your Google Colab environment has access to a T4 GPU. This is crucial for achieving efficient performance during training and inference.

4. NGROK account for auth key (use the key present in the code itself)

## Usage

To use the AI chatbot notebook in your Google Colab environment, follow these steps:

1. Open Google Colab: Go to [Google Colab](https://colab.research.google.com/) and sign in with your Google account.

2. Upload the Notebook: Click on "File" > "Upload notebook" and select the `AI_Chatbot.ipynb` notebook from your local system.

3. GPU Selection: Go to the "Runtime" menu, select "Change runtime type," and choose "GPU" as the hardware accelerator. This will ensure that the T4 GPU is used for computations.

4. Load the Notebook: Open the uploaded `AI_Chatbot.ipynb` notebook in your Google Colab environment.

5. Load the Model: Load the pre-trained chatbot model using the provided code.

6. Interact with the Chatbot: Use the chatbot's interface to engage in conversations. You can provide input prompts and receive responses from the chatbot.

## Steps to run

1. **Installations and Runtime Restart**: (only one time)
   - Install any required packages by running the necessary installation commands.
   - After completing installations, restart the runtime for changes to take effect.

2. **Ngrok Configuration**: (everytime full code runs)
   - Set up a Ngrok account if not already done.
   - Configure Ngrok to expose a local port (e.g., port 5000) and obtain a public URL for your Flask app.

3. **Create Directories**: (only one time)
   - Create two directories in your project: `DB` and `SOURCE_DOCUMENTS`.

4. **Upload Dataset**: (manually do)
   - Upload your dataset to the `SOURCE_DOCUMENTS` directory.

5. **Set Path and Imports**: (code has it)
   - Set the paths to the `DB` and `SOURCE_DOCUMENTS` directories.
   - Choose and import necessary libraries for processing different file types of source documents.

6. **Choose Model**: (code has it, can be changed)
   - Based on hardware availability, choose the appropriate model.
   - For CPU: Use the `ggml` model.
   1. uncomment basename and model id of ggml 3B model 
   2. choose cpu insted of cuda everywhere it is being used
   - For GPU: Use the `gptq` model.

7. **Load Document Functions**: (code has it)
   - Create functions to load the uploaded source documents.
   - Preprocess and prepare the documents for further processing.

8. **Create Embeddings and Parquet File**: (code has it)
   - In the next cell, implement the main function to generate embeddings from the loaded documents.
   - Save the embeddings and related data as a Parquet file in the `DB` directory.

9. **Load Model Function**: (code has it)
   - Create a function to load the selected model.
   - This function will initialize and return the chosen model.

10. **Create Text Generation Pipeline**: (code has it) 
    - Set up a pipeline for text generation.
    - This could involve loading the pre-trained language model, setting up generation parameters, etc.

11. **Define Template**: (code has it, can be changed)
    - Define a template for the chatbot's response.
    - The template should take context (source documents), user prompt, and chat memory as inputs.

12. **Flask App Endpoint**: (code has it)
    - Define a Flask app route, for example, `/prompt`.
    - This route should accept user queries as input and deliver results using the Ngrok-generated public URL.

13. **Runtime Restart Note**: (manually do)
    - Inform users that if the Flask app is interrupted, they will need to restart the runtime.
    - Assure them that the database documents won't be deleted during runtime restart.

14. **Run All Cells Again**: (manually do)
    - After restarting the runtime, run all the cells again except the installation and directory creation cells.