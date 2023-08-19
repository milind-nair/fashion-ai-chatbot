# import all libraries
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk import word_tokenize, pos_tag

# main function define


def main(sql):

    productDf = pd.read_csv('C:/Users/GarimaJi/.vscode/nlp/fashion-ai-chatbot/backend/dataset/flipkartProductDataset.csv')
    preprocessedSql = sql.lower()
    preprocessedProducts = productDf.applymap(
        lambda x: x.lower() if isinstance(x, str) else x)
    # type(productDf)

    # Tokenize the sentence into words
    words = word_tokenize(preprocessedSql)

    # Perform part-of-speech tagging
    pos_tags = pos_tag(words)
    print(pos_tags)

    # Find adjectives and nouns and combine them
    adjective_noun_pairs = []
    i = 0
    while (i != len(pos_tags)):
        if pos_tags[i][1].startswith('JJ'):
            j = i
            while (pos_tags[j][1].startswith('NN') == False):
                # print(pos_tags[j][0],pos_tags[j][1])
                j += 1

            r = []
            for k in range(i, j+1):
                if (pos_tags[k][1].startswith('JJ') or pos_tags[k][1].startswith('RB') or pos_tags[k][1].startswith('NN')):
                    r.append(pos_tags[k][0])
            adjective_noun_pairs.append(r)
            i = j+1

        elif pos_tags[i][1].startswith('NN'):
            adjective_noun_pairs.append([pos_tags[i][0]])
            i += 1
        else:
            i += 1

    print("Adjective-Noun Pairs:", adjective_noun_pairs[0])

    # Create TF-IDF vectorizer
    # Create TF-IDF vectorizer
    preprocessedProducts['Combined'] = preprocessedProducts['product_category_tree'].str.cat(
        preprocessedProducts['product_specifications'], sep=' ')
    for pair in adjective_noun_pairs:
        vectorizer = TfidfVectorizer()
        productVectors = vectorizer.fit_transform(preprocessedProducts['Combined'].fillna(''))
        query_vector = vectorizer.transform([" ".join(pair)])
        similarity_scores = cosine_similarity(query_vector, productVectors).flatten()

        ranked_indices = similarity_scores.argsort()[::-1]
        ranked_products = preprocessedProducts.iloc[ranked_indices]

        recommended_urls = ranked_products['product_url'].tolist()
        recommended_prices = ranked_products['retail_price'].tolist()
        recommendations=[]
        recommendations.extend(list(zip(recommended_urls[:10], recommended_prices[:10])))
        
    return recommendations
        
if __name__ == "__main__":
    query = 'Blue Kurta with black jeans should go well'
    recommended_products = main(query)
    for i, (product_url, product_price) in enumerate(recommended_products, start=1):
        print(f"Rank {i}: URL: {product_url}, Price: {product_price}")