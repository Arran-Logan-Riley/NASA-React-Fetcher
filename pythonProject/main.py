import spacy

# Load the english natral language processor
nlp = spacy.load("en_core_web_sm")

text = ("I went to the park with Jet and she walked around last week, there were some trees "
        "From the distance I hear a voice say 'are you ready to rumble!' "
        "and then again the voice repeats louder 'Are you ready to rumble' and I reply I am ready to rubmle"
        "and then the guy comes in with the hay maker, making the hay. Really making that bread. I duck and he misses "
        "me. I go for the upper cut and I punch him into yesterday and there was lighting and an earthquake because I "
        "was simply too powerful. And then a guy named Arran comes out of the bushes, massive arms and I also have "
        "massive arms and we start arm wresting ")
# Run the text through the Natural Language processor
doc = nlp(text)

# Analyze syntax
print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])

# Find named entities, phrases and concepts
for entity in doc.ents:
    print(entity.text, entity.label_)

