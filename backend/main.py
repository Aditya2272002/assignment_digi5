from langchain_community.document_loaders import AsyncChromiumLoader
from langchain_community.document_transformers import BeautifulSoupTransformer
from langchain_mistralai.chat_models import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from fastapi import FastAPI, HTTPException, Body
import asyncio
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

llm = ChatMistralAI(api_key="")

@app.post("/data")
def scrape_with_playwright(url: str = Body(..., embed=True)):
    urls = [url]
    loader = AsyncChromiumLoader(urls)
    docs = loader.load()  # Await the async function
    bs_transformer = BeautifulSoupTransformer()
    docs_transformed = bs_transformer.transform_documents(
        docs, tags_to_extract=["span"]
    )
    print(docs_transformed)
    return str(docs_transformed)


@app.post("/summary")
def generate_response(extracted_content: str = Body(..., embed=True)):

    prompt = ChatPromptTemplate.from_template(
        "You are a summary generator. Your job is to generate the summary of this Document: {document}\n\nSummary should contain useful information in a descriptive manner."
    )
    chain = prompt | llm
    res = chain.invoke({"document": extracted_content})
    return {"summary": res}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
