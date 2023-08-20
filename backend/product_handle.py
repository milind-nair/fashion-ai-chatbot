# Import necessary libraries
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk import word_tokenize, pos_tag
from flask import Flask, jsonify

# Main function definition
def main(sql):
    # Read the product dataset
    productDf = pd.read_excel('backend/flipkartProduct.xlsx')
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
    #preprocessedProducts['Combined'] = preprocessedProducts['product_category_tree'].str.cat(
       # preprocessedProducts['product_specifications'], sep=' ')



# Create TF-IDF vectorizer

    recommended_products = []
    for pair in adjective_noun_pairs:
        vectorizer = TfidfVectorizer()
        productVectors = vectorizer.fit_transform(preprocessedProducts['Features'].fillna(''))
        query_vector = vectorizer.transform([" ".join(pair)])
        similarity_scores = cosine_similarity(query_vector, productVectors).flatten()

        ranked_indices = similarity_scores.argsort()[::-1]
        ranked_products = preprocessedProducts.iloc[ranked_indices]

        recommended_urls = ranked_products['pdt_url'].tolist()
        recommended_prices = ranked_products['price'].tolist()
        recommended_names = ranked_products['pdt_name'].tolist()
        
                #recommended_img_url = ranked_products['image'].tolist()
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
    
    #print((recommended_img_url[0].split(',')[0].replace("[","")).replace('"',""))
    #final_dict=[]
    return (jsonify(recommended_products_list))

if __name__ == "__main__":
    query = 'Blue Kurta with black jeans should go well'
    recommended_products_json = main(query)
    print(recommended_products_json)
    # Convert list of tuples to list of dictionaries