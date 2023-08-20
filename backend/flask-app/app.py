from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk import word_tokenize, pos_tag
from flask import Flask, jsonify

from flask_cors import CORS
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

def recommendProduct(sql):
    # Read the product dataset
    productDf = pd.read_csv('flipkartProductDataset.csv')
    preprocessedSql = sql.lower()
    preprocessedProducts = productDf.applymap(
        lambda x: x.lower() if isinstance(x, str) else x)

    # Tokenize the sentence into words
    words = word_tokenize(preprocessedSql)

    # Perform part-of-speech tagging
    pos_tags = pos_tag(words)

    # Find adjectives and nouns and combine them
    adjective_noun_pairs = []
    i = 0
    while i != len(pos_tags):
        if pos_tags[i][1].startswith('JJ'):
            j = i
            while not pos_tags[j][1].startswith('NN'):
                j += 1

            r = []
            for k in range(i, j + 1):
                if pos_tags[k][1].startswith('JJ') or pos_tags[k][1].startswith('RB') or pos_tags[k][1].startswith('NN'):
                    r.append(pos_tags[k][0])
            adjective_noun_pairs.append(r)
            i = j + 1

        elif pos_tags[i][1].startswith('NN'):
            adjective_noun_pairs.append([pos_tags[i][0]])
            i += 1
        else:
            i += 1

    # Create TF-IDF vectorizer
    productDf['Combined'] = preprocessedProducts['product_category_tree'].str.cat(
        preprocessedProducts['product_specifications'], sep=' ')

    # Prepare the list of recommended products
    recommended_products = []
    for pair in adjective_noun_pairs:
        vectorizer = TfidfVectorizer()
        productVectors = vectorizer.fit_transform(productDf['Combined'].fillna(''))
        query_vector = vectorizer.transform([" ".join(pair)])
        similarity_scores = cosine_similarity(query_vector, productVectors).flatten()

        ranked_indices = similarity_scores.argsort()[::-1]
        ranked_products = productDf.iloc[ranked_indices]

        recommended_urls = ranked_products['product_url'].tolist()
        recommended_prices = ranked_products['retail_price'].tolist()
        recommended_names = ranked_products['product_name'].tolist()
        recommended_img_url = ranked_products['image'].tolist()
        #print(recommended_img_url)
        recommendations = []
        recommendations.extend(list(zip(recommended_urls[:10], recommended_prices[:10], recommended_names[:10])))

        recommended_products.extend(recommendations)

    recommended_products_list = []
    for url, price, name in recommended_products:
        recommended_product_dict = {
            'name': name,
            'url': url,
            'price': price
        }
        
        recommended_products_list.append(recommended_product_dict)

    return recommended_products_list[:5]



app = Flask(__name__)
CORS(app)

@app.route('/prompt', methods=['POST'])
def generate_prompt():
    data = request.get_json()
    query = data['query']
    print(query)

    responseToSend = recommendProduct(query)

    return jsonify({"answer":responseToSend})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3001)