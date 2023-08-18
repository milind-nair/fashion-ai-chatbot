# import all libraries
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk import word_tokenize, pos_tag

# main function define


def main():

    productDf = pd.read_csv('C:/Users/GarimaJi/.vscode/nlp/fashion-ai-chatbot/backend/dataset/flipkartProductDataset.csv')
    sql = 'Blue Kurta with black jeans should go well'
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

    for i in range(len(adjective_noun_pairs)):
        vectorizer = TfidfVectorizer()
        productVectors = vectorizer.fit_transform(
            preprocessedProducts['Combined'].fillna(''))
        query_vector = vectorizer.transform(
            [" ".join(adjective_noun_pairs[i])])
        similarity_scores = cosine_similarity(
            query_vector, productVectors).flatten()

        ranked_indices = similarity_scores.argsort()[::-1]
        ranked_products = [preprocessedProducts['product_name'][i]
                           for i in ranked_indices]
        # Print ranked products
        for i, (rank, product) in enumerate(zip(range(1, 11), ranked_products[:10]), start=1):
            print(f"Rank {rank}: {product}")


if __name__ == "__main__":
    main()
